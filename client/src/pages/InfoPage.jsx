import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { infoPages } from "../assets/content";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// Renders long-form pages (safety, cancellation, accessibility, privacy, terms)
const InfoPage = ({ page }) => {
  const data = infoPages[page];

  return (
    <>
      <PageHeader eyebrow={data.eyebrow} title={data.title} text={data.intro} crumbs={[{ label: data.title }]} />
      <section className="max-padd-container pb-20">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 items-start">
          {/* Table of contents */}
          <aside className="card p-5 lg:sticky lg:top-24">
            <h5 className="text-sm mb-3">On this page</h5>
            <ul className="flex flex-col gap-2 text-sm">
              {data.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="text-gray-50 hover:text-solid transition">{s.heading}</a>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-900/5">
              <p className="text-xs">Still have questions?</p>
              <Link to="/contact" className="text-sm font-bold text-solid hover:underline">Contact support →</Link>
            </div>
          </aside>
          {/* Content */}
          <div className="card p-6 md:p-10 flex flex-col gap-8">
            {data.sections.map((s, i) => (
              <div key={s.heading} id={slugify(s.heading)} className="scroll-mt-24">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-8 rounded-full bg-primaryOne text-solid text-sm font-bold flexCenter">{i + 1}</span>
                  <h4>{s.heading}</h4>
                </div>
                {s.text && <p className="mt-3 text-[15px] leading-relaxed">{s.text}</p>}
                {s.list && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {s.list.map((item) => (
                      <li key={item} className="flex gap-2 text-[15px] text-gray-50">
                        <span className="text-solid font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default InfoPage;
