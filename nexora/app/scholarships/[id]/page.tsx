"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const scholarships = [
  {
    id: 1,
    title: "Global Excellence Scholarship",
    university: "University of Melbourne",
    country: "Australia",
    location: "Melbourne",
    level: "Masters",
    funding: "Fully Funded",
    deadline: "30 Sep 2026",
     applyUrl: "https://www.unimelb.edu.au/scholarships",
    description:
      "A competitive scholarship for talented international students pursuing postgraduate studies.",
    eligibility: [
      "International students can apply",
      "Strong academic record",
      "Meet the university admission requirements",
      "Meet English language requirements",
    ],
    benefits: [
      "Full tuition fee coverage",
      "Living allowance",
      "Health insurance",
      "Travel support",
    ],
  },
  {
    id: 2,
    title: "International Student Scholarship",
    university: "University of Toronto",
    country: "Canada",
    location: "Toronto",
    level: "Undergraduate",
    funding: "Fully Funded",
    deadline: "15 Oct 2026",
    description:
      "Financial support for outstanding international students with strong academic performance.",
    eligibility: [
      "International students",
      "Excellent academic performance",
      "Meet admission requirements",
      "English language proficiency",
    ],
    benefits: [
      "Tuition support",
      "Financial assistance",
      "Academic support",
      "Student resources",
    ],
  },
  {
    id: 3,
    title: "Chevening Scholarship",
    university: "UK Universities",
    country: "United Kingdom",
    location: "United Kingdom",
    level: "Masters",
    funding: "Fully Funded",
    deadline: "5 Nov 2026",
     applyUrl: "https://www.unimelb.edu.au/scholarships",
    description:
      "A prestigious opportunity for future leaders to study a one-year master's degree in the UK.",
    eligibility: [
      "International applicants",
      "Undergraduate degree",
      "Relevant work experience",
      "Strong leadership potential",
    ],
    benefits: [
      "Full tuition fees",
      "Monthly stipend",
      "Travel costs",
      "Visa application support",
    ],
  },
  {
    id: 4,
    title: "DAAD International Scholarship",
    university: "German Universities",
    country: "Germany",
    location: "Germany",
    level: "Masters",
    funding: "Fully Funded",
    deadline: "31 Oct 2026",
     applyUrl: "https://www.unimelb.edu.au/scholarships",
    description:
      "Funding opportunities for international students interested in postgraduate study in Germany.",
    eligibility: [
      "International students",
      "Bachelor's degree",
      "Strong academic record",
      "Program-specific requirements",
    ],
    benefits: [
      "Monthly scholarship payment",
      "Travel allowance",
      "Health insurance",
      "Study support",
    ],
  },
  {
    id: 5,
    title: "Türkiye Scholarships",
    university: "Turkish Universities",
    country: "Turkey",
    location: "Turkey",
    level: "Undergraduate",
    funding: "Fully Funded",
    deadline: "20 Feb 2027",
     applyUrl: "https://www.unimelb.edu.au/scholarships",
    description:
      "Government-funded scholarships for international students at Turkish universities.",
    eligibility: [
      "International students",
      "Academic requirements",
      "Age requirements may apply",
      "Meet program requirements",
    ],
    benefits: [
      "University placement",
      "Tuition fees",
      "Monthly stipend",
      "Accommodation",
    ],
  },
  {
    id: 6,
    title: "International Merit Scholarship",
    university: "University of Auckland",
    country: "New Zealand",
    location: "Auckland",
    level: "Masters",
    funding: "Partial Funding",
    deadline: "1 Dec 2026",
     applyUrl: "https://www.unimelb.edu.au/scholarships",
    description:
      "Merit-based financial support for high-achieving international students.",
    eligibility: [
      "International students",
      "Strong academic performance",
      "Meet admission requirements",
      "Merit-based selection",
    ],
    benefits: [
      "Tuition fee contribution",
      "Academic support",
      "University resources",
    ],
  },
  {
    id: 7,
    title: "Chinese Government Scholarship",
    university: "Chinese Universities",
    country: "China",
    location: "China",
    level: "PhD",
    funding: "Fully Funded",
    deadline: "15 Mar 2027",
     applyUrl: "https://www.unimelb.edu.au/scholarships",
    description:
      "Government scholarship covering study opportunities for international students in China.",
    eligibility: [
      "International students",
      "Relevant previous degree",
      "Good academic record",
      "Meet university requirements",
    ],
    benefits: [
      "Tuition fees",
      "Accommodation",
      "Monthly stipend",
      "Medical insurance",
    ],
  },
  {
    id: 8,
    title: "MEXT Scholarship",
    university: "Japanese Universities",
    country: "Japan",
    location: "Japan",
    level: "PhD",
    funding: "Fully Funded",
    deadline: "30 Apr 2027",
     applyUrl: "https://www.unimelb.edu.au/scholarships",
    description:
      "Japanese government scholarship for international students pursuing higher education.",
    eligibility: [
      "International students",
      "Academic qualification",
      "Research proposal for research programs",
      "Meet Japanese university requirements",
    ],
    benefits: [
      "Tuition fee exemption",
      "Monthly allowance",
      "Travel allowance",
      "University placement support",
    ],
  },
];

