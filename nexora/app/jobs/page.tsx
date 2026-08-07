import { opportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/ui/OpportunityCard";

export default function JobsPage() {
  const jobs = opportunities.filter(
    (item) => item.category === "Job"
  );

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="bg-linear-to-r from-slate-900 to-blue-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold md:text-6xl">
            Global Jobs
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-300">
            Find jobs from companies and organizations around the world.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">

          <div className="mb-10">
            <h2 className="text-3xl font-bold">
              Latest Jobs
            </h2>

            <p className="mt-2 text-slate-500">
              Explore career opportunities worldwide.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((item) => (
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

        </div>
      </section>

    </main>
  );
}