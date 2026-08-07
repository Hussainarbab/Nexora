export default function Newsletter() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-4xl bg-linear-to-r from-blue-600 to-indigo-600 px-8 py-16 text-center text-white">

          <h2 className="text-4xl font-bold md:text-5xl">
            Never Miss an Opportunity
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Get scholarships, jobs, internships, fellowships and conferences
            delivered directly to your inbox.
          </p>

          <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-2xl border border-white/20 bg-white px-6 py-4 text-slate-900 outline-none"
            />

            <button className="rounded-2xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-black">
              Subscribe
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}