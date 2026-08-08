"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    country: "Pakistan",
    location: "Islamabad",
    type: "Full-time",
    workplace: "Remote",
    experience: "Entry Level",
    salary: "PKR 80,000 - 150,000",
    posted: "2 days ago",
    description:
      "Build modern and responsive web applications using React, JavaScript and modern frontend technologies.",
    responsibilities: [
      "Build responsive web applications",
      "Work with React and JavaScript",
      "Collaborate with designers and backend developers",
      "Write clean and maintainable code",
      "Improve website performance",
    ],
    requirements: [
      "Basic knowledge of HTML, CSS and JavaScript",
      "Experience with React",
      "Understanding of responsive design",
      "Good problem-solving skills",
      "Ability to work in a team",
    ],
  },

  {
    id: 2,
    title: "React Developer",
    company: "GlobalSoft",
    country: "United Kingdom",
    location: "London",
    type: "Full-time",
    workplace: "Remote",
    experience: "Mid Level",
    salary: "£35,000 - £55,000",
    posted: "3 days ago",
    description:
      "Join a global engineering team building scalable React applications for international customers.",
    responsibilities: [
      "Develop React applications",
      "Build reusable components",
      "Work with APIs",
      "Review and improve existing code",
      "Collaborate with international teams",
    ],
    requirements: [
      "Strong React knowledge",
      "JavaScript experience",
      "REST API knowledge",
      "Git and GitHub experience",
      "Good communication skills",
    ],
  },

  {
    id: 3,
    title: "Software Engineer",
    company: "Microsoft",
    country: "United States",
    location: "Seattle",
    type: "Full-time",
    workplace: "On-site",
    experience: "Mid Level",
    salary: "$90,000 - $140,000",
    posted: "5 days ago",
    description:
      "Work with experienced engineers to design, develop and maintain large-scale software systems.",
    responsibilities: [
      "Develop scalable software systems",
      "Design technical solutions",
      "Write high-quality code",
      "Debug software issues",
      "Work with engineering teams",
    ],
    requirements: [
      "Strong programming skills",
      "Software engineering experience",
      "Problem-solving skills",
      "Knowledge of software development practices",
      "Team collaboration",
    ],
  },

  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Labs",
    country: "Canada",
    location: "Toronto",
    type: "Full-time",
    workplace: "Hybrid",
    experience: "Entry Level",
    salary: "CAD 55,000 - 75,000",
    posted: "1 week ago",
    description:
      "Design beautiful and intuitive digital experiences for web and mobile products.",
    responsibilities: [
      "Create user interfaces",
      "Build wireframes and prototypes",
      "Work with developers",
      "Conduct design research",
      "Improve user experiences",
    ],
    requirements: [
      "Knowledge of UI/UX principles",
      "Figma experience",
      "Creative thinking",
      "Understanding of responsive design",
      "Strong portfolio",
    ],
  },

  {
    id: 5,
    title: "Next.js Developer",
    company: "DigitalWave",
    country: "Germany",
    location: "Berlin",
    type: "Contract",
    workplace: "Remote",
    experience: "Mid Level",
    salary: "€45,000 - €65,000",
    posted: "1 week ago",
    description:
      "Develop high-performance applications using Next.js, React and modern web technologies.",
    responsibilities: [
      "Develop Next.js applications",
      "Create reusable React components",
      "Optimize application performance",
      "Integrate APIs",
      "Maintain production applications",
    ],
    requirements: [
      "Strong Next.js knowledge",
      "React experience",
      "JavaScript or TypeScript",
      "Git knowledge",
      "Understanding of web performance",
    ],
  },

  {
    id: 6,
    title: "Junior Web Developer",
    company: "CodeWorks",
    country: "Pakistan",
    location: "Lahore",
    type: "Full-time",
    workplace: "Hybrid",
    experience: "Entry Level",
    salary: "PKR 50,000 - 90,000",
    posted: "2 weeks ago",
    description:
      "An excellent opportunity for junior developers to grow their frontend and web development skills.",
    responsibilities: [
      "Develop web pages",
      "Fix frontend bugs",
      "Work with senior developers",
      "Create responsive layouts",
      "Learn modern development practices",
    ],
    requirements: [
      "HTML and CSS knowledge",
      "JavaScript basics",
      "Basic React knowledge is a plus",
      "Willingness to learn",
      "Good communication",
    ],
  },

  {
    id: 7,
    title: "Backend Developer",
    company: "Cloud Systems",
    country: "Australia",
    location: "Sydney",
    type: "Full-time",
    workplace: "Remote",
    experience: "Senior Level",
    salary: "AUD 110,000 - 150,000",
    posted: "2 weeks ago",
    description:
      "Design APIs and backend services while working with a distributed engineering team.",
    responsibilities: [
      "Build backend services",
      "Design APIs",
      "Work with databases",
      "Improve application security",
      "Monitor application performance",
    ],
    requirements: [
      "Strong backend development experience",
      "API development knowledge",
      "Database experience",
      "Cloud experience",
      "Strong problem-solving skills",
    ],
  },

  {
    id: 8,
    title: "Product Designer",
    company: "FutureTech",
    country: "United Arab Emirates",
    location: "Dubai",
    type: "Full-time",
    workplace: "On-site",
    experience: "Mid Level",
    salary: "AED 15,000 - 22,000",
    posted: "3 weeks ago",
    description:
      "Create user-centered product experiences and collaborate closely with product and engineering teams.",
    responsibilities: [
      "Design product experiences",
      "Create prototypes",
      "Work with product managers",
      "Collaborate with developers",
      "Improve product usability",
    ],
    requirements: [
      "Product design experience",
      "Figma knowledge",
      "Strong visual design skills",
      "UX research knowledge",
      "Strong portfolio",
    ],
  },
];

