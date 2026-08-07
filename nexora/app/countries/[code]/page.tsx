import { countries } from "@/data/countries";
import { opportunities } from "@/data/opportunities";
import OpportunityCard from "@/components/ui/OpportunityCard";
import Link from "next/link";

type CountryPageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function CountryPage({
  params,
}: CountryPageProps) {
  const { code } = await params;

  const country = countries.find(
    (item) => item.code.toLowerCase() === code.toLowerCase()
  );

  if (!country) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Country Not Found
          </h1>

          <p className="mt-4 text-slate-500">
            We couldn't find this country.
          </p>

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

  const countryOpportunities = opportunities.filter(
    (item) =>
      item.country.toLowerCase() === country.name.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="bg-linear-to-r from-blue-700 to-indigo-700 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

          <div className="text-7xl">
            {country.flag}
          </div>

          <h1 className="mt-6 text-4xl font-extrabold md:text-6xl">
            Opportunities in {country.name}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            Discover scholarships, jobs, internships and other
            opportunities available in {country.name}.
          </p>

          <div className="mt-8 inline-flex rounded-full bg-white/15 px-6 py-3 backdrop-blur">
            {country.opportunities} opportunities
          </div>

        </div>
      </section>

      {/* Opportunities */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Latest Opportunities
            </h2>

            <p className="mt-2 text-slate-500">
              Explore the latest opportunities available in{" "}
              {country.name}.
            </p>
          </div>

          {countryOpportunities.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {countryOpportunities.map((item) => (
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
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
              <div className="text-5xl">🔎</div>

              <h3 className="mt-5 text-2xl font-bold">
                No opportunities yet
              </h3>

              <p className="mt-3 text-slate-500">
                New opportunities for {country.name} will appear here.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}