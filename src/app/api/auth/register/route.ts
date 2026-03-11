import { NextResponse } from "next/server";
import { createUser } from "@/lib/user-store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: string; email?: string; password?: string };
    const name = body?.name ?? "";
    const email = body?.email ?? "";
    const password = body?.password ?? "";

    const user = await createUser({ name, email, password });
    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    const code = typeof err === "object" && err !== null && "code" in err ? (err as any).code : undefined;
    if (code === "EMAIL_EXISTS" || message.toLowerCase().includes("already")) {
      return NextResponse.json({ ok: false, error: "Email already in use" }, { status: 409 });
    }
    if (message.toLowerCase().includes("password") || message.toLowerCase().includes("email") || message.toLowerCase().includes("name")) {
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: "Registration failed" }, { status: 500 });
  }
}

