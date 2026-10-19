import React, { useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../components/PageHeader";
import { assets } from "../assets/data";
import { jobs, perks } from "../assets/content";

const Careers = () => {
  const teams = ["All", ...new Set(jobs.map((j) => j.team))];
  const [team, setTeam] = useState("All");
  const shown = team === "All" ? jobs : jobs.filter((j) => j.team === team);

  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Help millions of Indians hit the road"
        text="We're a small, ambitious team building India's most trusted car rental marketplace. Come build it with us."
        crumbs={[{ label: "Careers" }]}
      />
      <section className="max-padd-container pb-12">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <img src={assets.about1} alt="Team" className="rounded-3xl w-full aspect-[4/3] object-cover shadow-soft" />
          <div className="grid grid-cols-2 gap-4">
            {perks.map((p) => (
              <div key={p.title} className="card p-5">
                <h5>{p.title}</h5>
                <p className="text-sm mt-1">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-padd-container pb-20">
        <div className="flexBetween flex-wrap gap-4 mb-6">
          <h2>Open positions <span className="text-solid">({shown.length})</span></h2>
          <div className="flex flex-wrap gap-2">
            {teams.map((t) => (
              <button
                key={t}
                onClick={() => setTeam(t)}
                className={`px-4 py-2 rounded-full text-sm font-semibold ring-1 transition cursor-pointer ${team === t ? "bg-solid text-white ring-solid" : "bg-white ring-slate-900/10 hover:text-solid"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="card divide-y divide-slate-900/5">
          {shown.map((job) => (
            <div key={job.title} className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-5 hover:bg-primary/50 transition">
              <div>
                <h4>{job.title}</h4>
                <div className="flex flex-wrap gap-2 mt-2 text-xs font-semibold">
                  <span className="bg-primaryOne text-solid px-2.5 py-1 rounded-full">{job.team}</span>
                  <span className="bg-primary px-2.5 py-1 rounded-full">{job.location}</span>
                  <span className="bg-primary px-2.5 py-1 rounded-full">{job.type}</span>
                </div>
              </div>
              <button
                onClick={() => toast.success(`Thanks! Send your CV for "${job.title}" to careers@rentroo.com`)}
                className="btn-solid !py-2 shrink-0"
              >
                Apply now
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Careers;