export default function ScholarshipDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const scholarship = scholarships.find(
    (item) => item.id === id
  );

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [checkingSaved, setCheckingSaved] = useState(true);

  // Check whether scholarship is already saved
  useEffect(() => {
    const checkSaved = async () => {
      if (!scholarship) {
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
        .eq("opportunity_id", String(scholarship.id))
        .eq("opportunity_type", "scholarship")
        .maybeSingle();

      if (!error && data) {
        setSaved(true);
      }

      setCheckingSaved(false);
    };

    checkSaved();
  }, [scholarship]);

  // Save scholarship
  const saveScholarship = async () => {
    if (!scholarship) return;

    setSaving(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
        alert("Unable to check your account. Please try again.");
        return;
      }

      if (!user) {
        alert("Please login first to save scholarships.");
        return;
      }

      // Check again before inserting
      const { data: existing, error: checkError } = await supabase
        .from("saved_opportunities")
        .select("id")
        .eq("user_id", user.id)
        .eq("opportunity_id", String(scholarship.id))
        .eq("opportunity_type", "scholarship")
        .maybeSingle();

      if (checkError) {
        console.error("Check saved error:", checkError);
        alert(`Failed to check saved scholarship: ${checkError.message}`);
        return;
      }

      if (existing) {
        setSaved(true);
        alert("This scholarship is already saved.");
        return;
      }

      // Insert into Supabase
      const { error: insertError } = await supabase
        .from("saved_opportunities")
        .insert({
          user_id: user.id,
          opportunity_id: String(scholarship.id),
          opportunity_type: "scholarship",
          title: scholarship.title,
          company: scholarship.university,
        });

      if (insertError) {
        console.error("Save scholarship error:", insertError);

        if (insertError.code === "23505") {
          setSaved(true);
          alert("This scholarship is already saved.");
          return;
        }

        alert(
          `Failed to save scholarship: ${insertError.message}`
        );

        return;
      }

      setSaved(true);

      alert("Scholarship saved successfully! ❤️");
    } catch (error) {
      console.error("Unexpected error:", error);

      alert("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!scholarship) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="text-6xl">🔍</div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900">
            Scholarship Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The scholarship you are looking for does not exist.
          </p>

          <Link
            href="/scholarships"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            ← Back to Scholarships
          </Link>
        </div>
      </main>
    );
  }

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
            href="/scholarships"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Scholarships
          </Link>

        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="rounded-3xl bg-linear-to-br from-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-10">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-4xl backdrop-blur">
              🎓
            </div>

            <div className="flex-1">

              <span className="inline-block rounded-full bg-green-400/20 px-4 py-2 text-sm font-bold text-green-100">
                {scholarship.funding}
              </span>

              <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
                {scholarship.title}
              </h1>

              <p className="mt-3 text-lg text-blue-100">
                {scholarship.university}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  🌍 {scholarship.country}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  🎓 {scholarship.level}
                </span>

                <span className="rounded-xl bg-white/10 px-4 py-2 text-sm">
                  📍 {scholarship.location}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">

          {/* Left */}
          <div className="space-y-8 lg:col-span-2">

            {/* About */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                About This Scholarship
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {scholarship.description}
              </p>

            </section>

            {/* Eligibility */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                Eligibility
              </h2>

              <div className="mt-5 space-y-3">

                {scholarship.eligibility.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                        ✓
                      </span>

                      <p className="text-slate-600">
                        {item}
                      </p>
                    </div>
                  )
                )}

              </div>

            </section>

            {/* Benefits */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                What Is Covered?
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                {scholarship.benefits.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl bg-slate-50 p-4"
                    >
                      <div className="flex gap-3">

                        <span className="text-xl">
                          💰
                        </span>

                        <p className="font-medium text-slate-700">
                          {item}
                        </p>

                      </div>
                    </div>
                  )
                )}

              </div>

            </section>

          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1">

            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

              <h2 className="text-xl font-bold text-slate-900">
                Scholarship Information
              </h2>

              <div className="mt-6 space-y-5">

                <Info
                  label="Country"
                  value={scholarship.country}
                  icon="🌍"
                />

                <Info
                  label="Study Level"
                  value={scholarship.level}
                  icon="🎓"
                />

                <Info
                  label="Funding"
                  value={scholarship.funding}
                  icon="💰"
                />

                <Info
                  label="Application Deadline"
                  value={scholarship.deadline}
                  icon="📅"
                />

              </div>

              <div className="mt-7 border-t border-slate-100 pt-6">

                {/* Apply */}
                <a
  href={scholarship.applyUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="block w-full rounded-xl bg-blue-600 py-3.5 text-center font-bold text-white transition hover:bg-blue-700"
>
  Apply Now →
</a>

                {/* Save */}
                <button
                  type="button"
                  onClick={saveScholarship}
                  disabled={saving || saved || checkingSaved}
                  className="mt-3 w-full rounded-xl border border-slate-300 py-3.5 font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-slate-100"
                >
                  {checkingSaved
                    ? "Checking..."
                    : saving
                      ? "Saving..."
                      : saved
                        ? "❤️ Saved"
                        : "♡ Save Scholarship"}
                </button>

              </div>

              <p className="mt-5 text-center text-xs leading-5 text-slate-400">
                Always verify eligibility and deadlines on the
                official scholarship website before applying.
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