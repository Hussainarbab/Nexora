import Link from "next/link";
import { opportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/ui/OpportunityCard";

export default function ScholarshipsPage() {
  const scholarships = opportunities.filter(
    (item) => item.category === "Scholarship"
  );

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="bg-linear-to-r from-blue-700 to-indigo-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <Link
            href="/"
            className="text-sm text-blue-100 hover:text-white"
          >
            ← Home
          </Link>

          <h1 className="mt-8 text-4xl font-extrabold md:text-6xl">
            Scholarships
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-blue-100">
            Discover fully funded and partially funded scholarships
            from universities and organizations around the world.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Latest Scholarships
              </h2>

              <p className="mt-2 text-slate-500">
                Find your next educational opportunity.
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              {scholarships.length} Opportunities
            </span>
          </div>

          {scholarships.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {scholarships.map((item) => (
                <OpportunityCard
                  key={item.id}
                  title={item.title}
                  organization={item.organization}
                  country={item.country}
                  level={item.level}
                  funding={item.funding}
                  deadline={item.deadline}
                  category={item.category}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center">
              <div className="text-5xl">🎓</div>

              <h3 className="mt-5 text-2xl font-bold">
                No scholarships found
              </h3>

              <p className="mt-3 text-slate-500">
                New scholarships will be added soon.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}