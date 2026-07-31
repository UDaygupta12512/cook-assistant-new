import os
import tempfile
import asyncio
import json
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
import google.generativeai as genai

# Try to import optional audio dependencies
try:
    import edge_tts
    AUDIO_ENABLED = True
except ImportError:
    AUDIO_ENABLED = False
    print("WARNING: Audio dependencies (edge-tts) not installed. Voice chat will be disabled.")

# Load environment variables
load_dotenv(dotenv_path="../.env")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="Cook Assistant RAG Backend with GenUI and Voice")

CHROMA_DB_DIR = "./chroma_db"
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = None

@app.on_event("startup")
async def startup_event():
    global vectorstore
    if os.path.exists(CHROMA_DB_DIR):
        print(f"Loading Chroma database from {CHROMA_DB_DIR}...")
        vectorstore = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=embeddings)
    else:
        print(f"WARNING: Chroma database not found at {CHROMA_DB_DIR}")

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    dietaryGoal: Optional[str] = "Standard"
    conversationHistory: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    source: str = "rag"
    details: Optional[str] = None
    transcription: Optional[str] = None # For voice chat

def get_rag_response(message: str, dietary_goal: str, history: List[ChatMessage]) -> str:
    context = ""
    if vectorstore:
        results = vectorstore.similarity_search(message, k=3)
        if results:
            context = "Retrieved Context (Recipes/Tips):\n\n"
            for i, doc in enumerate(results):
                context += f"--- Result {i+1} ---\n{doc.page_content}\n\n"
    
    history_text = ""
    if history:
        history_text = "\nRecent history:\n"
        for h in history[-6:]:
            history_text += f"{h.role}: {h.content}\n"

    prompt = f"""You are a professional, friendly AI Chef.
User's Dietary Goal: {dietary_goal}.

{context}

You must answer food/recipe questions. Keep it helpful.
{history_text}

CRITICAL INSTRUCTION FOR GENERATIVE UI:
If the user asks to compare nutritional information, macros, calories, or specifically asks for a chart or visualization, you MUST output your ENTIRE response in valid JSON format matching this schema exactly (do not wrap in markdown blocks like ```json):
{{
  "text": "Your conversational response...",
  "ui": {{
    "type": "bar_chart",
    "title": "Nutrition Comparison",
    "data": [
      {{"name": "Pizza (Calories)", "value": 285}},
      {{"name": "Salad (Calories)", "value": 150}}
    ]
  }}
}}

If the user DOES NOT ask for a chart or macro comparison, just output normal markdown text as you normally would. DO NOT output JSON for normal recipe requests.

User's Query: "{message}"
"""
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content(prompt)
    
    # Strip markdown block if the model accidentally includes it
    text = response.text.strip()
    if text.startswith("```json"):
        text = text.replace("```json", "", 1)
    if text.endswith("```"):
        text = text[:-3]
    return text.strip()

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message required")
    try:
        reply = get_rag_response(request.message, request.dietaryGoal, request.conversationHistory)
        return ChatResponse(reply=reply)
    except Exception as e:
        print(f"Chat error: {e}")
        return ChatResponse(reply="Error processing request.", source="error", details=str(e))

@app.post("/voice-chat")
async def voice_chat_endpoint(
    audio: UploadFile = File(...),
    dietaryGoal: str = Form("Standard")
):
    if not AUDIO_ENABLED:
        raise HTTPException(status_code=501, detail="Audio dependencies not installed.")
    
    try:
        # 1. Save uploaded audio to temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_audio:
            temp_audio.write(await audio.read())
            temp_audio_path = temp_audio.name
        
        # 2. Transcribe with Gemini Native Audio (Zero heavy dependencies!)
        print(f"Transcribing audio from {temp_audio_path} using Gemini...")
        audio_file = genai.upload_file(path=temp_audio_path)
        model = genai.GenerativeModel('gemini-2.5-flash')
        transcription_response = model.generate_content(
            ["Transcribe this audio file accurately. Output ONLY the words spoken by the user. If nothing is spoken, output [SILENCE].", audio_file]
        )
        transcription = transcription_response.text.strip()
        print(f"Transcription: {transcription}")
        genai.delete_file(audio_file.name)
        os.unlink(temp_audio_path)

        if not transcription or transcription == "[SILENCE]" or transcription == "SILENCE":
            return {"reply": "I couldn't hear you clearly.", "transcription": ""}

        # 3. Get RAG response
        reply_text = get_rag_response(transcription, dietaryGoal, [])
        
        # If response is JSON (Generative UI), we only want to speak the "text" part
        spoken_text = reply_text
        try:
            if reply_text.startswith("{"):
                data = json.loads(reply_text)
                if "text" in data:
                    spoken_text = data["text"]
        except json.JSONDecodeError:
            pass
            
        # 4. Synthesize speech with edge-tts
        output_audio_path = tempfile.mktemp(suffix=".mp3")
        print(f"Synthesizing audio for: {spoken_text[:50]}...")
        # Use a nice English voice
        voice = "en-US-ChristopherNeural"
        communicate = edge_tts.Communicate(spoken_text, voice)
        await communicate.save(output_audio_path)
        
        # 5. Return the audio file, but we also want to pass back the transcription and reply.
        # We can send them in custom headers so the frontend can display them!
        import urllib.parse
        safe_reply = urllib.parse.quote(reply_text)
        safe_transcription = urllib.parse.quote(transcription)
        
        return FileResponse(
            output_audio_path,
            media_type="audio/mpeg",
            headers={
                "X-Transcription": safe_transcription,
                "X-Reply-Text": safe_reply
            }
        )
    except Exception as e:
        print(f"Voice chat error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
