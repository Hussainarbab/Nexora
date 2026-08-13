"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type SavedJob = {
  id: string;
  opportunity_id: string;
  opportunity_type: string;
  title: string;
  company: string;
};

export default function SavedJobsPage() {
  const [jobs, setJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
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
        .select(
          "id, opportunity_id, opportunity_type, title, company"
        )
        .eq("user_id", user.id)
        .eq("opportunity_type", "job")
        .order("id", { ascending: false });

      if (error) {
        console.error("Fetch saved jobs error:", error);
        alert("Failed to load saved jobs.");
        return;
      }

      setJobs(data || []);
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeJob = async (id: string) => {
    try {
      setRemovingId(id);

      const { error } = await supabase
        .from("saved_opportunities")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Remove job error:", error);
        alert("Failed to remove this job.");
        return;
      }

      setJobs((currentJobs) =>
        currentJobs.filter((job) => job.id !== id)
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong.");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-slate-500">
            Loading saved jobs...
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
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-100">
                Your saved opportunities
              </p>

              <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                Saved Jobs 💼
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100">
                Keep track of jobs you want to apply for later.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              💼
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="mt-8">
          {jobs.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="text-6xl">💼</div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                No Saved Jobs
              </h2>

              <p className="mx-auto mt-3 max-w-md text-slate-500">
                You haven't saved any jobs yet. Explore available jobs
                and save the ones you're interested in.
              </p>

              <Link
                href="/jobs"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Explore Jobs →
              </Link>
            </div>
          ) : (
            <>
              {/* Count */}
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Your Saved Jobs
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {jobs.length}{" "}
                    {jobs.length === 1 ? "job" : "jobs"} saved
                  </p>
                </div>

                <Link
                  href="/jobs"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Find More Jobs →
                </Link>
              </div>

              {/* Jobs */}
              <div className="grid gap-5">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      {/* Job Info */}
                      <div className="flex gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
                          💼
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {job.title}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-slate-600">
                            {job.company}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                              Job
                            </span>

                            <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                              Saved
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col gap-2 sm:min-w-40">
                        <Link
                          href={`/jobs/${job.opportunity_id}`}
                          className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                          View Job →
                        </Link>

                        <button
                          type="button"
                          onClick={() => removeJob(job.id)}
                          disabled={removingId === job.id}
                          className="rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {removingId === job.id
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}