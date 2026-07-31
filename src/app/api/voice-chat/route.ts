import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        
        const baseUrl = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL || "http://localhost:8000";
        const pythonBackendUrl = `${baseUrl}/voice-chat`;
        
        const response = await fetch(pythonBackendUrl, {
            method: 'POST',
            body: formData,
            // DO NOT set Content-Type manually, fetch will automatically set it to multipart/form-data with the correct boundary
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Python backend responded with status: ${response.status} - ${errText}`);
        }

        // Return the raw audio stream
        return new NextResponse(response.body, {
            headers: {
                "Content-Type": "audio/mpeg",
                // Pass custom headers through to the frontend
                "X-Transcription": response.headers.get("X-Transcription") || "",
                "X-Reply-Text": response.headers.get("X-Reply-Text") || ""
            }
        });

    } catch (error) {
        console.error("Voice Chat API Proxy Error:", error);
        
        return NextResponse.json({ 
            reply: "I'm sorry, the Voice AI backend seems to be down.", 
            source: "fallback", 
            details: String(error)
        }, { status: 500 });
    }
}
