import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from langchain_community.vectorstores import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
import google.generativeai as genai

# Load environment variables from the parent directory's .env file
load_dotenv(dotenv_path="../.env")

# Verify Gemini API key is present
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment variables.")
else:
    genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="Cook Assistant RAG Backend")

# Initialize ChromaDB connection
CHROMA_DB_DIR = "./chroma_db"
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

# Global variable to hold the vector store
vectorstore = None

@app.on_event("startup")
async def startup_event():
    global vectorstore
    if os.path.exists(CHROMA_DB_DIR):
        print(f"Loading Chroma database from {CHROMA_DB_DIR}...")
        vectorstore = Chroma(persist_directory=CHROMA_DB_DIR, embedding_function=embeddings)
        print(f"Loaded {vectorstore._collection.count()} documents from the database.")
    else:
        print(f"WARNING: Chroma database not found at {CHROMA_DB_DIR}. Please run ingest.py first.")

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

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message is required")

    try:
        context = ""
        
        # 1. Retrieve relevant documents from the vector database
        if vectorstore:
            # Get top 3 most relevant recipes/tips
            results = vectorstore.similarity_search(request.message, k=3)
            if results:
                context = "Use the following retrieved recipes/tips to help answer the user's question:\n\n"
                for i, doc in enumerate(results):
                    context += f"--- Recipe {i+1} ---\n{doc.page_content}\n\n"
        
        # 2. Build the conversation history
        history_text = ""
        if request.conversationHistory:
            history_text = "\n\nRecent conversation history:\n"
            for h in request.conversationHistory[-6:]:
                history_text += f"{h.role}: {h.content}\n"

        # 3. Construct the prompt
        prompt = f"""You are a professional, friendly, and helpful AI Chef for a culinary application.
The user's current dietary goal is: {request.dietaryGoal}.

{context}

You must answer all culinary, cooking, ingredient, and recipe-related questions the user asks. Adapt your advice to match their dietary goal when applicable.
If the user asks something completely unrelated to food, politely steer the conversation back to cooking.

Keep responses concise but helpful (2-4 sentences for simple questions, more for recipes).
{history_text}

User's Current Query: "{request.message}"
"""
        # 4. Generate the response using Gemini
        if not GEMINI_API_KEY:
            return ChatResponse(reply="Error: Gemini API key not configured.", source="error")

        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        
        return ChatResponse(reply=response.text)

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        # In a real app, you might want to return a cleaner error or use the regex fallback here
        return ChatResponse(reply="I'm sorry, I encountered an error while trying to process your request.", source="error", details=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
