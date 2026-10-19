import React from "react";
import { assets } from "../assets/data";
import Title from "./Title"
import { Link } from "react-router-dom";
import { reviews } from "../assets/content";

const Testimonial = () => {
  return (
    <section className="max-padd-container py-16 xl:py-28">
      <Title
        title1={"What People Says"}
        title2={"Don't just take our words"}
        titleStyles={"mb-10"}
        para={"Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review."}
      />
      {/* CONTAINER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.name} className="card w-full p-6 flex flex-col gap-5 text-sm transition hover:-translate-y-1 hover:shadow-lift">
            <div className="flexBetween">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <img key={i} src={assets.star} alt="" width={16} />
                ))}
              </div>
              <p className="text-xs">{review.date}</p>
            </div>
            <p className="text-[15px] text-textColor flex-1">“{review.text}”</p>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-900/5">
              <img src={review.image} alt="userImg" className="h-10 w-10 rounded-full object-cover ring-2 ring-primaryOne" />
              <div>
                <h5 className="text-sm">{review.name}</h5>
                <p className="text-xs">{review.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flexCenter mt-10">
        <Link to="/testimonials" className="btn-outline bg-white">Read all reviews →</Link>
      </div>
    </section>
  );
};

export default Testimonial;
