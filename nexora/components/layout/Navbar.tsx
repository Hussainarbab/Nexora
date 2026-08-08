"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./Container";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get current logged-in user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    // Listen for login/logout changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">

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

            {/* Saved - only logged in users */}
            {user && (
              <Link
                href="/saved"
                className="font-medium text-slate-700 transition hover:text-blue-600"
              >
                ❤️ Saved
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="rounded-xl border border-slate-300 px-5 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  👤 Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
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
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-2xl text-slate-700 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
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
                className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                Home
              </Link>

              <Link
                href="/scholarships"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                🎓 Scholarships
              </Link>

              <Link
                href="/jobs"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                💼 Jobs
              </Link>

              <Link
                href="/internships"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                🚀 Internships
              </Link>

              <Link
                href="/countries"
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
              >
                🌍 Countries
              </Link>

              {/* Logged-in User Links */}
              {user && (
                <>
                  <Link
                    href="/saved"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    ❤️ Saved
                  </Link>

                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
                  >
                    👤 Profile
                  </Link>
                </>
              )}

              {/* Mobile Actions */}
              <div className="mt-3 border-t border-slate-100 pt-4">

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-red-600"
                  >
                    Logout
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3">

                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className="rounded-xl border border-slate-300 px-4 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Login
                    </Link>

                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className="rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                    >
                      Get Started
                    </Link>

                  </div>
                )}

              </div>

            </nav>

          </div>
        )}
      </Container>
    </header>
  );
}