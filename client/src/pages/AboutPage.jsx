import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import About from "../components/About";
import { assets } from "../assets/data";

const milestones = [
  { year: "2023", title: "The idea", text: "Started in Delhi after one too many rentals with hidden charges and dirty cars." },
  { year: "2024", title: "First 20 agencies", text: "Onboarded our first partner agencies in Delhi, Mumbai and Bengaluru." },
  { year: "2025", title: "25 cities", text: "Crossed 3,000 listings and 120+ verified agencies across India." },
];

const values = [
  { title: "Transparency", text: "The price you see is the price you pay. No hidden fees, ever.", bg: "bg-primaryOne" },
  { title: "Trust", text: "Every agency is verified and every car is inspected before listing.", bg: "bg-primaryTwo" },
  { title: "Freedom", text: "Self-drive, flexible dates and doorstep delivery — travel your way.", bg: "bg-primaryThree" },
];

const AboutPage = () => (
  <>
    <PageHeader
      eyebrow="About Rentroo"
      title="Making car rentals in India simple, honest and fast"
      text="Rentroo connects travellers with verified local agencies so you can rent or buy a car with total confidence."
      crumbs={[{ label: "About" }]}
    />
    <div className="max-padd-container">
      <img src={assets.contact} alt="Rentroo hub" className="w-full aspect-[21/8] object-cover rounded-3xl shadow-soft" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mt-10 relative px-4">
        {[["3k+", "Cars listed"], ["120+", "Partner agencies"], ["25", "Cities"], ["50k+", "Happy trips"]].map(([v, l]) => (
          <div key={l} className="card p-5 text-center">
            <h3 className="text-solid">{v}</h3>
            <p className="text-xs font-semibold uppercase tracking-wide mt-1">{l}</p>
          </div>
        ))}
      </div>
    </div>

    <About />

    <section className="max-padd-container py-12">
      <span className="eyebrow">What we believe</span>
      <h2 className="mt-2 mb-8">Our values</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {values.map((v) => (
          <div key={v.title} className={`${v.bg} rounded-2xl p-6 ring-1 ring-slate-900/5`}>
            <h4>{v.title}</h4>
            <p className="mt-2">{v.text}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="max-padd-container py-12">
      <span className="eyebrow">Our journey</span>
      <h2 className="mt-2 mb-8">From one city to twenty-five</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {milestones.map((m) => (
          <div key={m.year} className="card p-6 relative overflow-hidden">
            <span className="absolute -right-2 -top-4 text-7xl font-extrabold text-primaryOne">{m.year}</span>
            <div className="relative">
              <span className="text-sm font-bold text-solid">{m.year}</span>
              <h4 className="mt-1">{m.title}</h4>
              <p className="mt-2">{m.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="max-padd-container py-12 pb-20">
      <div className="rounded-3xl bg-gradient-to-r from-solidDark to-solid p-10 text-white grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <h3 className="!text-white">Want to build the future of mobility with us?</h3>
          <p className="!text-white/80 mt-2">We're hiring across engineering, design and operations.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/careers" className="btn-white">View jobs</Link>
          <Link to="/partners" className="btn-outline !text-white !border-white/30 hover:!bg-white/10">Become a partner</Link>
        </div>
      </div>
    </section>
  </>
);

export default AboutPage;
