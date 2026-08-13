"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

const internships = [
  {
    id: 1,
    title: "Frontend Development Intern",
    company: "TechNova",
    country: "Pakistan",
    location: "Islamabad",

    // IMPORTANT: Only put the direct URL here
    applyUrl: "https://example.com/apply",

    type: "Full-time",
    workplace: "Remote",
    level: "Students",
    payment: "Paid",
    duration: "3 Months",
    posted: "2 days ago",

    description:
      "Learn and work on modern web applications using HTML, CSS, JavaScript and React.",

    responsibilities: [
      "Build responsive web pages",
      "Work with React components",
      "Fix frontend bugs",
      "Collaborate with senior developers",
      "Learn modern development practices",
    ],

    requirements: [
      "Basic HTML and CSS",
      "JavaScript fundamentals",
      "Interest in React",
      "Good communication",
    ],
  },

  {
    id: 2,
    title: "Software Engineering Intern",
    company: "Microsoft",
    country: "United States",
    location: "Seattle",

    applyUrl: "https://careers.microsoft.com/",

    type: "Full-time",
    workplace: "On-site",
    level: "Undergraduate",
    payment: "Paid",
    duration: "12 Weeks",
    posted: "4 days ago",

    description:
      "Gain practical software engineering experience while working with experienced developers.",

    responsibilities: [
      "Write production code",
      "Work with engineering teams",
      "Debug applications",
      "Participate in code reviews",
    ],

    requirements: [
      "Programming knowledge",
      "Computer science student",
      "Problem solving skills",
    ],
  },

  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Labs",
    country: "Canada",
    location: "Toronto",

    applyUrl: "https://example.com/apply",

    type: "Part-time",
    workplace: "Hybrid",
    level: "Students",
    payment: "Paid",
    duration: "4 Months",
    posted: "5 days ago",

    description:
      "Work with designers to create modern user interfaces and improve digital experiences.",

    responsibilities: [
      "Create wireframes",
      "Build prototypes",
      "Conduct user research",
    ],

    requirements: [
      "Figma knowledge",
      "Creative thinking",
      "Basic design principles",
    ],
  },

  {
    id: 4,
    title: "React Developer Intern",
    company: "GlobalSoft",
    country: "United Kingdom",
    location: "London",

    applyUrl: "https://example.com/apply",

    type: "Full-time",
    workplace: "Remote",
    level: "Undergraduate",
    payment: "Paid",
    duration: "6 Months",
    posted: "1 week ago",

    description:
      "Build reusable React components and gain hands-on experience with modern frontend development.",

    responsibilities: [
      "Develop React components",
      "Integrate APIs",
      "Improve UI performance",
    ],

    requirements: [
      "React basics",
      "JavaScript",
      "Git knowledge",
    ],
  },

  {
    id: 5,
    title: "Digital Marketing Intern",
    company: "FutureTech",
    country: "United Arab Emirates",
    location: "Dubai",

    applyUrl: "https://example.com/apply",

    type: "Full-time",
    workplace: "On-site",
    level: "Students",
    payment: "Paid",
    duration: "3 Months",
    posted: "1 week ago",

    description:
      "Learn digital marketing strategies, social media management and online campaign planning.",

    responsibilities: [
      "Manage campaigns",
      "Create content",
      "Analyze marketing results",
    ],

    requirements: [
      "Interest in marketing",
      "Communication skills",
      "Social media knowledge",
    ],
  },

  {
    id: 6,
    title: "Web Development Intern",
    company: "CodeWorks",
    country: "Pakistan",
    location: "Lahore",

    applyUrl: "https://example.com/apply",

    type: "Part-time",
    workplace: "Hybrid",
    level: "Students",
    payment: "Unpaid",
    duration: "3 Months",
    posted: "2 weeks ago",

    description:
      "A beginner-friendly opportunity to improve your web development skills through real projects.",

    responsibilities: [
      "Create web pages",
      "Fix bugs",
      "Learn from mentors",
    ],

    requirements: [
      "HTML",
      "CSS",
      "Willingness to learn",
    ],
  },

  {
    id: 7,
    title: "Data Science Intern",
    company: "Cloud Systems",
    country: "Australia",
    location: "Sydney",

    applyUrl: "https://example.com/apply",

    type: "Full-time",
    workplace: "Remote",
    level: "Graduate",
    payment: "Paid",
    duration: "6 Months",
    posted: "2 weeks ago",

    description:
      "Work with data scientists on analytics, machine learning and data-driven projects.",

    responsibilities: [
      "Analyze datasets",
      "Create reports",
      "Support machine learning projects",
    ],

    requirements: [
      "Python basics",
      "Statistics",
      "Analytical thinking",
    ],
  },

  {
    id: 8,
    title: "Product Management Intern",
    company: "DigitalWave",
    country: "Germany",
    location: "Berlin",

    applyUrl: "https://example.com/apply",

    type: "Full-time",
    workplace: "Hybrid",
    level: "Graduate",
    payment: "Paid",
    duration: "4 Months",
    posted: "3 weeks ago",

    description:
      "Support product teams with research, planning and development of digital products.",

    responsibilities: [
      "Product research",
      "Create documentation",
      "Work with product teams",
    ],

    requirements: [
      "Communication skills",
      "Organizational skills",
      "Interest in technology",
    ],
  },
];

