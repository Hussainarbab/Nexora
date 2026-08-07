import { partners } from "@/data/partners";

export default function TrustedPartners() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center text-3xl font-bold text-slate-900">
          Trusted By Top Universities & Companies
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Explore opportunities from the world's leading institutions.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex h-28 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl font-bold shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}