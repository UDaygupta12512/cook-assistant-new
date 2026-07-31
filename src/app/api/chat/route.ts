import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        // Forward the request to our new Python FastAPI backend
        // Note: Ensure the Python server is running on port 8000
        const pythonBackendUrl = "http://localhost:8000/chat";
        
        const response = await fetch(pythonBackendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error(`Python backend responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        // The Python backend should return an object with a 'reply' string
        return NextResponse.json(data);

    } catch (error) {
        console.error("Chat API Proxy Error:", error);
        
        // Fallback gracefully if the Python backend is down
        const details = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json({ 
            reply: "I'm sorry, my Python AI backend seems to be down at the moment. Please make sure the FastAPI server is running on port 8000.", 
            source: "fallback", 
            details 
        });
    }
}
