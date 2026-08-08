"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const hasMinLength = password.length >= 8;

  const passwordStrong =
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSymbol &&
    hasMinLength;

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Save the form reference BEFORE await
    const form = e.currentTarget;

    setError("");
    setMessage("");

    const formData = new FormData(form);

    const firstName = formData.get("firstName") as string;
    const secondName = formData.get("secondName") as string;
    const email = formData.get("email") as string;

    if (!passwordStrong) {
      setError(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one symbol."
      );
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          second_name: secondName,
          full_name: `${firstName} ${secondName}`,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    alert(
      "Registration successful! Please check your email to confirm your account."
    );

    setMessage(
      "Registration successful! Please check your email to confirm your account."
    );

    // Reset form safely
    form.reset();

    setPassword("");
    setConfirmPassword("");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-extrabold text-blue-600"
          >
            Nexora
          </Link>

          <h1 className="mt-8 text-3xl font-bold text-slate-900">
            Create your account
          </h1>

          <p className="mt-2 text-slate-500">
            Join Nexora and discover opportunities worldwide.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* First + Second Name */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  First Name
                </label>

                <input
                  name="firstName"
                  type="text"
                  required
                  placeholder="First name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Second Name
                </label>

                <input
                  name="secondName"
                  type="text"
                  required
                  placeholder="Second name"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                />
              </div>

            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              />

              {/* Password Requirements */}
              <div className="mt-3 rounded-xl bg-slate-50 p-4">
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Password must contain:
                </p>

                <div className="grid gap-1 text-sm sm:grid-cols-2">

                  <PasswordRule
                    valid={hasMinLength}
                    text="At least 8 characters"
                  />

                  <PasswordRule
                    valid={hasUppercase}
                    text="One uppercase letter (A-Z)"
                  />

                  <PasswordRule
                    valid={hasLowercase}
                    text="One lowercase letter (a-z)"
                  />

                  <PasswordRule
                    valid={hasNumber}
                    text="One number (0-9)"
                  />

                  <PasswordRule
                    valid={hasSymbol}
                    text="One symbol (!@#$%)"
                  />

                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Re-enter Password
              </label>

              <input
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={`w-full rounded-xl border px-4 py-3.5 outline-none transition focus:ring-2 ${
                  confirmPassword.length === 0
                    ? "border-slate-300 focus:border-blue-600 focus:ring-blue-100"
                    : passwordsMatch
                      ? "border-green-500 focus:border-green-500 focus:ring-green-100"
                      : "border-red-500 focus:border-red-500 focus:ring-red-100"
                }`}
              />

              {confirmPassword.length > 0 && (
                <p
                  className={`mt-2 text-sm font-medium ${
                    passwordsMatch
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {passwordsMatch
                    ? "✓ Passwords match"
                    : "✕ Passwords do not match"}
                </p>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-600">
                {message}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={
                loading ||
                !passwordStrong ||
                !passwordsMatch
              }
              className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}

/* Password Rule Component */
function PasswordRule({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div
      className={`flex items-center gap-2 ${
        valid
          ? "text-green-600"
          : "text-slate-500"
      }`}
    >
      <span>{valid ? "✓" : "○"}</span>
      <span>{text}</span>
    </div>
  );
}