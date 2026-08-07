export default function Hero() {
  return (
    <section className="w-full min-h-screen pt-20  flex items-center justify-center bg-linear-to-br from-blue-600 via-sky-500 to-cyan-400">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <span className="inline-block rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-md">
          🌍 Global Opportunities Platform
        </span>

        <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-7xl">
          Discover Opportunities
          <br />
          Around The World
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100 md:text-xl">
          Scholarships, Jobs, Internships, Fellowships, Conferences and AI
          Career Tools — All in One Place.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <button className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 transition hover:scale-105">
            Explore Opportunities
          </button>

          <button className="rounded-xl border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-blue-600">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}