"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "./Container";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-blue-600"
          >
            Nexora
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="font-medium text-slate-700 transition hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              href="/scholarships"
              className="font-medium text-slate-700 transition hover:text-blue-600"
            >
              Scholarships
            </Link>

            <Link
              href="/jobs"
              className="font-medium text-slate-700 transition hover:text-blue-600"
            >
              Jobs
            </Link>

            <Link
              href="/internships"
              className="font-medium text-slate-700 transition hover:text-blue-600"
            >
              Internships
            </Link>

            <Link
              href="/countries"
              className="font-medium text-slate-700 transition hover:text-blue-600"
            >
              Countries
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-2xl text-slate-700 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="border-t border-slate-100 py-5 lg:hidden">
            <nav className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Home
              </Link>

              <Link
                href="/scholarships"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Scholarships
              </Link>

              <Link
                href="/jobs"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Jobs
              </Link>

              <Link
                href="/internships"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Internships
              </Link>

              <Link
                href="/countries"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
              >
                Countries
              </Link>

              <div className="mt-3 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">

                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white"
                >
                  Get Started
                </Link>

              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
}