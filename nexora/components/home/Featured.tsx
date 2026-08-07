import { opportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/ui/OpportunityCard";

export default function Featured() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-14 text-center">
          <h2 className="text-5xl font-bold">
            Featured Opportunities
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Hand-picked opportunities from top universities and companies.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((item) => (
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
  );
}