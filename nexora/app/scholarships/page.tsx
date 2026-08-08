"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Scholarship = {
  id: number;
  title: string;
  university: string;
  country: string;
  location: string;
  level: string;
  funding: string;
  deadline: string;
  deadlineDate: string;
  description: string;
};

const scholarships: Scholarship[] = [
  {
    id: 1,
    title: "Global Excellence Scholarship",
    university: "University of Melbourne",
    country: "Australia",
    location: "Melbourne",
    level: "Masters",
    funding: "Fully Funded",
    deadline: "30 Sep 2026",
    deadlineDate: "2026-09-30",
    description:
      "A competitive scholarship for talented international students pursuing postgraduate studies.",
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
    deadlineDate: "2026-10-15",
    description:
      "Financial support for outstanding international students with strong academic performance.",
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
    deadlineDate: "2026-11-05",
    description:
      "A prestigious opportunity for future leaders to study a one-year master's degree in the UK.",
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
    deadlineDate: "2026-10-31",
    description:
      "Funding opportunities for international students interested in postgraduate study in Germany.",
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
    deadlineDate: "2027-02-20",
    description:
      "Government-funded scholarships for international students at Turkish universities.",
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
    deadlineDate: "2026-12-01",
    description:
      "Merit-based financial support for high-achieving international students.",
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
    deadlineDate: "2027-03-15",
    description:
      "Government scholarship covering study opportunities for international students in China.",
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
    deadlineDate: "2027-04-30",
    description:
      "Japanese government scholarship for international students pursuing higher education.",
  },
];

export default function ScholarshipsPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [level, setLevel] = useState("All Levels");
  const [funding, setFunding] = useState("All Funding");
  const [sort, setSort] = useState("Latest");

  const countries = [
    "All Countries",
    ...Array.from(new Set(scholarships.map((item) => item.country))),
  ];

  const levels = [
    "All Levels",
    ...Array.from(new Set(scholarships.map((item) => item.level))),
  ];

  const fundingTypes = [
    "All Funding",
    ...Array.from(new Set(scholarships.map((item) => item.funding))),
  ];

  const filteredScholarships = useMemo(() => {
    let result = scholarships.filter((item) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchText) ||
        item.university.toLowerCase().includes(searchText) ||
        item.country.toLowerCase().includes(searchText);

      const matchesCountry =
        country === "All Countries" || item.country === country;

      const matchesLevel =
        level === "All Levels" || item.level === level;

      const matchesFunding =
        funding === "All Funding" || item.funding === funding;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesLevel &&
        matchesFunding
      );
    });

    if (sort === "Deadline") {
      result = [...result].sort((a, b) =>
        a.deadlineDate.localeCompare(b.deadlineDate)
      );
    }

    if (sort === "A-Z") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [search, country, level, funding, sort]);

  const clearFilters = () => {
    setSearch("");
    setCountry("All Countries");
    setLevel("All Levels");
    setFunding("All Funding");
    setSort("Latest");
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-linear-to-br from-blue-700 via-blue-600 to-indigo-700 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <Link
            href="/"
            className="text-2xl font-extrabold"
          >
            Nexora
          </Link>

          <div className="mt-12 max-w-3xl">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              🎓 Global Scholarship Opportunities
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Find Scholarships Around The World
            </h1>

            <p className="mt-5 text-lg leading-8 text-blue-100">
              Discover fully funded and partial scholarships from
              universities and governments around the world.
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
                  placeholder="Search scholarship, university or country..."
                  className="w-full py-3 text-sm text-slate-900 outline-none"
                />
              </div>

              <button
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

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            <div className="flex-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Country
              </label>

              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
              >
                {countries.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Study Level
              </label>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
              >
                {levels.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Funding
              </label>

              <select
                value={funding}
                onChange={(e) => setFunding(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
              >
                {fundingTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sort By
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
              >
                <option>Latest</option>
                <option>Deadline</option>
                <option>A-Z</option>
              </select>
            </div>

          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredScholarships.length}
              </span>{" "}
              scholarships
            </p>

            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* Scholarship Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {filteredScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
            />
          ))}

        </div>

        {/* No Results */}
        {filteredScholarships.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <div className="text-5xl">🔍</div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No scholarships found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Try changing your search or filters to find more
              opportunities.
            </p>

            <button
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

function ScholarshipCard({
  scholarship,
}: {
  scholarship: Scholarship;
}) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">

      <div className="flex items-start justify-between gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
          🎓
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            scholarship.funding === "Fully Funded"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {scholarship.funding}
        </span>

      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-blue-600">
        {scholarship.title}
      </h2>

      <p className="mt-2 font-medium text-slate-600">
        {scholarship.university}
      </p>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {scholarship.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-400">
            Country
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            🌍 {scholarship.country}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-400">
            Study Level
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-800">
            🎓 {scholarship.level}
          </p>
        </div>

      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

        <div>
          <p className="text-xs text-slate-400">
            Deadline
          </p>

          <p className="mt-1 text-sm font-bold text-red-600">
            📅 {scholarship.deadline}
          </p>
        </div>

       <Link
  href={`/scholarships/${scholarship.id}`}
  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
>
  View Details →
</Link>

      </div>

    </article>
  );
}