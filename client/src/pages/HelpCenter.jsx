import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { assets } from "../assets/data";
import { faqs } from "../assets/content";

const quickLinks = [
  { title: "Safety Information", text: "Inspections, documents and emergencies", to: "/safety" },
  { title: "Cancellation Options", text: "Free cancellation and refund timelines", to: "/cancellation" },
  { title: "My Bookings", text: "View, pay for and manage your trips", to: "/my-bookings" },
  { title: "Become a Partner", text: "List your agency's cars on Rentroo", to: "/partners" },
];

const HelpCenter = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(0);
  const categories = ["All", ...new Set(faqs.map((f) => f.category))];

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return faqs.filter(
      (f) => (category === "All" || f.category === category) && (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    );
  }, [query, category]);

  return (
    <>
      <PageHeader
        eyebrow="Help Center"
        title="How can we help you?"
        text="Answers to common questions about booking, payments, documents and listing your cars."
        crumbs={[{ label: "Help Center" }]}
      >
        <div className="mt-6 max-w-xl flex items-center gap-3 bg-white rounded-2xl ring-1 ring-slate-900/10 shadow-lift px-4 py-3 focus-within:ring-2 focus-within:ring-solid/40">
          <img src={assets.search} alt="" width={18} />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(0); }}
            placeholder="Search e.g. payment, documents, cancel..."
            className="w-full outline-none text-sm font-medium"
          />
        </div>
      </PageHeader>

      <section className="max-padd-container pb-20">
        {/* Quick links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {quickLinks.map((l) => (
            <Link key={l.to} to={l.to} className="card p-5 hover:shadow-lift hover:-translate-y-0.5 transition">
              <h5>{l.title}</h5>
              <p className="text-sm mt-1">{l.text}</p>
              <span className="text-sm font-bold text-solid mt-3 inline-block">Open →</span>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div>
            <div className="flex flex-wrap gap-2 mb-5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCategory(c); setOpen(0); }}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ring-1 transition cursor-pointer ${category === c ? "bg-solid text-white ring-solid" : "bg-white ring-slate-900/10 hover:text-solid"}`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="card divide-y divide-slate-900/5">
              {results.length === 0 && <p className="p-8 text-center">No results for “{query}”. Try another word or contact support.</p>}
              {results.map((f, i) => (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flexBetween gap-4 text-left px-6 py-5 cursor-pointer hover:bg-primary/50 transition"
                  >
                    <span>
                      <span className="text-[11px] font-bold uppercase tracking-wide text-solid">{f.category}</span>
                      <h5 className="mt-0.5">{f.q}</h5>
                    </span>
                    <span className={`h-8 w-8 shrink-0 rounded-full bg-primaryOne text-solid flexCenter font-bold transition ${open === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                  {open === i && <p className="px-6 pb-6 -mt-1 text-[15px] leading-relaxed fade-up">{f.a}</p>}
                </div>
              ))}
            </div>
          </div>

          <aside className="card p-6 lg:sticky lg:top-24 bg-gradient-to-br from-solidDark to-solid !ring-0">
            <h4 className="!text-white">Still need help?</h4>
            <p className="!text-white/80 mt-2 text-sm">Our support team is available 24/7 by phone and email.</p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-white font-semibold">
              <span className="flex items-center gap-2"><img src={assets.phone} alt="" width={16} className="invert" /> +91 98765 43210</span>
              <span className="flex items-center gap-2"><img src={assets.mail} alt="" width={16} className="invert" /> support@rentroo.com</span>
            </div>
            <Link to="/contact" className="btn-white inline-block mt-6">Contact us</Link>
          </aside>
        </div>
      </section>
    </>
  );
};

export default HelpCenter;
