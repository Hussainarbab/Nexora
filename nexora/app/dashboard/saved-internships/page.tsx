"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type SavedInternship = {
  id: string;
  opportunity_id: string;
  title: string;
  company: string;
};

export default function SavedInternshipsPage() {
  const [internships, setInternships] = useState<SavedInternship[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    loadSavedInternships();
  }, []);

  const loadSavedInternships = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("saved_opportunities")
      .select("id, opportunity_id, title, company")
      .eq("user_id", user.id)
      .eq("opportunity_type", "internship")
      .order("id", { ascending: false });

    if (error) {
      console.error("Failed to load saved internships:", error);
      setInternships([]);
    } else {
      setInternships(data || []);
    }

    setLoading(false);
  };

  const removeInternship = async (id: string) => {
    setRemovingId(id);

    const { error } = await supabase
      .from("saved_opportunities")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Failed to remove internship:", error);
      alert("Failed to remove internship. Please try again.");
      setRemovingId(null);
      return;
    }

    setInternships((current) =>
      current.filter((internship) => internship.id !== id)
    );

    setRemovingId(null);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-purple-600" />

          <p className="mt-4 text-slate-500">
            Loading saved internships...
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

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="rounded-3xl bg-linear-to-r from-violet-600 to-purple-600 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-purple-100">
                Your Saved Opportunities
              </p>

              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Saved Internships 🚀
              </h1>

              <p className="mt-3 max-w-2xl text-purple-100">
                Keep track of internships you want to apply for.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              🧑‍💻
            </div>
          </div>
        </section>

        {/* Internship Count */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Your Internships
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {internships.length}{" "}
              {internships.length === 1
                ? "internship"
                : "internships"}{" "}
              saved
            </p>
          </div>

          <Link
            href="/internships"
            className="rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
          >
            Find Internships →
          </Link>
        </div>

        {/* Empty State */}
        {internships.length === 0 ? (
          <section className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="text-6xl">🧑‍💻</div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No Saved Internships
            </h2>

            <p className="mx-auto mt-3 max-w-md text-slate-500">
              You haven't saved any internships yet. Browse available
              internships and save the ones you're interested in.
            </p>

            <Link
              href="/internships"
              className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
            >
              Explore Internships
            </Link>
          </section>
        ) : (
          /* Internship List */
          <section className="mt-6 grid gap-5">
            {internships.map((internship) => (
              <div
                key={internship.id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* Information */}
                  <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-2xl">
                      🧑‍💻
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {internship.title}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-purple-600">
                        {internship.company}
                      </p>

                      <p className="mt-2 text-sm text-slate-500">
                        Internship opportunity
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      href={`/internships/${internship.opportunity_id}`}
                      className="rounded-xl bg-purple-600 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-purple-700"
                    >
                      View Internship
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        removeInternship(internship.id)
                      }
                      disabled={removingId === internship.id}
                      className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {removingId === internship.id
                        ? "Removing..."
                        : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}