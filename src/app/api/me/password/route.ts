import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { changePasswordById } from "@/lib/user-store";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as { currentPassword?: string; newPassword?: string };
    const currentPassword = body?.currentPassword ?? "";
    const newPassword = body?.newPassword ?? "";

    await changePasswordById({ id: session.user.id, currentPassword, newPassword });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Password update failed";
    const code = typeof err === "object" && err !== null && "code" in err ? (err as any).code : undefined;
    if (code === "BAD_PASSWORD") {
      return NextResponse.json({ ok: false, error: message }, { status: 400 });
    }
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

