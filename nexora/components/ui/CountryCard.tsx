import Link from "next/link";

type CountryCardProps = {
  name: string;
  code: string;
  flag: string;
  opportunities: string;
};

export default function CountryCard({
  name,
  code,
  flag,
  opportunities,
}: CountryCardProps) {
  return (
    <Link
      href={`/countries/${code.toLowerCase()}`}
      className="group rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl">
          {flag}
        </div>

        <div>
          <h3 className="font-bold text-slate-900 group-hover:text-blue-600">
            {name}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {opportunities} opportunities
          </p>
        </div>
      </div>

      <div className="mt-5 text-sm font-semibold text-blue-600">
        Explore opportunities →
      </div>
    </Link>
  );
}