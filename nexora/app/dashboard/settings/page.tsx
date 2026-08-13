"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    setEmail(user.email || "");
    setLoading(false);
  };

  const updatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please enter your new password.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setUpdatingPassword(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Password update error:", error);
      alert(`Failed to update password: ${error.message}`);
      setUpdatingPassword(false);
      return;
    }

    setNewPassword("");
    setConfirmPassword("");
    setUpdatingPassword(false);

    alert("Password updated successfully! 🔐");
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      alert("Failed to logout. Please try again.");
      setLoggingOut(false);
      return;
    }

    window.location.href = "/login";
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-slate-500">
            Loading settings...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-extrabold text-blue-600"
          >
            Nexora
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="rounded-3xl bg-linear-to-r from-slate-800 to-slate-900 p-6 text-white shadow-lg sm:p-8">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">
              ⚙️
            </div>

            <div>
              <h1 className="text-3xl font-extrabold">
                Settings
              </h1>

              <p className="mt-2 text-slate-300">
                Manage your Nexora account and security.
              </p>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Account
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your account information
            </p>
          </div>

          <div className="mt-6">
            <label className="text-sm font-semibold text-slate-700">
              Email Address
            </label>

            <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-lg">📧</span>

              <span className="text-sm text-slate-700">
                {email}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Your email address is managed by your Nexora account.
            </p>
          </div>
        </section>

        {/* Password */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Change Password
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your account password.
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="text-sm font-semibold text-slate-700"
              >
                New Password
              </label>

              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-semibold text-slate-700"
              >
                Confirm New Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <button
              type="button"
              onClick={updatePassword}
              disabled={updatingPassword}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updatingPassword
                ? "Updating..."
                : "Update Password"}
            </button>
          </div>
        </section>

        {/* Dashboard Links */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access your saved opportunities.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <SettingsLink
              href="/dashboard/saved-jobs"
              icon="💼"
              title="Saved Jobs"
            />

            <SettingsLink
              href="/dashboard/saved-internships"
              icon="🧑‍💻"
              title="Saved Internships"
            />

            <SettingsLink
              href="/dashboard/saved-scholarships"
              icon="🎓"
              title="Saved Scholarships"
            />
          </div>
        </section>

        {/* Danger Zone */}
        <section className="mt-6 rounded-3xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-red-600">
            Account Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Sign out from your Nexora account.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-800">
                Logout
              </p>

              <p className="mt-1 text-sm text-slate-500">
                You will need to login again to access your dashboard.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </section>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            href="/dashboard"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}

function SettingsLink({
  href,
  icon,
  title,
}: {
  href: string;
  icon: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
    >
      <span className="text-3xl">{icon}</span>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        View saved items
      </p>
    </Link>
  );
}