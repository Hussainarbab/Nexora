import { stats } from "@/data/stats";
import StatCard from "@/components/ui/StatCard";

export default function Stats() {
  return (
    <section className="bg-linear-to-r from-blue-600 to-sky-500 py-24">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-16 text-center text-white">
          <h2 className="text-5xl font-bold">
            Trusted Worldwide
          </h2>

          <p className="mt-4 text-lg text-blue-100">
            Helping students and professionals discover global opportunities.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <StatCard
              key={item.id}
              number={item.number}
              title={item.title}
            />
          ))}
        </div>

      </div>
    </section>
  );
}