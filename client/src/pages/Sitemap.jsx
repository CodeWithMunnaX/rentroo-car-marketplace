import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { posts } from "../assets/blogPosts";
import { useAppContext } from "../context/AppContext";

const Sitemap = () => {
  const { cars } = useAppContext();
  const groups = [
    { title: "Main", links: [["Home", "/"], ["Listing", "/listing"], ["Blog", "/blog"], ["Contact", "/contact"], ["My Bookings", "/my-bookings"]] },
    { title: "Company", links: [["About", "/about"], ["Careers", "/careers"], ["Press", "/press"], ["Partners", "/partners"], ["Testimonials", "/testimonials"]] },
    { title: "Support", links: [["Help Center", "/help"], ["Safety Information", "/safety"], ["Cancellation Options", "/cancellation"], ["Accessibility", "/accessibility"]] },
    { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Sitemap", "/sitemap"]] },
    { title: "Blog posts", links: posts.map((p) => [p.title, `/blog/${p.slug}`]) },
    { title: "Cars", links: cars.map((c) => [c.title, `/listing/${c._id}`]) },
  ];

  return (
    <>
      <PageHeader eyebrow="Sitemap" title="Every page on Rentroo" crumbs={[{ label: "Sitemap" }]} />
      <section className="max-padd-container pb-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g) => (
          <div key={g.title} className="card p-6">
            <h5 className="mb-3">{g.title}</h5>
            <ul className="flex flex-col gap-2 text-sm">
              {g.links.map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-50 hover:text-solid transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </>
  );
};

export default Sitemap;
