import React from "react";
import { Link } from "react-router-dom";

// Shared hero strip for inner pages, with breadcrumb
const PageHeader = ({ eyebrow, title, text, crumbs = [], children }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primaryOne via-white to-white pt-28 pb-12">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-solid/15 blur-3xl" />
      <div className="max-padd-container relative">
        <nav className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-50 mb-4">
          <Link to="/" className="hover:text-solid">Home</Link>
          {crumbs.map((c) => (
            <React.Fragment key={c.label}>
              <span>/</span>
              {c.to ? <Link to={c.to} className="hover:text-solid">{c.label}</Link> : <span className="text-black line-clamp-1">{c.label}</span>}
            </React.Fragment>
          ))}
        </nav>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="mt-2 max-w-3xl">{title}</h1>
        {text && <p className="mt-3 max-w-2xl text-base">{text}</p>}
        {children}
      </div>
    </section>
  );
};

export default PageHeader;
