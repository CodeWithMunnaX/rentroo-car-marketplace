import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { posts, formatPostDate } from '../assets/blogPosts'

const PostMeta = ({ post }) => (
  <div className='flex items-center gap-2 text-xs text-gray-50 font-semibold'>
    <img src={post.author.image} alt="" className='h-6 w-6 rounded-full object-cover' />
    <span className='text-textColor'>{post.author.name}</span>
    <span>·</span>
    <span>{formatPostDate(post.date)}</span>
    <span>·</span>
    <span>{post.readTime} min read</span>
  </div>
)

const Blog = () => {
  const categories = ["All", ...new Set(posts.map((p) => p.category))]
  const [active, setActive] = useState("All")
  const [featured, ...rest] = posts
  const filtered = active === "All" ? rest : posts.filter((p) => p.category === active)

  return (
    <>
      <PageHeader
        eyebrow="Rentroo Journal"
        title="Guides, tips and stories for the road"
        text="Practical advice on renting, buying and road-tripping across India — written by our travel and auto experts."
        crumbs={[{ label: "Blog" }]}
      />
      <div className='max-padd-container pb-20'>
        {/* Featured post */}
        {active === "All" && (
          <Link to={`/blog/${featured.slug}`} className='group card p-3 grid md:grid-cols-2 gap-6 items-center mb-12 transition hover:shadow-lift'>
            <div className='overflow-hidden rounded-xl'>
              <img src={featured.image} alt={featured.title} className='aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]' />
            </div>
            <div className='p-3 md:pr-8'>
              <span className='eyebrow bg-primaryOne rounded-full px-3 py-1'>Featured · {featured.category}</span>
              <h2 className='mt-4 group-hover:text-solid transition'>{featured.title}</h2>
              <p className='mt-3 text-base'>{featured.description}</p>
              <div className='mt-5'><PostMeta post={featured} /></div>
              <span className='inline-block mt-6 btn-solid'>Read article →</span>
            </div>
          </Link>
        )}

        {/* Category filter */}
        <div className='flex flex-wrap gap-2 mb-8'>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ring-1 transition cursor-pointer ${active === c ? "bg-solid text-white ring-solid" : "bg-white ring-slate-900/10 hover:ring-solid/40 hover:text-solid"}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10'>
          {filtered.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.slug} className='group flex flex-col'>
              <div className='card p-3 overflow-hidden'>
                <img src={post.image} alt={post.title} className='aspect-[4/3] w-full object-cover rounded-xl transition duration-500 group-hover:scale-[1.03]'/>
              </div>
              <span className='eyebrow mt-5 mb-1'>{post.category}</span>
              <h5 className='pr-4 mb-1 line-clamp-2 group-hover:text-solid transition'>{post.title}</h5>
              <p className='line-clamp-3'>{post.description}</p>
              <div className='mt-3 text-xs text-gray-50 font-semibold'>{formatPostDate(post.date)} · {post.readTime} min read</div>
              <span className='mt-3 font-bold text-sm text-solid group-hover:underline'>Continue reading →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Blog
