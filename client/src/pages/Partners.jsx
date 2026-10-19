import React from "react";
import { useClerk } from "@clerk/clerk-react";
import PageHeader from "../components/PageHeader";
import { assets } from "../assets/data";
import { partnerBenefits, partnerSteps } from "../assets/content";
import { useAppContext } from "../context/AppContext";

const Partners = () => {
  const { user, isOwner, navigate, setShowAgencyReg } = useAppContext();
  const { openSignIn } = useClerk();

  const getStarted = () => {
    if (!user) return openSignIn();
    if (isOwner) return navigate("/owner");
    setShowAgencyReg(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Partners"
        title="Grow your rental business with Rentroo"
        text="Join 120+ agencies listing their cars on India's most transparent car rental marketplace."
        crumbs={[{ label: "Partners" }]}
      >
        <button onClick={getStarted} className="btn-solid mt-6">
          {isOwner ? "Go to Dashboard" : "Register your agency"}
        </button>
      </PageHeader>

      <section className="max-padd-container pb-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partnerBenefits.map((b, i) => (
            <div key={b.title} className="card p-6">
              <span className="h-10 w-10 rounded-xl bg-primaryOne text-solid flexCenter font-bold">{i + 1}</span>
              <h4 className="mt-4">{b.title}</h4>
              <p className="mt-2 text-sm">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-padd-container pb-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img src={assets.agencyReg} alt="Partner hub" className="rounded-3xl w-full aspect-[4/5] object-cover shadow-soft max-h-[520px]" />
          <div>
            <span className="eyebrow">How it works</span>
            <h2 className="mt-2">Start earning in 4 simple steps</h2>
            <ol className="mt-8 flex flex-col gap-5">
              {partnerSteps.map((step, i) => (
                <li key={step} className="flex gap-4 items-start">
                  <span className="h-9 w-9 shrink-0 rounded-full bg-solid text-white flexCenter font-bold shadow-md shadow-solid/30">{i + 1}</span>
                  <p className="text-[15px] text-textColor pt-1.5">{step}</p>
                </li>
              ))}
            </ol>
            <button onClick={getStarted} className="btn-solid mt-8">Get started — it's free</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partners;
