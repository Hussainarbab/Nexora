"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type SavedOpportunity = {
  id: string;
  opportunity_id: string;
  opportunity_type: string;
  title: string;
  company: string | null;
  created_at: string;
};

export default function SavedPage() {
  const [savedItems, setSavedItems] = useState<SavedOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    loadSavedOpportunities();
  }, []);

  const loadSavedOpportunities = async () => {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error(userError);
      setError(userError.message);
      setLoading(false);
      return;
    }

    if (!user) {
      setUserLoggedIn(false);
      setSavedItems([]);
      setLoading(false);
      return;
    }

    setUserLoggedIn(true);

    const { data, error: savedError } = await supabase
      .from("saved_opportunities")
      .select(
        "id, opportunity_id, opportunity_type, title, company, created_at"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (savedError) {
      console.error(savedError);
      setError(savedError.message);
      setLoading(false);
      return;
    }

    setSavedItems(data || []);
    setLoading(false);
  };

  const removeSaved = async (id: string) => {
    setRemovingId(id);

    const { error } = await supabase
      .from("saved_opportunities")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(`Failed to remove: ${error.message}`);
      setRemovingId(null);
      return;
    }

    setSavedItems((items) =>
      items.filter((item) => item.id !== id)
    );

    setRemovingId(null);
  };

  const getIcon = (type: string) => {
    if (type === "scholarship") return "🎓";
    if (type === "job") return "💼";
    if (type === "internship") return "🚀";

    return "📌";
  };

  const getTypeName = (type: string) => {
    if (type === "scholarship") return "Scholarship";
    if (type === "job") return "Job";
    if (type === "internship") return "Internship";

    return "Opportunity";
  };

  const getViewLink = (item: SavedOpportunity) => {
    if (item.opportunity_type === "scholarship") {
      return `/scholarships/${item.opportunity_id}`;
    }

    if (item.opportunity_type === "job") {
      return `/jobs/${item.opportunity_id}`;
    }

    if (item.opportunity_type === "internship") {
      return `/internships/${item.opportunity_id}`;
    }

    return "#";
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="text-2xl font-extrabold text-blue-600"
          >
            Nexora
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Home
          </Link>

        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Heading */}
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Your Collection
          </span>

          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Saved Opportunities ❤️
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Keep track of scholarships, jobs and internships you
            want to apply for.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="text-4xl">
              ⏳
            </div>

            <p className="mt-4 font-semibold text-slate-700">
              Loading your saved opportunities...
            </p>

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mt-10 rounded-3xl border border-red-200 bg-red-50 p-6">

            <div className="text-3xl">
              ⚠️
            </div>

            <p className="mt-3 font-semibold text-red-600">
              Failed to load saved opportunities
            </p>

            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>

            <button
              onClick={loadSavedOpportunities}
              className="mt-5 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>

          </div>
        )}

        {/* Not Logged In */}
        {!loading && !error && !userLoggedIn && (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

            <div className="text-6xl">
              🔐
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              Login Required
            </h2>

            <p className="mx-auto mt-3 max-w-md text-slate-500">
              Please login to view and manage your saved
              scholarships, jobs and internships.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/login"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Create Account
              </Link>

            </div>

          </div>
        )}

        {/* No Saved Items */}
        {!loading &&
          !error &&
          userLoggedIn &&
          savedItems.length === 0 && (
            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">

              <div className="text-6xl">
                ❤️
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No saved opportunities yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-slate-500">
                Save scholarships, jobs and internships and
                they will appear here.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

                <Link
                  href="/scholarships"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Browse Scholarships
                </Link>

                <Link
                  href="/jobs"
                  className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Browse Jobs
                </Link>

                <Link
                  href="/internships"
                  className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Browse Internships
                </Link>

              </div>

            </div>
          )}

        {/* Saved Items */}
        {!loading &&
          !error &&
          userLoggedIn &&
          savedItems.length > 0 && (
            <div className="mt-10 grid gap-5">

              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* Information */}
                    <div className="flex gap-4">

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                        {getIcon(item.opportunity_type)}
                      </div>

                      <div>

                        <span className="text-xs font-bold uppercase tracking-wide text-blue-600">
                          {getTypeName(item.opportunity_type)}
                        </span>

                        <h2 className="mt-1 text-xl font-bold text-slate-900">
                          {item.title}
                        </h2>

                        {item.company && (
                          <p className="mt-1 text-slate-500">
                            {item.company}
                          </p>
                        )}

                        <p className="mt-2 text-xs text-slate-400">
                          Saved on{" "}
                          {new Date(
                            item.created_at
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 sm:shrink-0">

                      <Link
                        href={getViewLink(item)}
                        className="flex-1 rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700 sm:flex-none"
                      >
                        View →
                      </Link>

                      <button
                        type="button"
                        onClick={() => removeSaved(item.id)}
                        disabled={removingId === item.id}
                        className="flex-1 rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                      >
                        {removingId === item.id
                          ? "Removing..."
                          : "Remove"}
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

      </div>

    </main>
  );
}