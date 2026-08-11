"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Internship = {
  id: number;
  title: string;
  company: string;
  country: string;
  location: string;
  type: string;
  workplace: string;
  level: string;
  payment: string;
  duration: string;
  posted: string;
  description: string;
};

const internships: Internship[] = [
  {
    id: 1,
    title: "Frontend Development Intern",
    company: "TechNova",
    country: "Pakistan",
    location: "Islamabad",
    type: "Full-time",
    workplace: "Remote",
    level: "Students",
    payment: "Paid",
    duration: "3 Months",
    posted: "2 days ago",
    description:
      "Learn and work on modern web applications using HTML, CSS, JavaScript and React.",
  },
  {
    id: 2,
    title: "Software Engineering Intern",
    company: "Microsoft",
    country: "United States",
    location: "Seattle",
    type: "Full-time",
    workplace: "On-site",
    level: "Undergraduate",
    payment: "Paid",
    duration: "12 Weeks",
    posted: "4 days ago",
    description:
      "Gain practical software engineering experience while working with experienced developers.",
  },
  {
    id: 3,
    title: "UI/UX Design Intern",
    company: "Creative Labs",
    country: "Canada",
    location: "Toronto",
    type: "Part-time",
    workplace: "Hybrid",
    level: "Students",
    payment: "Paid",
    duration: "4 Months",
    posted: "5 days ago",
    description:
      "Work with designers to create modern user interfaces and improve digital experiences.",
  },
  {
    id: 4,
    title: "React Developer Intern",
    company: "GlobalSoft",
    country: "United Kingdom",
    location: "London",
    type: "Full-time",
    workplace: "Remote",
    level: "Undergraduate",
    payment: "Paid",
    duration: "6 Months",
    posted: "1 week ago",
    description:
      "Build reusable React components and gain hands-on experience with modern frontend development.",
  },
  {
    id: 5,
    title: "Digital Marketing Intern",
    company: "FutureTech",
    country: "United Arab Emirates",
    location: "Dubai",
    type: "Full-time",
    workplace: "On-site",
    level: "Students",
    payment: "Paid",
    duration: "3 Months",
    posted: "1 week ago",
    description:
      "Learn digital marketing strategies, social media management and online campaign planning.",
  },
  {
    id: 6,
    title: "Web Development Intern",
    company: "CodeWorks",
    country: "Pakistan",
    location: "Lahore",
    type: "Part-time",
    workplace: "Hybrid",
    level: "Students",
    payment: "Unpaid",
    duration: "3 Months",
    posted: "2 weeks ago",
    description:
      "A beginner-friendly opportunity to improve your web development skills through real projects.",
  },
  {
    id: 7,
    title: "Data Science Intern",
    company: "Cloud Systems",
    country: "Australia",
    location: "Sydney",
    type: "Full-time",
    workplace: "Remote",
    level: "Graduate",
    payment: "Paid",
    duration: "6 Months",
    posted: "2 weeks ago",
    description:
      "Work with data scientists on analytics, machine learning and data-driven projects.",
  },
  {
    id: 8,
    title: "Product Management Intern",
    company: "DigitalWave",
    country: "Germany",
    location: "Berlin",
    type: "Full-time",
    workplace: "Hybrid",
    level: "Graduate",
    payment: "Paid",
    duration: "4 Months",
    posted: "3 weeks ago",
    description:
      "Support product teams with research, planning and development of digital products.",
  },
];

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [type, setType] = useState("All Types");
  const [workplace, setWorkplace] = useState("All Workplaces");
  const [level, setLevel] = useState("All Levels");
  const [payment, setPayment] = useState("All Payment");
  const [sort, setSort] = useState("Latest");

  const countries = [
    "All Countries",
    ...Array.from(new Set(internships.map((item) => item.country))),
  ];

  const types = [
    "All Types",
    ...Array.from(new Set(internships.map((item) => item.type))),
  ];

  const workplaces = [
    "All Workplaces",
    ...Array.from(new Set(internships.map((item) => item.workplace))),
  ];

  const levels = [
    "All Levels",
    ...Array.from(new Set(internships.map((item) => item.level))),
  ];

  const payments = [
    "All Payment",
    ...Array.from(new Set(internships.map((item) => item.payment))),
  ];

  const filteredInternships = useMemo(() => {
    let result = internships.filter((internship) => {
      const query = search.toLowerCase();

      const matchesSearch =
        internship.title.toLowerCase().includes(query) ||
        internship.company.toLowerCase().includes(query) ||
        internship.country.toLowerCase().includes(query) ||
        internship.location.toLowerCase().includes(query);

      const matchesCountry =
        country === "All Countries" ||
        internship.country === country;

      const matchesType =
        type === "All Types" ||
        internship.type === type;

      const matchesWorkplace =
        workplace === "All Workplaces" ||
        internship.workplace === workplace;

      const matchesLevel =
        level === "All Levels" ||
        internship.level === level;

      const matchesPayment =
        payment === "All Payment" ||
        internship.payment === payment;

      return (
        matchesSearch &&
        matchesCountry &&
        matchesType &&
        matchesWorkplace &&
        matchesLevel &&
        matchesPayment
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
    level,
    payment,
    sort,
  ]);

  const clearFilters = () => {
    setSearch("");
    setCountry("All Countries");
    setType("All Types");
    setWorkplace("All Workplaces");
    setLevel("All Levels");
    setPayment("All Payment");
    setSort("Latest");
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-linear-to-br from-violet-700 via-purple-600 to-fuchsia-600 px-4 py-16 text-white sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <Link
            href="/"
            className="text-2xl font-extrabold"
          >
            Nexora
          </Link>

          <div className="mt-12 max-w-3xl">

            <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              🚀 Global Internship Opportunities
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Find Your Perfect Internship
            </h1>

            <p className="mt-5 text-lg leading-8 text-purple-100">
              Discover internships from companies around the world
              and gain real-world experience for your career.
            </p>

          </div>

          {/* Search */}
          <div className="mt-8 max-w-4xl">

            <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-2xl sm:flex-row">

              <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4">

                <span className="text-xl">
                  🔎
                </span>

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search internship, company or location..."
                  className="w-full py-3 text-sm text-slate-900 outline-none"
                />

              </div>

              <button
                onClick={() => setSearch(search.trim())}
                className="rounded-xl bg-purple-600 px-7 py-3 font-semibold text-white transition hover:bg-purple-700"
              >
                Search
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Filters */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">

            <Filter
              label="Country"
              value={country}
              onChange={setCountry}
              options={countries}
            />

            <Filter
              label="Type"
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
              label="Study Level"
              value={level}
              onChange={setLevel}
              options={levels}
            />

            <Filter
              label="Payment"
              value={payment}
              onChange={setPayment}
              options={payments}
            />

            <Filter
              label="Sort By"
              value={sort}
              onChange={setSort}
              options={["Latest", "A-Z"]}
            />

          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {filteredInternships.length}
              </span>{" "}
              internships
            </p>

            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              Clear Filters
            </button>

          </div>

        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          {filteredInternships.map((internship) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
            />
          ))}

        </div>

        {/* Empty */}
        {filteredInternships.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No internships found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Try changing your search or filters to discover
              more internships.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
            >
              Reset Filters
            </button>

          </div>
        )}

      </section>

    </main>
  );
}

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
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
      >
        {options.map((option) => (
          <option key={option}>
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}

function InternshipCard({
  internship,
}: {
  internship: Internship;
}) {
  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl">

      <div className="flex items-start justify-between gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-2xl">
          🚀
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${
            internship.payment === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {internship.payment}
        </span>

      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-purple-600">
        {internship.title}
      </h2>

      <p className="mt-2 font-semibold text-slate-600">
        {internship.company}
      </p>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {internship.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">

        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          📍 {internship.location}
        </span>

        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          🕐 {internship.type}
        </span>

        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          🎓 {internship.level}
        </span>

        <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
          ⏳ {internship.duration}
        </span>

      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-5">

        <div>

          <p className="text-xs text-slate-400">
            Workplace
          </p>

          <p className="mt-1 text-sm font-bold text-slate-800">
            🏠 {internship.workplace}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Posted {internship.posted}
          </p>

        </div>

        <Link
          href={`/internships/${internship.id}`}
          className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          View Details →
        </Link>

      </div>

    </article>
  );
}