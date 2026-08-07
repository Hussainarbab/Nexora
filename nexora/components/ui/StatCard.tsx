type StatCardProps = {
  number: string;
  title: string;
};

export default function StatCard({
  number,
  title,
}: StatCardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <h3 className="text-5xl font-extrabold text-blue-600">
        {number}
      </h3>

      <p className="mt-3 text-lg text-slate-600">
        {title}
      </p>
    </div>
  );
}