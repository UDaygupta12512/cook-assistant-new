"use client";

import { useState } from "react";
import { NavbarClient } from "@/components/layout/NavbarClient";
import { Footer } from "@/components/layout/Footer";
import { useNavbarTranslations } from "@/hooks/useNavbarTranslations";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Check,
  Moon,
  Sun,
  Monitor,
  Save,
  Eye,
  EyeOff,
  Globe,
  ChefHat,
  Utensils,
  Clock,
  Heart,
  Trash2,
  Loader2,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import { Link } from "@/i18n/routing";

export type SettingsInitialProfile = {
  name: string;
  email: string;
  bio: string;
  dietaryPref: string;
  skillLevel: string;
  notifications: {
    emailAlerts: boolean;
    pushNotifications: boolean;
    weeklyDigest: boolean;
    newRecipeAlerts: boolean;
    cookingReminders: boolean;
  };
  privacy: {
    profilePublic: boolean;
    showActivity: boolean;
    dataCollection: boolean;
  };
};

export default function SettingsClient({
  initial,
  locale,
}: {
  initial: SettingsInitialProfile;
  locale: string;
}) {
  const navbarTranslations = useNavbarTranslations();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("account");
  const { theme, setTheme } = useTheme();

  const [isSaving, setIsSaving] = useState(false);

  // Form states (initialized from server-provided profile)
  const [displayName, setDisplayName] = useState(initial.name);
  const [email] = useState(initial.email);
  const [bio, setBio] = useState(initial.bio);
  const [dietaryPref, setDietaryPref] = useState(initial.dietaryPref);
  const [skillLevel, setSkillLevel] = useState(initial.skillLevel);

  // Notification states
  const [emailAlerts, setEmailAlerts] = useState(initial.notifications.emailAlerts);
  const [pushNotifications, setPushNotifications] = useState(initial.notifications.pushNotifications);
  const [weeklyDigest, setWeeklyDigest] = useState(initial.notifications.weeklyDigest);
  const [newRecipeAlerts, setNewRecipeAlerts] = useState(initial.notifications.newRecipeAlerts);
  const [cookingReminders, setCookingReminders] = useState(initial.notifications.cookingReminders);

  // Privacy states
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePublic, setProfilePublic] = useState(initial.privacy.profilePublic);
  const [showActivity, setShowActivity] = useState(initial.privacy.showActivity);
  const [dataCollection, setDataCollection] = useState(initial.privacy.dataCollection);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveMe = async (patch: any, successMessage: string) => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/me", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data?.error || "Save failed", "error");
        return;
      }
      showToast(successMessage, "success");
    } catch {
      showToast("Save failed", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveProfile = async () => {
    await saveMe(
      {
        name: displayName,
        bio,
        dietaryPref,
        skillLevel,
      },
      "Profile updated successfully!"
    );
  };

  const handleSaveNotifications = async () => {
    await saveMe(
      {
        notifications: {
          emailAlerts,
          pushNotifications,
          weeklyDigest,
          newRecipeAlerts,
          cookingReminders,
        },
      },
      "Notification preferences saved!"
    );
  };

  const handleSavePrivacy = async () => {
    await saveMe(
      {
        privacy: {
          profilePublic,
          showActivity,
          dataCollection,
        },
      },
      "Privacy settings saved!"
    );
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      showToast("Please enter your current password", "error");
      return;
    }
    if (newPassword.length < 8) {
      showToast("Password must be at least 8 characters", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/me/password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast(data?.error || "Password update failed", "error");
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      showToast("Password updated successfully!");
    } catch {
      showToast("Password update failed", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    showToast("Account deletion isn’t enabled yet.", "error");
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const Toggle = ({
    checked,
    onChange,
    label,
  }: {
    checked: boolean;
    onChange: (val: boolean) => void;
    label: string;
  }) => (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-gray-300 dark:bg-zinc-600"
      }`}
      aria-label={label}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const isAuthed = status === "authenticated" && session?.user;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavbarClient translations={navbarTranslations} />
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Settings className="w-7 h-7 text-primary" />
              </div>
              Settings
            </h1>
            <p className="text-muted-foreground mt-2">Manage your account, preferences, and privacy settings.</p>
          </div>

          {!isAuthed && (
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-border shadow-sm">
              <p className="font-medium text-foreground">You need to sign in to manage settings.</p>
              <p className="text-sm text-muted-foreground mt-1">Your profile information comes from your account.</p>
              <Link
                href={`/${locale}/signin`}
                className="inline-flex mt-4 bg-primary text-white px-5 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all"
              >
                Sign in
              </Link>
            </div>
          )}

          {isAuthed && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                      activeTab === tab.id ? "bg-primary/10 text-primary font-bold shadow-sm" : "hover:bg-secondary text-foreground font-medium"
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="md:col-span-3 space-y-6">
                {activeTab === "account" && (
                  <>
                    <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        Profile Information
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">Update your personal details.</p>

                      <div className="flex items-center gap-4 mb-6 p-4 bg-secondary/30 rounded-xl border border-border">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                          {(displayName || "U").charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-foreground truncate">{displayName || session.user.name || "User"}</p>
                          <p className="text-sm text-muted-foreground truncate">{email || session.user.email}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="settings-displayName" className="block text-sm font-medium text-muted-foreground mb-1.5">
                            Display Name
                          </label>
                          <input
                            id="settings-displayName"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          />
                        </div>
                        <div>
                          <label htmlFor="settings-email" className="block text-sm font-medium text-muted-foreground mb-1.5">
                            Email Address
                          </label>
                          <input
                            id="settings-email"
                            type="email"
                            value={email}
                            disabled
                            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 opacity-70 cursor-not-allowed"
                          />
                          <p className="text-xs text-muted-foreground mt-1">Email changes require verification (not enabled yet).</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label htmlFor="settings-bio" className="block text-sm font-medium text-muted-foreground mb-1.5">
                          Bio
                        </label>
                        <textarea
                          id="settings-bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          rows={3}
                          className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none transition-all"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="mt-4 bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-60"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Changes
                      </button>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <ChefHat className="w-5 h-5 text-primary" />
                        Cooking Preferences
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">Customize your recipe recommendations.</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="settings-dietaryPref" className="block text-sm font-medium text-muted-foreground mb-1.5">
                            <Heart className="w-4 h-4 inline mr-1" /> Dietary Preference
                          </label>
                          <select
                            id="settings-dietaryPref"
                            value={dietaryPref}
                            onChange={(e) => setDietaryPref(e.target.value)}
                            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                          >
                            <option value="none">No Preference</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="vegan">Vegan</option>
                            <option value="keto">Keto</option>
                            <option value="glutenFree">Gluten Free</option>
                            <option value="halal">Halal</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="settings-skillLevel" className="block text-sm font-medium text-muted-foreground mb-1.5">
                            <Utensils className="w-4 h-4 inline mr-1" /> Cooking Skill Level
                          </label>
                          <select
                            id="settings-skillLevel"
                            value={skillLevel}
                            onChange={(e) => setSkillLevel(e.target.value)}
                            className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                          >
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="professional">Professional Chef</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSaveProfile}
                        disabled={isSaving}
                        className="mt-4 bg-primary/10 text-primary px-6 py-2.5 rounded-xl font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2 disabled:opacity-60"
                      >
                        <Save className="w-4 h-4" />
                        Save Preferences
                      </button>
                    </div>
                  </>
                )}

                {activeTab === "notifications" && (
                  <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                    <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      Notification Preferences
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">Choose what notifications you receive.</p>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium">Email Alerts</p>
                            <p className="text-sm text-muted-foreground">Receive weekly recipe suggestions via email</p>
                          </div>
                        </div>
                        <Toggle checked={emailAlerts} onChange={setEmailAlerts} label="Toggle email alerts" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Get notified when a recipe timer finishes</p>
                          </div>
                        </div>
                        <Toggle checked={pushNotifications} onChange={setPushNotifications} label="Toggle push notifications" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <Globe className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div>
                            <p className="font-medium">Weekly Digest</p>
                            <p className="text-sm text-muted-foreground">Summary of trending recipes and tips</p>
                          </div>
                        </div>
                        <Toggle checked={weeklyDigest} onChange={setWeeklyDigest} label="Toggle weekly digest" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                            <ChefHat className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                          </div>
                          <div>
                            <p className="font-medium">New Recipe Alerts</p>
                            <p className="text-sm text-muted-foreground">Get notified when new recipes are added</p>
                          </div>
                        </div>
                        <Toggle checked={newRecipeAlerts} onChange={setNewRecipeAlerts} label="Toggle new recipe alerts" />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border hover:shadow-sm transition-all">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                            <Utensils className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <p className="font-medium">Cooking Reminders</p>
                            <p className="text-sm text-muted-foreground">Daily meal prep and cooking reminders</p>
                          </div>
                        </div>
                        <Toggle checked={cookingReminders} onChange={setCookingReminders} label="Toggle cooking reminders" />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveNotifications}
                      disabled={isSaving}
                      className="mt-6 bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-60"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Preferences
                    </button>
                  </div>
                )}

                {activeTab === "privacy" && (
                  <>
                    <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                      <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Change Password
                      </h2>
                      <p className="text-sm text-muted-foreground mb-6">Update your password to keep your account secure.</p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-muted-foreground mb-1.5">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              placeholder="Enter current password"
                              className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5">New Password</label>
                            <input
                              type={showPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              placeholder="Enter new password"
                              className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Confirm Password</label>
                            <input
                              type={showPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Confirm new password"
                              className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/30"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleUpdatePassword}
                        disabled={isSaving}
                        className="mt-4 bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-sm disabled:opacity-60"
                      >
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                        Update Password
                      </button>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                      <h2 className="text-xl font-bold mb-1">Privacy Controls</h2>
                      <p className="text-sm text-muted-foreground mb-6">Manage how others see your profile and data.</p>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border">
                          <div>
                            <p className="font-medium">Public Profile</p>
                            <p className="text-sm text-muted-foreground">Allow others to see your profile and saved recipes</p>
                          </div>
                          <Toggle checked={profilePublic} onChange={setProfilePublic} label="Toggle public profile" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border">
                          <div>
                            <p className="font-medium">Show Activity</p>
                            <p className="text-sm text-muted-foreground">Display your cooking activity on your profile</p>
                          </div>
                          <Toggle checked={showActivity} onChange={setShowActivity} label="Toggle show activity" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl border border-border">
                          <div>
                            <p className="font-medium">Data Collection</p>
                            <p className="text-sm text-muted-foreground">Help us improve by sharing anonymous usage data</p>
                          </div>
                          <Toggle checked={dataCollection} onChange={setDataCollection} label="Toggle data collection" />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleSavePrivacy}
                        disabled={isSaving}
                        className="mt-4 bg-primary/10 text-primary px-6 py-2.5 rounded-xl font-bold hover:bg-primary hover:text-white transition-all flex items-center gap-2 disabled:opacity-60"
                      >
                        <Save className="w-4 h-4" />
                        Save Privacy Settings
                      </button>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-red-200 dark:border-red-900 shadow-sm">
                      <h2 className="text-xl font-bold mb-1 text-red-600">Danger Zone</h2>
                      <p className="text-sm text-muted-foreground mb-4">Irreversible and destructive actions.</p>
                      <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="bg-red-50 dark:bg-red-900/20 text-red-600 px-6 py-2.5 rounded-xl font-bold hover:bg-red-100 dark:hover:bg-red-900/40 transition-all flex items-center gap-2 border border-red-200 dark:border-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </button>
                    </div>
                  </>
                )}

                {activeTab === "appearance" && (
                  <div className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-2xl border border-border shadow-sm">
                    <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                      <Palette className="w-5 h-5 text-primary" />
                      Appearance
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">Choose how you want CookAssistant to look.</p>

                    <div className="grid grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setTheme("light")}
                        className={`p-5 rounded-xl flex flex-col items-center gap-3 transition-all border-2 ${
                          theme === "light" ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40 bg-secondary/20"
                        }`}
                      >
                        <div className="w-14 h-14 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center">
                          <Sun className="w-7 h-7 text-amber-500" />
                        </div>
                        <span className="font-medium text-sm">Light</span>
                        {theme === "light" && <Check className="w-4 h-4 text-primary" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setTheme("dark")}
                        className={`p-5 rounded-xl flex flex-col items-center gap-3 transition-all border-2 ${
                          theme === "dark" ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40 bg-secondary/20"
                        }`}
                      >
                        <div className="w-14 h-14 bg-zinc-800 rounded-full shadow-md border border-zinc-700 flex items-center justify-center">
                          <Moon className="w-7 h-7 text-blue-400" />
                        </div>
                        <span className="font-medium text-sm">Dark</span>
                        {theme === "dark" && <Check className="w-4 h-4 text-primary" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setTheme("system")}
                        className={`p-5 rounded-xl flex flex-col items-center gap-3 transition-all border-2 ${
                          theme === "system" ? "border-primary bg-primary/5 shadow-md" : "border-border hover:border-primary/40 bg-secondary/20"
                        }`}
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-white to-zinc-800 rounded-full shadow-md border border-gray-300 flex items-center justify-center">
                          <Monitor className="w-7 h-7 text-gray-600" />
                        </div>
                        <span className="font-medium text-sm">System</span>
                        {theme === "system" && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-5 ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "success" ? <Check className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

