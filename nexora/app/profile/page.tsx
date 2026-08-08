"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    };

    getProfile();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="text-6xl">🔒</div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Login Required
          </h1>

          <p className="mt-3 text-slate-500">
            Please login to view your profile.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const firstName = user.user_metadata?.first_name || "";
  const secondName = user.user_metadata?.second_name || "";

  const fullName =
    user.user_metadata?.full_name ||
    `${firstName} ${secondName}`.trim() ||
    "Nexora User";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-2xl font-extrabold text-blue-600"
          >
            Nexora
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            ← Home
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          {/* Profile Header */}
          <div className="bg-linear-to-br from-blue-700 to-indigo-700 px-6 py-10 text-white sm:px-10">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-bold text-blue-600 shadow-lg">
                {firstName
                  ? firstName.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-blue-100">
                  Welcome to Nexora
                </p>

                <h1 className="mt-1 text-3xl font-extrabold">
                  {fullName}
                </h1>

                <p className="mt-2 text-blue-100">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Account Information
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Info
                label="First Name"
                value={firstName || "Not provided"}
                icon="👤"
              />

              <Info
                label="Second Name"
                value={secondName || "Not provided"}
                icon="👤"
              />

              <Info
                label="Email Address"
                value={user.email || "Not available"}
                icon="📧"
              />

              <Info
                label="Account Status"
                value="Active"
                icon="✅"
              />
            </div>

            {/* Quick Links */}
            <div className="mt-10 border-t border-slate-100 pt-8">
              <h2 className="text-xl font-bold text-slate-900">
                Quick Access
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <Link
                  href="/saved"
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="text-2xl">❤️</div>

                  <h3 className="mt-3 font-bold text-slate-900">
                    Saved
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    View your saved opportunities
                  </p>
                </Link>

                <Link
                  href="/scholarships"
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="text-2xl">🎓</div>

                  <h3 className="mt-3 font-bold text-slate-900">
                    Scholarships
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Find scholarships
                  </p>
                </Link>

                <Link
                  href="/jobs"
                  className="rounded-2xl border border-slate-200 p-5 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="text-2xl">💼</div>

                  <h3 className="mt-3 font-bold text-slate-900">
                    Jobs
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Explore job opportunities
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-xl">
          {icon}
        </div>

        <div>
          <p className="text-xs font-medium text-slate-400">
            {label}
          </p>

          <p className="mt-1 font-semibold text-slate-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}