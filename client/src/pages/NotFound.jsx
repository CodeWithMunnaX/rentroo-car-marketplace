import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/data";

const NotFound = () => (
  <section className="min-h-[80vh] pt-28 pb-16 flexCenter bg-gradient-to-b from-primaryOne to-white">
    <div className="max-padd-container text-center">
      <h1 className="!text-[96px] md:!text-[140px] leading-none text-gradient">404</h1>
      <h3 className="mt-2">This road doesn't go anywhere</h3>
      <p className="mt-3 max-w-md mx-auto">The page you're looking for was moved or never existed. Let's get you back on track.</p>
      <img src={assets.bannerCar} alt="" className="w-72 mx-auto my-8 drop-shadow-xl" />
      <div className="flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-solid">Back to home</Link>
        <Link to="/listing" className="btn-outline bg-white">Browse cars</Link>
      </div>
    </div>
  </section>
);

export default NotFound;
