"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type UserProfile = {
  first_name?: string;
  second_name?: string;
  full_name?: string;
};

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        window.location.href = "/login";
        return;
      }

      const profile = data.user.user_metadata as UserProfile;

      setUserName(
        profile?.first_name ||
          profile?.full_name ||
          data.user.email?.split("@")[0] ||
          "User"
      );

      setLoading(false);
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="mt-4 text-slate-500">Loading dashboard...</p>
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

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Logout
          </button>

        </div>
      </header>

      {/* Dashboard */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Welcome */}
        <section className="rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8">

          <p className="text-sm font-medium text-blue-100">
            Welcome back 👋
          </p>

          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Hello, {userName}!
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Discover scholarships, jobs, internships and other
            opportunities from around the world.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            Explore Opportunities →
          </Link>

        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <DashboardCard
            icon="❤️"
            title="Saved"
            value="0"
            description="Saved opportunities"
          />

          <DashboardCard
            icon="🎓"
            title="Scholarships"
            value="0"
            description="Saved scholarships"
          />

          <DashboardCard
            icon="💼"
            title="Jobs"
            value="0"
            description="Saved jobs"
          />

          <DashboardCard
            icon="🧑‍💻"
            title="Internships"
            value="0"
            description="Saved internships"
          />

        </section>

        {/* Main Content */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Recommended */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Recommended Opportunities
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Opportunities selected for you
                </p>
              </div>

              <Link
                href="/"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>

            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center">

              <div className="text-4xl">🌍</div>

              <h3 className="mt-4 font-bold text-slate-800">
                No recommendations yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Explore opportunities and save the ones you like.
                Nexora will use your interests to recommend better
                opportunities.
              </p>

              <Link
                href="/"
                className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Start Exploring
              </Link>

            </div>

          </div>

          {/* Profile */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold text-slate-900">
              Your Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Complete your profile
            </p>

            <div className="mt-6">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-2xl font-bold text-blue-600">
                {userName.charAt(0).toUpperCase()}
              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                {userName}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Nexora Member
              </p>

            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/3 rounded-full bg-blue-600" />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Profile completion: 33%
            </p>

            <button className="mt-5 w-full rounded-xl border border-slate-300 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Complete Profile
            </button>

          </div>

        </section>

        {/* Quick Links */}
        <section className="mt-8">

          <h2 className="text-xl font-bold text-slate-900">
            Explore Nexora
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <QuickLink
              href="/scholarships"
              icon="🎓"
              title="Scholarships"
              text="Find scholarships worldwide"
            />

            <QuickLink
              href="/jobs"
              icon="💼"
              title="Jobs"
              text="Discover global jobs"
            />

            <QuickLink
              href="/internships"
              icon="🧑‍💻"
              title="Internships"
              text="Start your career"
            />

            <QuickLink
              href="/"
              icon="🌍"
              title="All Opportunities"
              text="Explore everything"
            />

          </div>

        </section>

      </div>
    </main>
  );
}

/* Dashboard Card */

function DashboardCard({
  icon,
  title,
  value,
  description,
}: {
  icon: string;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {description}
      </p>

    </div>
  );
}

/* Quick Link */

function QuickLink({
  href,
  icon,
  title,
  text,
}: {
  href: string;
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
    >
      <span className="text-3xl">{icon}</span>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {text}
      </p>
    </Link>
  );
}