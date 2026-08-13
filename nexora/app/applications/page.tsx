"use client";

import Link from "next/link";
import { useState } from "react";

type ApplicationStatus =
  | "Pending"
  | "Accepted"
  | "Rejected";

type Application = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Job" | "Internship";
  appliedDate: string;
  status: ApplicationStatus;
};

const applications: Application[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova",
    location: "Islamabad, Pakistan",
    type: "Job",
    appliedDate: "12 Aug 2026",
    status: "Pending",
  },
  {
    id: 2,
    title: "React Developer Intern",
    company: "GlobalSoft",
    location: "London, United Kingdom",
    type: "Internship",
    appliedDate: "10 Aug 2026",
    status: "Accepted",
  },
  {
    id: 3,
    title: "Junior Web Developer",
    company: "CodeWorks",
    location: "Lahore, Pakistan",
    type: "Job",
    appliedDate: "8 Aug 2026",
    status: "Rejected",
  },
  {
    id: 4,
    title: "Frontend Development Intern",
    company: "DigitalWave",
    location: "Berlin, Germany",
    type: "Internship",
    appliedDate: "5 Aug 2026",
    status: "Pending",
  },
];

export default function ApplicationsPage() {
  const [filter, setFilter] = useState("All");

  const filteredApplications =
    filter === "All"
      ? applications
      : applications.filter(
          (application) => application.status === filter
        );

  const pendingCount = applications.filter(
    (application) => application.status === "Pending"
  ).length;

  const acceptedCount = applications.filter(
    (application) => application.status === "Accepted"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-linear-to-br from-indigo-700 via-blue-600 to-cyan-600 px-4 py-12 text-white sm:px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <Link
            href="/"
            className="text-2xl font-extrabold"
          >
            Nexora
          </Link>

          <div className="mt-10">

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              My Applications
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
              Track all your job and internship applications
              in one place.
            </p>

          </div>

        </div>

      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon="📋"
            label="Total Applications"
            value={applications.length}
          />

          <StatCard
            icon="🟡"
            label="Pending"
            value={pendingCount}
          />

          <StatCard
            icon="🟢"
            label="Accepted"
            value={acceptedCount}
          />

          <StatCard
            icon="🔴"
            label="Rejected"
            value={rejectedCount}
          />

        </div>

        {/* Filters */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-wrap gap-2">

            {["All", "Pending", "Accepted", "Rejected"].map(
              (option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                    filter === option
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {option}
                </button>
              )
            )}

          </div>

        </div>

        {/* Applications */}
        <div className="mt-8 space-y-5">

          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
            />
          ))}

        </div>

        {/* Empty State */}
        {filteredApplications.length === 0 && (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">

            <div className="text-5xl">
              📭
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              No applications found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              You don't have any applications with this
              status yet.
            </p>

            <Link
              href="/jobs"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Find Jobs
            </Link>

          </div>
        )}

      </section>

    </main>
  );
}

/* Statistics Card */
function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-xl">
          {icon}
        </div>

        <div>

          <p className="text-sm text-slate-500">
            {label}
          </p>

          <p className="mt-1 text-2xl font-extrabold text-slate-900">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
}

/* Application Card */
function ApplicationCard({
  application,
}: {
  application: Application;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-200 hover:shadow-lg">

      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* Left */}
        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
            {application.type === "Job" ? "💼" : "🚀"}
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h2 className="text-xl font-bold text-slate-900">
                {application.title}
              </h2>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {application.type}
              </span>

            </div>

            <p className="mt-2 font-semibold text-slate-600">
              {application.company}
            </p>

            <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">

              <span>
                📍 {application.location}
              </span>

              <span>
                📅 Applied {application.appliedDate}
              </span>

            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center justify-between gap-4 md:justify-end">

          <StatusBadge status={application.status} />

          <Link
            href={`/applications/${application.id}`}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View →
          </Link>

        </div>

      </div>

    </article>
  );
}

/* Status Badge */
function StatusBadge({
  status,
}: {
  status: ApplicationStatus;
}) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Accepted: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  const icons = {
    Pending: "🟡",
    Accepted: "🟢",
    Rejected: "🔴",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-xs font-bold ${styles[status]}`}
    >
      {icons[status]} {status}
    </span>
  );
}