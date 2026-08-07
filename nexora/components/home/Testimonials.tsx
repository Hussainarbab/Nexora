import { testimonials } from "@/data/testimonials";
import TestimonialCard from "@/components/ui/TestimonialCard";

export default function Testimonials() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">

        <div className="mb-14 text-center">
          <h2 className="text-5xl font-bold">
            Success Stories
          </h2>

          <p className="mt-4 text-lg text-slate-500">
            Thousands of students and professionals trust Nexora.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <TestimonialCard
              key={item.id}
              name={item.name}
              country={item.country}
              text={item.text}
            />
          ))}
        </div>

      </div>
    </section>
  );
}