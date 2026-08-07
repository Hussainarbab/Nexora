import { categories } from "@/data/categories";
import CategoryCard from "@/components/ui/CategoryCard";

export default function Categories() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Browse by Category
          </h2>

          <p className="mt-3 text-slate-500">
            Explore thousands of global opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              icon={category.icon}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </section>
  );
}