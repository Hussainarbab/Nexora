"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  email: string;
  first_name: string;
  second_name: string;
  full_name: string;
  bio: string;
  location: string;
  website: string;
  skills: string;
  avatar_url: string;
};

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<Profile>({
    id: "",
    email: "",
    first_name: "",
    second_name: "",
    full_name: "",
    bio: "",
    location: "",
    website: "",
    skills: "",
    avatar_url: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [editing, setEditing] = useState(false);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  /* =========================
     LOAD PROFILE
  ========================= */

  const loadProfile = async () => {
    setLoading(true);

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        window.location.href = "/login";
        return;
      }

      const metadata = user.user_metadata || {};

      setProfile({
        id: user.id,
        email: user.email || "",
        first_name: metadata.first_name || "",
        second_name: metadata.second_name || "",
        full_name: metadata.full_name || "",
        bio: metadata.bio || "",
        location: metadata.location || "",
        website: metadata.website || "",
        skills: metadata.skills || "",
        avatar_url: metadata.avatar_url || "",
      });
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to load your profile.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     HANDLE INPUT
  ========================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setMessage("");
    setErrorMessage("");
  };

  /* =========================
     UPLOAD IMAGE
  ========================= */

  const uploadProfileImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setMessage("");
    setErrorMessage("");

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size must be less than 5MB.");
      return;
    }

    setUploadingImage(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const extension =
        file.name.split(".").pop()?.toLowerCase() || "jpg";

      const filePath = `${user.id}/profile-${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("avatar")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        console.error(uploadError);
        setErrorMessage(
          `Image upload failed: ${uploadError.message}`
        );
        return;
      }

      const { data } = supabase.storage
        .from("avatar")
        .getPublicUrl(filePath);

      const avatarUrl = data.publicUrl;

      const { error: updateError } =
        await supabase.auth.updateUser({
          data: {
            avatar_url: avatarUrl,
          },
        });

      if (updateError) {
        setErrorMessage(
          `Failed to save image: ${updateError.message}`
        );
        return;
      }

      setProfile((current) => ({
        ...current,
        avatar_url: avatarUrl,
      }));

      setMessage("Profile photo updated successfully! 📸");
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong while uploading.");
    } finally {
      setUploadingImage(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  /* =========================
     REMOVE IMAGE
  ========================= */

  const removeProfileImage = async () => {
    setUploadingImage(true);
    setMessage("");
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          avatar_url: "",
        },
      });

      if (error) {
        setErrorMessage(
          `Failed to remove image: ${error.message}`
        );
        return;
      }

      setProfile((current) => ({
        ...current,
        avatar_url: "",
      }));

      setMessage("Profile photo removed.");
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to remove profile photo.");
    } finally {
      setUploadingImage(false);
    }
  };

  /* =========================
     SAVE PROFILE
  ========================= */

  const saveProfile = async () => {
    setSaving(true);
    setMessage("");
    setErrorMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = "/login";
        return;
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: profile.first_name,
          second_name: profile.second_name,
          full_name: profile.full_name,
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          skills: profile.skills,
          avatar_url: profile.avatar_url,
        },
      });

      if (error) {
        setErrorMessage(
          `Failed to update profile: ${error.message}`
        );
        return;
      }

      setMessage("Profile updated successfully! 🎉");
      setEditing(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     CANCEL EDIT
  ========================= */

  const cancelEdit = () => {
    setEditing(false);
    setMessage("");
    setErrorMessage("");

    loadProfile();
  };

  /* =========================
     PROFILE DATA
  ========================= */

  const profileName =
    profile.full_name ||
    `${profile.first_name} ${profile.second_name}`.trim() ||
    "Nexora User";

  const profileInitial =
    profileName.charAt(0).toUpperCase();

  const skills = profile.skills
    ? profile.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  const completionItems = [
    profile.first_name,
    profile.second_name,
    profile.full_name,
    profile.bio,
    profile.location,
    profile.website,
    profile.skills,
    profile.avatar_url,
  ];

  const completedItems =
    completionItems.filter(Boolean).length;

  const completionPercentage = Math.round(
    (completedItems / completionItems.length) * 100
  );

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-slate-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">

      {/* NAVBAR */}

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="text-2xl font-extrabold text-blue-600"
          >
            Nexora
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Dashboard
          </Link>

        </div>
      </header>

      {/* CONTENT */}

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* PROFILE HEADER */}

        <section className="overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-xl">

          <div className="p-6 sm:p-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

              {/* Avatar */}

              <div className="relative">

                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profileName}
                    className="h-28 w-28 rounded-3xl border-4 border-white/30 object-cover shadow-lg"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white/20 bg-white/15 text-4xl font-extrabold">
                    {profileInitial}
                  </div>
                )}

              </div>

              {/* INFO */}

              <div className="flex-1">

                <p className="text-sm font-medium text-blue-100">
                  Nexora Profile
                </p>

                <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">
                  {profileName}
                </h1>

                <p className="mt-2 text-blue-100">
                  {profile.email}
                </p>

                {profile.location && (
                  <p className="mt-2 text-sm text-blue-100">
                    📍 {profile.location}
                  </p>
                )}

              </div>

              {/* COMPLETION */}

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">

                <p className="text-sm text-blue-100">
                  Profile completion
                </p>

                <p className="mt-1 text-3xl font-extrabold">
                  {completionPercentage}%
                </p>

                <div className="mt-3 h-2 w-40 overflow-hidden rounded-full bg-white/20">

                  <div
                    className="h-full rounded-full bg-white transition-all"
                    style={{
                      width: `${completionPercentage}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* MESSAGES */}

        {message && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        )}

        {/* =========================
            VIEW MODE
        ========================= */}

        {!editing && (

          <div className="mt-8 grid gap-8 lg:grid-cols-3">

            {/* MAIN PROFILE */}

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Profile Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your public profile information
                  </p>

                </div>

                <button
                  onClick={() => setEditing(true)}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  ✏️ Edit Profile
                </button>

              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">

                <ProfileInfo
                  label="First Name"
                  value={profile.first_name}
                />

                <ProfileInfo
                  label="Second Name"
                  value={profile.second_name}
                />

                <ProfileInfo
                  label="Full Name"
                  value={profile.full_name}
                />

                <ProfileInfo
                  label="Email"
                  value={profile.email}
                />

                <ProfileInfo
                  label="Location"
                  value={profile.location}
                  icon="📍"
                />

                <ProfileInfo
                  label="Website"
                  value={profile.website}
                  icon="🌐"
                />

              </div>

              {/* BIO */}

              <div className="mt-8 border-t border-slate-100 pt-6">

                <h3 className="font-bold text-slate-900">
                  About
                </h3>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {profile.bio ||
                    "No bio added yet. Click Edit Profile to add one."}
                </p>

              </div>

              {/* SKILLS */}

              <div className="mt-8 border-t border-slate-100 pt-6">

                <h3 className="font-bold text-slate-900">
                  Skills
                </h3>

                {skills.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">

                    {skills.map((skill, index) => (
                      <span
                        key={`${skill}-${index}`}
                        className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>
                ) : (
                  <p className="mt-3 text-sm text-slate-500">
                    No skills added yet.
                  </p>
                )}

              </div>

            </section>

            {/* SIDEBAR */}

            <aside className="space-y-6">

              {/* PROFILE CARD */}

              <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">

                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profileName}
                    className="mx-auto h-28 w-28 rounded-3xl object-cover shadow-md"
                  />
                ) : (
                  <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-blue-100 text-4xl font-bold text-blue-600">
                    {profileInitial}
                  </div>
                )}

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {profileName}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {profile.email}
                </p>

                {profile.location && (
                  <p className="mt-3 text-sm text-slate-500">
                    📍 {profile.location}
                  </p>
                )}

                <button
                  onClick={() => setEditing(true)}
                  className="mt-6 w-full rounded-xl border border-blue-200 bg-blue-50 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
                >
                  Edit Profile
                </button>

              </section>

              {/* QUICK LINKS */}

              <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="text-lg font-bold text-slate-900">
                  Quick Links
                </h2>

                <div className="mt-4 space-y-3">

                  <QuickLink
                    href="/dashboard"
                    icon="📊"
                    title="Dashboard"
                  />

                  <QuickLink
                    href="/dashboard/saved-jobs"
                    icon="💼"
                    title="Saved Jobs"
                  />

                  <QuickLink
                    href="/dashboard/saved-internships"
                    icon="🧑‍💻"
                    title="Saved Internships"
                  />

                  <QuickLink
                    href="/dashboard/saved-scholarships"
                    icon="🎓"
                    title="Saved Scholarships"
                  />

                  <QuickLink
                    href="/dashboard/settings"
                    icon="⚙️"
                    title="Settings"
                  />

                </div>

              </section>

            </aside>

          </div>

        )}

        {/* =========================
            EDIT MODE
        ========================= */}

        {editing && (

          <div className="mt-8">

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    Edit Profile
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Update your personal information and profile photo.
                  </p>

                </div>

                <button
                  onClick={cancelEdit}
                  className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

              </div>

              {/* PHOTO */}

              <div className="mt-8 border-t border-slate-100 pt-8">

                <h3 className="text-lg font-bold text-slate-900">
                  Profile Photo
                </h3>

                <div className="mt-5 flex flex-col items-center gap-5 sm:flex-row">

                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profileName}
                      className="h-28 w-28 rounded-3xl object-cover shadow-md"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-blue-100 text-4xl font-bold text-blue-600">
                      {profileInitial}
                    </div>
                  )}

                  <div>

                    <div className="flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        disabled={uploadingImage}
                        className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                      >
                        {uploadingImage
                          ? "Uploading..."
                          : "Change Photo"}
                      </button>

                      {profile.avatar_url && (
                        <button
                          type="button"
                          onClick={removeProfileImage}
                          disabled={uploadingImage}
                          className="rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      )}

                    </div>

                    <p className="mt-3 text-xs text-slate-400">
                      JPG, PNG or WEBP. Maximum 5MB.
                    </p>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={uploadProfileImage}
                      className="hidden"
                    />

                  </div>

                </div>

              </div>

              {/* PERSONAL INFO */}

              <div className="mt-8 border-t border-slate-100 pt-8">

                <h3 className="text-lg font-bold text-slate-900">
                  Personal Information
                </h3>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">

                  <Input
                    label="First Name"
                    name="first_name"
                    value={profile.first_name}
                    onChange={handleChange}
                    placeholder="First name"
                  />

                  <Input
                    label="Second Name"
                    name="second_name"
                    value={profile.second_name}
                    onChange={handleChange}
                    placeholder="Second name"
                  />

                  <div className="sm:col-span-2">

                    <Input
                      label="Full Name"
                      name="full_name"
                      value={profile.full_name}
                      onChange={handleChange}
                      placeholder="Full name"
                    />

                  </div>

                  <div className="sm:col-span-2">

                    <label className="text-sm font-semibold text-slate-700">
                      Email
                    </label>

                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                      {profile.email}
                    </div>

                  </div>

                </div>

              </div>

              {/* ABOUT */}

              <div className="mt-8 border-t border-slate-100 pt-8">

                <h3 className="text-lg font-bold text-slate-900">
                  About You
                </h3>

                <div className="mt-5 space-y-5">

                  <div>

                    <label
                      htmlFor="bio"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Bio
                    </label>

                    <textarea
                      id="bio"
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about yourself..."
                      className="mt-2 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                  </div>

                  <Input
                    label="Location"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    placeholder="e.g. Gilgit, Pakistan"
                  />

                  <Input
                    label="Website / Portfolio"
                    name="website"
                    value={profile.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />

                  <div>

                    <label
                      htmlFor="skills"
                      className="text-sm font-semibold text-slate-700"
                    >
                      Skills
                    </label>

                    <input
                      id="skills"
                      name="skills"
                      value={profile.skills}
                      onChange={handleChange}
                      placeholder="React, JavaScript, Next.js, CSS"
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      Separate skills with commas.
                    </p>

                  </div>

                </div>

              </div>

              {/* SAVE */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  onClick={cancelEdit}
                  className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={saveProfile}
                  disabled={saving}
                  className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

              </div>

            </section>

          </div>

        )}

      </div>

    </main>
  );
}

/* =========================
   PROFILE INFO
========================= */

function ProfileInfo({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: string;
}) {
  return (
    <div>

      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
        {icon && <span>{icon}</span>}
        {value || "Not added yet"}
      </p>

    </div>
  );
}

/* =========================
   INPUT
========================= */

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder: string;
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
}

/* =========================
   QUICK LINK
========================= */

function QuickLink({
  href,
  icon,
  title,
}: {
  href: string;
  icon: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
    >
      <span className="text-lg">
        {icon}
      </span>

      <span>
        {title}
      </span>
    </Link>
  );
}