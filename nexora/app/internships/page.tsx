import { opportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/ui/OpportunityCard";

export default function InternshipsPage() {
  const internships = opportunities.filter(
    (item) => item.category === "Internship"
  );

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="bg-linear-to-r from-indigo-700 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-extrabold md:text-6xl">
            Internships
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-indigo-100">
            Build your experience with internships from leading
            companies and organizations.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">

          <h2 className="mb-10 text-3xl font-bold">
            Latest Internships
          </h2>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {internships.map((item) => (
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