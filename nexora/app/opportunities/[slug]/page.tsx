import Link from "next/link";
import { opportunities } from "@/data/opportunities";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OpportunityPage({ params }: Props) {
  const { slug } = await params;

  const opportunity = opportunities.find(
    (item) =>
      item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") === slug
  );

  if (!opportunity) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Opportunity Not Found</h1>

          <Link
            href="/"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 py-24 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-blue-100 hover:text-white"
          >
            ← Back to opportunities
          </Link>

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white text-3xl font-bold text-blue-600">
              {opportunity.organization.charAt(0)}
            </div>

            <div>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
                {opportunity.category}
              </span>

              <h1 className="mt-4 text-4xl font-extrabold md:text-5xl">
                {opportunity.title}
              </h1>

              <p className="mt-4 text-lg text-blue-100">
                {opportunity.organization} · {opportunity.country}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 md:grid-cols-3">

          <div className="space-y-6 md:col-span-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">
                Opportunity Details
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Explore this opportunity and learn more about its
                eligibility, funding, application process and deadline.
                Nexora brings global opportunities together in one place.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold">
                Eligibility & Requirements
              </h2>

              <ul className="mt-5 space-y-3 text-slate-600">
                <li>✓ Meet the required education level</li>
                <li>✓ Meet the eligibility requirements</li>
                <li>✓ Submit the required documents</li>
                <li>✓ Apply before the deadline</li>
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">
              Opportunity Overview
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500">Country</p>
                <p className="mt-1 font-semibold">
                  🌍 {opportunity.country}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Level</p>
                <p className="mt-1 font-semibold">
                  🎓 {opportunity.level}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Funding</p>
                <p className="mt-1 font-semibold text-green-600">
                  💰 {opportunity.funding}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Deadline</p>
                <p className="mt-1 font-semibold">
                  📅 {opportunity.deadline}
                </p>
              </div>
            </div>

            <button className="mt-8 w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700">
              Apply Now →
            </button>

            <button className="mt-3 w-full rounded-2xl border border-slate-300 py-4 font-semibold text-slate-700 transition hover:bg-slate-50">
              ♡ Save Opportunity
            </button>
          </aside>

        </div>
      </section>
    </main>
  );
}