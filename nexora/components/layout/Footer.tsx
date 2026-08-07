import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16">

        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              Nexora
            </h2>

            <p className="mt-4 text-slate-400">
              Discover scholarships, jobs, internships and global opportunities
              in one place.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Opportunities
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li><Link href="/scholarships">Scholarships</Link></li>
              <li><Link href="/jobs">Jobs</Link></li>
              <li><Link href="/internships">Internships</Link></li>
              <li><Link href="/conferences">Conferences</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Company
            </h3>

            <ul className="space-y-2 text-slate-400">
              <li><Link href="/">About</Link></li>
              <li><Link href="/">Contact</Link></li>
              <li><Link href="/">Privacy Policy</Link></li>
              <li><Link href="/">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contact
            </h3>

            <p className="text-slate-400">
              support@nexora.com
            </p>

            <p className="mt-2 text-slate-400">
              Available Worldwide 🌍
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-slate-500">
          © 2026 Nexora. All rights reserved.
        </div>

      </div>
    </footer>
  );
}