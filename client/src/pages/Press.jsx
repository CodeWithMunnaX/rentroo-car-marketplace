import React from "react";
import PageHeader from "../components/PageHeader";
import { assets } from "../assets/data";
import { pressItems } from "../assets/content";

const facts = [
  ["Founded", "2023, New Delhi"],
  ["Cities", "25 across India"],
  ["Partner agencies", "120+"],
  ["Listings", "3,000+ cars"],
];

const Press = () => (
  <>
    <PageHeader
      eyebrow="Press"
      title="Rentroo in the news"
      text="Latest coverage, company facts and media resources."
      crumbs={[{ label: "Press" }]}
    />
    <section className="max-padd-container pb-20 grid lg:grid-cols-[1fr_340px] gap-8 items-start">
      <div className="flex flex-col gap-4">
        {pressItems.map((item) => (
          <div key={item.title} className="card p-6 hover:shadow-lift transition">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
              <span className="text-solid">{item.outlet}</span>
              <span className="text-gray-50">· {item.date}</span>
            </div>
            <h4 className="mt-2">{item.title}</h4>
          </div>
        ))}
      </div>
      <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
        <div className="card p-6">
          <h5 className="mb-4">Fast facts</h5>
          <dl className="flex flex-col gap-3 text-sm">
            {facts.map(([k, v]) => (
              <div key={k} className="flexBetween">
                <dt className="text-gray-50">{k}</dt>
                <dd className="font-bold text-black">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="card p-6">
          <h5>Media kit</h5>
          <p className="text-sm mt-1">Logos, product screenshots and founder photos.</p>
          <img src={assets.logoImg} alt="Rentroo logo" className="h-10 mt-4" />
          <a href="mailto:press@rentroo.com" className="btn-solid inline-block mt-5 !py-2">Request media kit</a>
        </div>
        <div className="card p-6 bg-primaryTwo">
          <h5>Press contact</h5>
          <p className="text-sm mt-1">press@rentroo.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>
      </aside>
    </section>
  </>
);

export default Press;
