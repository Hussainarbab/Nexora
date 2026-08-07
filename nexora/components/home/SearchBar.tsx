"use client";

import { useState } from "react";

const countries = [
  "All Countries",
  "Pakistan",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Turkey",
  "China",
  "Japan",
];

const categories = [
  "All Categories",
  "Scholarships",
  "Jobs",
  "Internships",
  "Fellowships",
  "Conferences",
  "Grants",
];

const levels = [
  "All Levels",
  "High School",
  "Bachelor",
  "Master",
  "PhD",
];

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All Countries");
  const [category, setCategory] = useState("All Categories");
  const [level, setLevel] = useState("All Levels");

  const handleSearch = () => {
    console.log({
      search,
      country,
      category,
      level,
    });
  };

  return (
    <section className="relative z-20 -mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-5 shadow-2xl sm:p-6">

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search opportunities..."
              className="rounded-xl border border-slate-300 px-4 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {countries.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-4 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            >
              {levels.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 active:scale-95"
            >
              Search
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}