interface SectionTitleProps {
  title: string;
  subtitle: string;
}

export default function SectionTitle({
  title,
  subtitle,
}: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-4xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-3 text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}