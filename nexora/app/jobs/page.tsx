"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import SaveButton from "@/components/SaveButton";

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

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [type, setType] = useState("All Types");
  const [workplace, setWorkplace] = useState("All Workplaces");
  const [experience, setExperience] = useState("All Experience");
  const [sort, setSort] = useState("Latest");

  const countries = [
    "All Countries",
    ...Array.from(new Set(jobs.map((job) => job.country))),
  ];

  const types = [
    "All Types",
    ...Array.from(new Set(jobs.map((job) => job.type))),
  ];

  const workplaces = [
    "All Workplaces",
    ...Array.from(new Set(jobs.map((job) => job.workplace))),
  ];

  const experiences = [
    "All Experience",
    ...Array.from(new Set(jobs.map((job) => job.experience))),
  ];

  const filteredJobs = useMemo(() => {
    let result = jobs.filter((job) => {
      const query = search.trim().toLowerCase();

      const matchesSearch =
        query === "" ||
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.country.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query);

      const matchesCountry =
        country === "All Countries" || job.country === country;

      const matchesType =
        type === "All Types" || job.type === type;

      const matchesWorkplace =
        workplace === "All Workplaces" ||
        job.workplace === workplace;

      const matchesExperience =
        experience === "All Experience" ||
        job.experience === experience;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesType &&
        matchesWorkplace &&
        matchesExperience
      );
    });

    if (sort === "A-Z") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [
    search,
    country,
    type,
    workplace,
    experience,
    sort,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCountry("All Countries");
    setType("All Types");
    setWorkplace("All Workplaces");
    setExperience("All Experience");
    setSort("Latest");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-linear-to-br from-indigo-700 via-blue-600 to-cyan-600 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="text-2xl font-extrabold"
          >
            Nexora
          </Link>

          <div className="mt-12 max-w-3xl">
            <span className="inline-block rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              💼 Global Job Opportunities
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Find Your Next Opportunity
            </h1>

            <p className="mt-5 text-lg leading-8 text-blue-100">
              Discover jobs from companies around the world,
              including remote, hybrid and on-site opportunities.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-4xl">
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row">
              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4">
                <span className="text-xl">🔎</span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search job, company or location..."
                  className="w-full py-3 text-sm text-slate-900 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={() => setSearch(search.trim())}
                className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Filter
              label="Country"
              value={country}
              onChange={setCountry}
              options={countries}
            />

            <Filter
              label="Job Type"
              value={type}
              onChange={setType}
              options={types}
            />

            <Filter
              label="Workplace"
              value={workplace}
              onChange={setWorkplace}
              options={workplaces}
            />

            <Filter
              label="Experience"
              value={experience}
              onChange={setExperience}
              options={experiences}
            />

            <Filter
              label="Sort By"
              value={sort}
              onChange={setSort}
              options={["Latest", "A-Z"]}
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredJobs.length}
              </span>{" "}
              jobs
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="text-left text-sm font-semibold text-blue-600 hover:text-blue-700 sm:text-right"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Jobs */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
            />
          ))}
        </div>

        {/* Empty */}
        {filteredJobs.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <div className="text-5xl">🔍</div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No jobs found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Try changing your search or filters to find more
              job opportunities.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

/* Filter */

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* Job Card */

function JobCard({
  job,
}: {
  job: Job;
}) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
      {/* Top */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          💼
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            {job.workplace}
          </span>

          {/* Save Button */}
          <SaveButton
            item={{
              id: String(job.id),
              title: job.title,
              company: job.company,
              location: job.location,
              type: job.type,
              workplace: job.workplace,
              salary: job.salary,
              description: job.description,
              category: "job",
            }}
          />
        </div>
      </div>

      {/* Job Info */}
      <h2 className="mt-5 text-xl font-bold text-slate-900 transition group-hover:text-blue-600">
        {job.title}
      </h2>

      <p className="mt-2 font-semibold text-slate-600">
        {job.company}
      </p>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {job.description}
      </p>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          📍 {job.location}
        </span>

        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          🕐 {job.type}
        </span>

        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          📊 {job.experience}
        </span>

        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          🌍 {job.country}
        </span>
      </div>

      {/* Bottom */}
      <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-slate-400">
            Salary
          </p>

          <p className="mt-1 text-sm font-bold text-slate-800">
            💰 {job.salary}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Posted {job.posted}
          </p>
        </div>

        <Link
          href={`/jobs/${job.id}`}
          className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          View Job →
        </Link>
      </div>
    </article>
  );
}