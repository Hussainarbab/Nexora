type CategoryCardProps = {
  title: string;
  icon: string;
  count: string;
};

export default function CategoryCard({
  title,
  icon,
  count,
}: CategoryCardProps) {
  return (
    <div className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="text-5xl">{icon}</div>

      <h3 className="mt-4 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-2 text-slate-500">
        {count} Opportunities
      </p>
    </div>
  );
}