import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../assets/data";

const columns = [
  {
    title: "COMPANY",
    links: [["About", "/about"], ["Careers", "/careers"], ["Press", "/press"], ["Blog", "/blog"], ["Partners", "/partners"], ["Testimonials", "/testimonials"]],
  },
  {
    title: "SUPPORT",
    links: [["Help Center", "/help"], ["Safety Information", "/safety"], ["Cancellation Options", "/cancellation"], ["Contact Us", "/contact"], ["Accessibility", "/accessibility"]],
  },
];

const socials = [
  { icon: assets.facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: assets.instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: assets.twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: assets.linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const subscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Please enter a valid email");
    toast.success("Subscribed! Watch your inbox for offers.");
    setEmail("");
  };

  return (
    <footer className="pt-16 w-full text-gray-500 bg-gradient-to-b from-white to-primaryOne border-t-1 border-slate-900/5">
      <div className="max-padd-container">
        <div className="flex flex-wrap justify-between gap-12 md:gap-6">
          <div className="max-w-80">
            {/* Logo */}
            <Link to={"/"} className="inline-block">
              <img src={assets.logoImg} alt="logoImg" width={88} className="h-7" />
              <span className="text-textColor uppercase text-xs font-extrabold tracking-[6px] relative bottom-1">
                Rentroo
              </span>
            </Link>
            <p className="text-sm pt-3">
              Find reliable cars with transparent pricing, verified inspections, flexible pickup and delivery options, and 24/7 customer support.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="h-9 w-9 p-2 rounded-full bg-white ring-1 ring-slate-900/5 transition hover:-translate-y-0.5 hover:ring-solid/40">
                  <img src={s.icon} alt="" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-black text-sm tracking-[2px]">{col.title}</h4>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                {col.links.map(([label, to]) => (
                  <li key={to}>
                    <Link to={to} className="hover:text-solid transition">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="max-w-80">
            <h4 className="text-black text-sm tracking-[2px]">STAY UPDATED</h4>
            <p className="mt-3 text-sm">
              Subscribe to our newsletter for inspiration and special offers.
            </p>
            <form onSubmit={subscribe} className="flex items-center border pl-4 gap-2 bg-white border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full mt-6">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full h-full outline-none text-sm text-gray-500"
                placeholder="Your email"
              />
              <button type="submit" className="btn-solid font-medium !px-4 !py-2 mr-1">
                Subscribe
              </button>
            </form>
            <div className="mt-5 flex flex-col gap-1.5 text-sm">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-solid"><img src={assets.phone} alt="" width={14} /> +91 98765 43210</a>
              <a href="mailto:support@rentroo.com" className="flex items-center gap-2 hover:text-solid"><img src={assets.mail} alt="" width={14} /> support@rentroo.com</a>
            </div>
          </div>
        </div>
        <hr className="border-gray-300 mt-8" />
        <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
          <p>
            © {new Date().getFullYear()} <Link to="/" className="hover:text-solid">Rentroo</Link>. All rights reserved.
          </p>
          <ul className="flex items-center gap-4 text-sm">
            <li><Link to="/privacy" className="hover:text-solid">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-solid">Terms</Link></li>
            <li><Link to="/sitemap" className="hover:text-solid">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
