import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        const baseUrl = process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL || "http://localhost:8000";
        const pythonBackendUrl = `${baseUrl}/substitute`;
        
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
        return NextResponse.json(data);

    } catch (error) {
        console.error("Substitute API Proxy Error:", error);
        return NextResponse.json({ 
            error: "I'm sorry, the ML Substitution engine seems to be down."
        }, { status: 500 });
    }
}
