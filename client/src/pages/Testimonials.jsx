import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { assets } from "../assets/data";
import { reviews } from "../assets/content";

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <img key={i} src={assets.star} alt="" width={16} className={i < rating ? "" : "opacity-25 grayscale"} />
    ))}
  </div>
);

const Testimonials = () => {
  const [filter, setFilter] = useState(0); // 0 = all ratings
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  const counts = [5, 4, 3, 2, 1].map((s) => ({ star: s, count: reviews.filter((r) => r.rating === s).length }));
  const shown = filter ? reviews.filter((r) => r.rating === filter) : reviews;

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="Loved by renters and agencies across India"
        text="Real stories from people who rented, bought and listed cars on Rentroo."
        crumbs={[{ label: "Testimonials" }]}
      />
      <section className="max-padd-container pb-20">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Rating summary */}
          <aside className="card p-6 lg:sticky lg:top-24">
            <div className="flex items-end gap-2">
              <h1 className="!text-6xl">{avg}</h1>
              <p className="mb-2">/ 5</p>
            </div>
            <Stars rating={Math.round(avg)} />
            <p className="mt-2 text-sm">Based on {reviews.length} verified reviews</p>
            <div className="mt-6 flex flex-col gap-2">
              {counts.map(({ star, count }) => (
                <button
                  key={star}
                  onClick={() => setFilter(filter === star ? 0 : star)}
                  className={`flex items-center gap-3 text-sm font-semibold rounded-lg px-2 py-1 transition cursor-pointer ${filter === star ? "bg-primaryOne text-solid" : "hover:bg-primary"}`}
                >
                  <span className="w-6">{star}★</span>
                  <span className="flex-1 h-2 rounded-full bg-primary overflow-hidden">
                    <span className="block h-full bg-solid rounded-full" style={{ width: `${(count / reviews.length) * 100}%` }} />
                  </span>
                  <span className="w-5 text-right text-gray-50">{count}</span>
                </button>
              ))}
            </div>
            {filter > 0 && (
              <button onClick={() => setFilter(0)} className="mt-4 text-sm font-bold text-solid hover:underline cursor-pointer">
                Show all reviews
              </button>
            )}
          </aside>

          {/* Reviews */}
          <div className="columns-1 md:columns-2 gap-6 [&>*]:mb-6">
            {shown.map((review) => (
              <div key={review.name} className="break-inside-avoid card p-6 flex flex-col gap-4 transition hover:shadow-lift">
                <div className="flexBetween">
                  <Stars rating={review.rating} />
                  <p className="text-xs">{review.date}</p>
                </div>
                <p className="text-[15px] text-textColor leading-relaxed">“{review.text}”</p>
                <div className="flexBetween pt-4 border-t border-slate-900/5">
                  <div className="flex items-center gap-3">
                    <img src={review.image} alt={review.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-primaryOne" />
                    <div>
                      <h5 className="text-sm">{review.name}</h5>
                      <p className="text-xs">{review.city}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-solid bg-primaryOne px-2.5 py-1 rounded-full">{review.car}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 card p-8 text-center bg-gradient-to-br from-primaryOne to-white">
          <h3>Had a great trip?</h3>
          <p className="mt-2">Book your next ride and tell us how it went.</p>
          <Link to="/listing" className="btn-solid inline-block mt-5">Find a car</Link>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
