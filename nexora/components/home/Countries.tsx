import { countries } from "@/data/countries";
import CountryCard from "@/components/ui/CountryCard";
import Link from "next/link";

export default function Countries() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <span className="font-semibold text-blue-600">
            GLOBAL OPPORTUNITIES
          </span>

          <h2 className="mt-3 text-4xl font-bold text-slate-900 md:text-5xl">
            Explore by Country
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            Find scholarships, jobs, internships and other opportunities
            available around the world.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((country) => (
            <CountryCard
              key={country.id}
              name={country.name}
              code={country.code}
              flag={country.flag}
              opportunities={country.opportunities}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
  href="/countries"
  className="inline-block rounded-xl border border-slate-300 bg-white px-7 py-3 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
>
  View All Countries →
</Link>
        </div>
      </div>
    </section>
  );
}