export default function InternshipDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const internship = internships.find((item) => item.id === id);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [checkingSaved, setCheckingSaved] = useState(true);

  /*
   * Check whether internship is already saved
   */
  useEffect(() => {
    const checkSaved = async () => {
      if (!internship) {
        setCheckingSaved(false);
        return;
      }

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          setCheckingSaved(false);
          return;
        }

        const { data, error } = await supabase
          .from("saved_opportunities")
          .select("id")
          .eq("user_id", user.id)
          .eq("opportunity_id", String(internship.id))
          .eq("opportunity_type", "internship")
          .maybeSingle();

        if (!error && data) {
          setSaved(true);
          setSavedId(data.id);
        }
      } catch (error) {
        console.error("Check saved internship error:", error);
      } finally {
        setCheckingSaved(false);
      }
    };

    checkSaved();
  }, [internship]);

  /*
   * Save internship
   */
  const saveInternship = async () => {
    if (!internship || saving) return;

    setSaving(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User error:", userError);
        alert("Unable to check your account. Please try again.");
        return;
      }

      if (!user) {
        alert("Please login first to save this internship.");
        return;
      }

      /*
       * Check if already saved
       */
      const { data: existing, error: checkError } = await supabase
        .from("saved_opportunities")
        .select("id")
        .eq("user_id", user.id)
        .eq("opportunity_id", String(internship.id))
        .eq("opportunity_type", "internship")
        .maybeSingle();

      if (checkError) {
        console.error("Check saved error:", checkError);

        alert(
          `Failed to check saved internship: ${checkError.message}`
        );

        return;
      }

      if (existing) {
        setSaved(true);
        setSavedId(existing.id);

        alert("This internship is already saved.");

        return;
      }

      /*
       * Insert into Supabase
       */
      const { data, error: insertError } = await supabase
        .from("saved_opportunities")
        .insert({
          user_id: user.id,
          opportunity_id: String(internship.id),
          opportunity_type: "internship",
          title: internship.title,
          company: internship.company,
        })
        .select("id")
        .single();

      if (insertError) {
        console.error("Save internship error:", insertError);

        if (insertError.code === "23505") {
          setSaved(true);

          alert("This internship is already saved.");

          return;
        }

        alert(
          `Failed to save internship: ${insertError.message}`
        );

        return;
      }

      setSaved(true);
      setSavedId(data?.id ?? null);

      alert("Internship saved successfully! ❤️");
    } catch (error) {
      console.error("Unexpected save error:", error);

      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /*
   * Remove saved internship
   */
  const removeInternship = async () => {
    if (!savedId || saving) return;

    setSaving(true);

    try {
      const { error } = await supabase
        .from("saved_opportunities")
        .delete()
        .eq("id", savedId);

      if (error) {
        console.error("Remove internship error:", error);

        alert(
          `Failed to remove internship: ${error.message}`
        );

        return;
      }

      setSaved(false);
      setSavedId(null);

      alert("Internship removed from saved opportunities.");
    } catch (error) {
      console.error("Unexpected remove error:", error);

      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /*
   * Internship not found
   */
  if (!internship) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="text-6xl">🔍</div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Internship Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The internship you are looking for does not exist.
          </p>

          <Link
            href="/internships"
            className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
          >
            ← Back to Internships
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
            href="/internships"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Internships
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="rounded-3xl bg-linear-to-br from-violet-700 to-purple-600 p-6 text-white shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-4xl backdrop-blur">
              🚀
            </div>

            <div className="flex-1">
              <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                {internship.payment}
              </span>

              <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
                {internship.title}
              </h1>

              <p className="mt-3 text-lg text-purple-100">
                {internship.company}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  🌍 {internship.country}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  📍 {internship.location}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  🎓 {internship.level}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  ⏳ {internship.duration}
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
                About This Internship
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {internship.description}
              </p>
            </section>

            {/* Responsibilities */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Responsibilities
              </h2>

              <div className="mt-5 space-y-3">
                {internship.responsibilities.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                      ✓
                    </span>

                    <p className="text-slate-600">
                      {item}
                    </p>
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
                {internship.requirements.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                      ✓
                    </span>

                    <p className="text-slate-600">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900">
                Internship Information
              </h2>

              <div className="mt-6 space-y-5">
                <Info
                  label="Company"
                  value={internship.company}
                  icon="🏢"
                />

                <Info
                  label="Location"
                  value={internship.location}
                  icon="📍"
                />

                <Info
                  label="Workplace"
                  value={internship.workplace}
                  icon="🏠"
                />

                <Info
                  label="Type"
                  value={internship.type}
                  icon="💼"
                />

                <Info
                  label="Level"
                  value={internship.level}
                  icon="🎓"
                />

                <Info
                  label="Payment"
                  value={internship.payment}
                  icon="💰"
                />

                <Info
                  label="Duration"
                  value={internship.duration}
                  icon="⏳"
                />

                <Info
                  label="Posted"
                  value={internship.posted}
                  icon="📅"
                />
              </div>

              {/* Buttons */}
              <div className="mt-7 border-t border-slate-100 pt-6">
                {/* Apply Button */}
                <a
                  href={internship.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full rounded-xl bg-purple-600 py-3.5 text-center font-bold text-white transition hover:bg-purple-700"
                >
                  Apply Now →
                </a>

                {/* Save / Remove */}
                {checkingSaved ? (
                  <button
                    type="button"
                    disabled
                    className="mt-3 w-full cursor-not-allowed rounded-xl border border-slate-300 bg-slate-100 py-3.5 font-bold text-slate-400"
                  >
                    Checking...
                  </button>
                ) : saved ? (
                  <button
                    type="button"
                    onClick={removeInternship}
                    disabled={saving}
                    className="mt-3 w-full rounded-xl border border-red-200 py-3.5 font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Removing..."
                      : "❤️ Saved — Remove"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={saveInternship}
                    disabled={saving}
                    className="mt-3 w-full rounded-xl border border-slate-300 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : "♡ Save Internship"}
                  </button>
                )}
              </div>

              <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                Always verify the internship and company details
                before applying.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

/*
 * Information component
 */
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
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-lg">
        {icon}
      </div>

      <div>
        <p className="text-xs text-slate-400">
          {label}
        </p>

        <p className="mt-1 font-semibold text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}