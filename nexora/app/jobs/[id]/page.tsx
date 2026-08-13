"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Job = {
  id: number;
  title: string;
  company: string;
  country: string;
  location: string;
  type: string;
  workplace: string;
  experience: string;
  salary: string;
  posted: string;
  description: string;
};

const jobs: Job[] = [
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
  },
];

export default function JobDetailsPage() {
  const params = useParams();

  const id = Number(params.id);

  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">

          <div className="text-6xl">
            🔍
          </div>

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

      {/* Hero */}
      <section className="bg-linear-to-br from-indigo-700 via-blue-600 to-cyan-600 px-4 py-10 text-white sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <Link
            href="/jobs"
            className="text-sm font-semibold text-blue-100 transition hover:text-white"
          >
            ← Back to Jobs
          </Link>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-4xl backdrop-blur">
              💼
            </div>

            <div>

              <h1 className="text-3xl font-extrabold sm:text-4xl">
                {job.title}
              </h1>

              <p className="mt-2 text-lg text-blue-100">
                {job.company}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                  📍 {job.location}
                </span>

                <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                  🌍 {job.country}
                </span>

                <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                  🏠 {job.workplace}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Main */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left */}
          <div className="lg:col-span-2">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <h2 className="text-2xl font-bold text-slate-900">
                Job Description
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                {job.description}
              </p>

              <h2 className="mt-10 text-2xl font-bold text-slate-900">
                About This Position
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                We are looking for a motivated professional who can
                contribute to real-world projects and work with an
                experienced team. This position provides an opportunity
                to grow your technical skills and gain valuable
                professional experience.
              </p>

              <h2 className="mt-10 text-2xl font-bold text-slate-900">
                Requirements
              </h2>

              <ul className="mt-5 space-y-3 text-slate-600">
                <li>✓ Strong knowledge of modern web development</li>
                <li>✓ Good understanding of JavaScript and React</li>
                <li>✓ Ability to work independently and in a team</li>
                <li>✓ Good communication skills</li>
                <li>✓ Problem-solving and analytical skills</li>
              </ul>

              <h2 className="mt-10 text-2xl font-bold text-slate-900">
                Responsibilities
              </h2>

              <ul className="mt-5 space-y-3 text-slate-600">
                <li>✓ Develop and maintain web applications</li>
                <li>✓ Collaborate with other developers</li>
                <li>✓ Write clean and maintainable code</li>
                <li>✓ Fix bugs and improve application performance</li>
                <li>✓ Participate in team discussions and reviews</li>
              </ul>

            </div>

          </div>

          {/* Right */}
          <aside>

            <div className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-slate-900">
                Job Overview
              </h2>

              <div className="mt-6 space-y-5">

                <Info
                  icon="💰"
                  label="Salary"
                  value={job.salary}
                />

                <Info
                  icon="🕐"
                  label="Job Type"
                  value={job.type}
                />

                <Info
                  icon="📊"
                  label="Experience"
                  value={job.experience}
                />

                <Info
                  icon="🏠"
                  label="Workplace"
                  value={job.workplace}
                />

                <Info
                  icon="📍"
                  label="Location"
                  value={job.location}
                />

                <Info
                  icon="📅"
                  label="Posted"
                  value={job.posted}
                />

              </div>

              <button
                type="button"
                className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-bold text-white transition hover:bg-blue-700"
              >
                Apply Now →
              </button>

              <button
                type="button"
                className="mt-3 w-full rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                ♡ Save Job
              </button>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
        {icon}
      </div>

      <div>

        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
}