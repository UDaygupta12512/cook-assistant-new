import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getUserById, updateUserById } from "@/lib/user-store";

export const runtime = "nodejs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    // Fall back to session if store missing (should be rare)
    return NextResponse.json(
      {
        ok: true,
        user: {
          id: session.user.id,
          name: session.user.name ?? "",
          email: session.user.email ?? "",
        },
      },
      { status: 200 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _ph, ...safe } = user;
  return NextResponse.json({ ok: true, user: safe }, { status: 200 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await req.json()) as any;
    // Email changes are intentionally not supported here (needs verification flow).
    const patch = {
      name: typeof body?.name === "string" ? body.name : undefined,
      bio: typeof body?.bio === "string" ? body.bio : undefined,
      dietaryPref: typeof body?.dietaryPref === "string" ? body.dietaryPref : undefined,
      skillLevel: typeof body?.skillLevel === "string" ? body.skillLevel : undefined,
      notifications: typeof body?.notifications === "object" ? body.notifications : undefined,
      privacy: typeof body?.privacy === "object" ? body.privacy : undefined,
    };

    const updated = await updateUserById(session.user.id, patch);
    return NextResponse.json({ ok: true, user: updated }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}

