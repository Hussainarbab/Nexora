type TestimonialCardProps = {
  name: string;
  country: string;
  text: string;
};

export default function TestimonialCard({
  name,
  country,
  text,
}: TestimonialCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
        {name.charAt(0)}
      </div>

      <p className="italic text-slate-600">
        "{text}"
      </p>

      <div className="mt-6">
        <h3 className="font-bold text-slate-900">
          {name}
        </h3>

        <p className="text-sm text-slate-500">
          {country}
        </p>
      </div>
    </div>
  );
}