export default function JobDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [checkingSaved, setCheckingSaved] = useState(true);

  const job = jobs.find((item) => item.id === id);

  // Check if job is already saved
  useEffect(() => {
    const checkSaved = async () => {
      if (!job) {
        setCheckingSaved(false);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCheckingSaved(false);
        return;
      }

      const { data, error } = await supabase
        .from("saved_opportunities")
        .select("id")
        .eq("user_id", user.id)
        .eq("opportunity_id", String(job.id))
        .eq("opportunity_type", "job")
        .maybeSingle();

      if (!error && data) {
        setSaved(true);
        setSavedId(data.id);
      }

      setCheckingSaved(false);
    };

    checkSaved();
  }, [job]);

  // Save job
  const saveJob = async () => {
    if (!job) return;

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first to save this job.");
      setSaving(false);
      return;
    }

    // Check again before inserting
    const { data: existing, error: checkError } = await supabase
      .from("saved_opportunities")
      .select("id")
      .eq("user_id", user.id)
      .eq("opportunity_id", String(job.id))
      .eq("opportunity_type", "job")
      .maybeSingle();

    if (checkError) {
      alert(`Failed to check saved job: ${checkError.message}`);
      setSaving(false);
      return;
    }

    if (existing) {
      setSaved(true);
      setSavedId(existing.id);
      setSaving(false);

      alert("This job is already saved.");
      return;
    }

    const { data, error } = await supabase
      .from("saved_opportunities")
      .insert({
        user_id: user.id,
        opportunity_id: String(job.id),
        opportunity_type: "job",
        title: job.title,
        company: job.company,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Save job error:", error);

      if (error.code === "23505") {
        setSaved(true);
        setSaving(false);

        alert("This job is already saved.");
        return;
      }

      alert(`Failed to save job: ${error.message}`);
      setSaving(false);
      return;
    }

    setSaved(true);
    setSavedId(data?.id ?? null);
    setSaving(false);

    alert("Job saved successfully! ❤️");
  };

  // Remove saved job
  const removeJob = async () => {
    if (!savedId) return;

    setSaving(true);

    const { error } = await supabase
      .from("saved_opportunities")
      .delete()
      .eq("id", savedId);

    if (error) {
      alert(`Failed to remove job: ${error.message}`);
      setSaving(false);
      return;
    }

    setSaved(false);
    setSavedId(null);
    setSaving(false);

    alert("Job removed from saved opportunities.");
  };

  // Job not found
  if (!job) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="text-6xl">🔍</div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Job Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The job you are looking for does not exist.
          </p>

          <Link
            href="/jobs"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Jobs
          </Link>
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
            href="/jobs"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← All Jobs
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="rounded-3xl bg-linear-to-br from-indigo-700 via-blue-600 to-cyan-600 p-6 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-4xl backdrop-blur">
              💼
            </div>

            <div className="flex-1">
              <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                {job.workplace}
              </span>

              <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                {job.title}
              </h1>

              <p className="mt-3 text-lg text-blue-100">
                {job.company}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  📍 {job.location}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  🌍 {job.country}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  🕐 {job.type}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  📊 {job.experience}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* About */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                About This Job
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {job.description}
              </p>
            </section>

            {/* Responsibilities */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Responsibilities
              </h2>

              <div className="mt-5 space-y-3">
                {job.responsibilities.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                      ✓
                    </span>

                    <p className="text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Requirements */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Requirements
              </h2>

              <div className="mt-5 space-y-3">
                {job.requirements.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                      ✓
                    </span>

                    <p className="text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900">
                Job Information
              </h2>

              <div className="mt-6 space-y-5">
                <Info
                  label="Company"
                  value={job.company}
                  icon="🏢"
                />

                <Info
                  label="Location"
                  value={job.location}
                  icon="📍"
                />

                <Info
                  label="Workplace"
                  value={job.workplace}
                  icon="🏠"
                />

                <Info
                  label="Job Type"
                  value={job.type}
                  icon="🕐"
                />

                <Info
                  label="Experience"
                  value={job.experience}
                  icon="📊"
                />

                <Info
                  label="Salary"
                  value={job.salary}
                  icon="💰"
                />

                <Info
                  label="Posted"
                  value={job.posted}
                  icon="📅"
                />
              </div>

              {/* Buttons */}
              <div className="mt-7 border-t border-slate-100 pt-6">
                <button
                  onClick={() =>
                    alert(
                      "The official application link will be added here."
                    )
                  }
                  className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700"
                >
                  Apply Now →
                </button>

                {checkingSaved ? (
                  <button
                    disabled
                    className="mt-3 w-full cursor-not-allowed rounded-xl border border-slate-300 bg-slate-100 py-3.5 font-bold text-slate-400"
                  >
                    Checking...
                  </button>
                ) : saved ? (
                  <button
                    onClick={removeJob}
                    disabled={saving}
                    className="mt-3 w-full rounded-xl border border-red-200 py-3.5 font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Removing..." : "❤️ Saved — Remove"}
                  </button>
                ) : (
                  <button
                    onClick={saveJob}
                    disabled={saving}
                    className="mt-3 w-full rounded-xl border border-slate-300 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "♡ Save Job"}
                  </button>
                )}
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                Always verify the job and company details before
                submitting your application.
              </p>
            </div>
          </aside>
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
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-lg">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">{label}</p>

        <p className="mt-1 font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}