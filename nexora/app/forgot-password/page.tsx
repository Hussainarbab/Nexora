"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-extrabold text-blue-600"
          >
            Nexora
          </Link>

          <h1 className="mt-8 text-3xl font-bold text-slate-900">
            Reset your password
          </h1>

          <p className="mt-2 text-slate-500">
            Enter your email and we'll send you a reset link.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">

          {sent ? (
            <div className="text-center">
              <div className="text-5xl">📩</div>

              <h2 className="mt-5 text-xl font-bold">
                Check your email
              </h2>

              <p className="mt-3 text-slate-500">
                If an account exists with that email, you'll receive
                password reset instructions.
              </p>

              <Link
                href="/login"
                className="mt-6 inline-block font-semibold text-blue-600"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email
                </label>

                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700"
              >
                Send Reset Link
              </button>

              <p className="text-center text-sm text-slate-500">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600"
                >
                  Login
                </Link>
              </p>

            </form>
          )}

        </div>

      </div>
    </main>
  );
}