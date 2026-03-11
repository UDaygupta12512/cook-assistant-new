import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getUserById } from "@/lib/user-store";
import SettingsClient, { type SettingsInitialProfile } from "./SettingsClient";

export const runtime = "nodejs";

export default async function SettingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(`/${locale}/signin?callbackUrl=/${locale}/settings`);
  }

  const stored = await getUserById(session.user.id);
  const initial: SettingsInitialProfile = {
    name: stored?.name || session.user.name || "User",
    email: stored?.email || session.user.email || "",
    bio: stored?.bio || "Passionate home cook who loves experimenting with new recipes!",
    dietaryPref: stored?.dietaryPref || "none",
    skillLevel: stored?.skillLevel || "intermediate",
    notifications: {
      emailAlerts: stored?.notifications?.emailAlerts ?? true,
      pushNotifications: stored?.notifications?.pushNotifications ?? true,
      weeklyDigest: stored?.notifications?.weeklyDigest ?? false,
      newRecipeAlerts: stored?.notifications?.newRecipeAlerts ?? true,
      cookingReminders: stored?.notifications?.cookingReminders ?? true,
    },
    privacy: {
      profilePublic: stored?.privacy?.profilePublic ?? true,
      showActivity: stored?.privacy?.showActivity ?? true,
      dataCollection: stored?.privacy?.dataCollection ?? false,
    },
  };

  return <SettingsClient initial={initial} locale={locale} />;
}
