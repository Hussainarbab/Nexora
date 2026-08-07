import Link from "next/link";


type OpportunityCardProps = {
  title: string;
  organization: string;
  country: string;
  level: string;
  funding: string;
  deadline: string;
  category: string;
};

export default function OpportunityCard({
  title,
  organization,
  country,
  level,
  funding,
  deadline,
  category,
}: OpportunityCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Top */}
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-600">
            {organization.charAt(0)}
          </div>

          <div>
            <h3 className="font-bold text-slate-900">{organization}</h3>
            <p className="text-sm text-slate-500">{country}</p>
          </div>
        </div>

        <button className="text-2xl transition hover:scale-125">
          🤍
        </button>
      </div>

      {/* Body */}
      <div className="p-6">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
          {category}
        </span>

        <h2 className="mt-4 text-2xl font-bold text-slate-900">
          {title}
        </h2>

        <div className="mt-6 space-y-3 text-slate-600">

          <div className="flex justify-between">
            <span>🎓 Level</span>
            <span>{level}</span>
          </div>

          <div className="flex justify-between">
            <span>💰 Funding</span>
            <span>{funding}</span>
          </div>

          <div className="flex justify-between">
            <span>📅 Deadline</span>
            <span>{deadline}</span>
          </div>

        </div>

      <Link
  href={`/opportunities/${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`}
  className="mt-8 block rounded-2xl bg-blue-600 py-4 text-center font-semibold text-white transition hover:bg-blue-700"
>
  View Details →
</Link>
      </div>
    </div>
  );
}