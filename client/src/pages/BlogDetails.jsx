import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { posts, formatPostDate } from '../assets/blogPosts'
import NotFound from './NotFound'

const BlogDetails = () => {
  const { slug } = useParams()
  const index = posts.findIndex((p) => p.slug === slug)
  const post = posts[index]
  const [progress, setProgress] = useState(0)

  // Reading progress bar
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  if (!post) return <NotFound />

  const related = posts.filter((p) => p.slug !== slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))).slice(0, 3)
  const more = related.length ? related : posts.filter((p) => p.slug !== slug).slice(0, 3)
  const prev = posts[index - 1]
  const next = posts[index + 1]

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    } catch {
      toast.error('Could not copy link')
    }
  }

  return (
    <article className='pb-20'>
      <div className='fixed top-0 left-0 z-[60] h-1 bg-gradient-to-r from-solid to-accent transition-[width]' style={{ width: `${progress}%` }} />

      {/* Header */}
      <header className='bg-gradient-to-b from-primaryOne to-white pt-28 pb-10'>
        <div className='max-padd-container max-w-4xl'>
          <nav className='flex flex-wrap items-center gap-1.5 text-xs font-semibold text-gray-50 mb-5'>
            <Link to='/' className='hover:text-solid'>Home</Link><span>/</span>
            <Link to='/blog' className='hover:text-solid'>Blog</Link><span>/</span>
            <span className='text-black line-clamp-1'>{post.title}</span>
          </nav>
          <span className='eyebrow bg-white ring-1 ring-solid/15 rounded-full px-3 py-1'>{post.category}</span>
          <h1 className='mt-4'>{post.title}</h1>
          <p className='mt-4 text-lg'>{post.description}</p>
          <div className='flex flex-wrap items-center justify-between gap-4 mt-8'>
            <div className='flex items-center gap-3'>
              <img src={post.author.image} alt={post.author.name} className='h-11 w-11 rounded-full object-cover ring-2 ring-white shadow' />
              <div>
                <h5 className='text-sm'>{post.author.name}</h5>
                <p className='text-xs'>{post.author.role} · {formatPostDate(post.date)} · {post.readTime} min read</p>
              </div>
            </div>
            <button onClick={share} className='btn-outline !py-2 !px-4 bg-white'>Share ↗</button>
          </div>
        </div>
      </header>

      <div className='max-padd-container max-w-4xl'>
        <img src={post.image} alt={post.title} className='w-full aspect-[16/9] object-cover rounded-3xl shadow-soft' />

        {/* Body */}
        <div className='mt-10 flex flex-col gap-5'>
          {post.content.map((block, i) => {
            if (block.h) return <h3 key={i} className='mt-4'>{block.h}</h3>
            if (block.p) return <p key={i} className='text-[17px] leading-[1.8] text-textColor'>{block.p}</p>
            if (block.list) return (
              <ul key={i} className='flex flex-col gap-2.5 pl-1'>
                {block.list.map((item) => (
                  <li key={item} className='flex gap-3 text-[16px] leading-relaxed text-textColor'>
                    <span className='mt-2 h-2 w-2 rounded-full bg-solid shrink-0' />
                    {item}
                  </li>
                ))}
              </ul>
            )
            if (block.tip) return (
              <div key={i} className='rounded-2xl bg-primaryTwo ring-1 ring-accent/20 p-5 flex gap-3'>
                <span className='h-8 w-8 rounded-full bg-accent text-white flexCenter font-bold shrink-0'>!</span>
                <p className='text-[15px] text-textColor'><strong className='text-black'>Pro tip: </strong>{block.tip}</p>
              </div>
            )
            return null
          })}
        </div>

        {/* Tags */}
        <div className='flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-900/5'>
          {post.tags.map((t) => (
            <span key={t} className='px-3 py-1.5 rounded-full bg-primary text-xs font-semibold text-textColor'>#{t}</span>
          ))}
        </div>

        {/* CTA */}
        <div className='mt-10 rounded-3xl bg-gradient-to-r from-solidDark to-solid p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-5'>
          <div>
            <h3 className='!text-white'>Ready for your next drive?</h3>
            <p className='!text-white/80 mt-1'>Browse verified cars across 25 cities and book in minutes.</p>
          </div>
          <Link to='/listing' className='btn-white shrink-0'>Explore cars</Link>
        </div>

        {/* Prev / next */}
        <div className='grid sm:grid-cols-2 gap-4 mt-10'>
          {prev ? (
            <Link to={`/blog/${prev.slug}`} className='card p-5 hover:shadow-lift transition'>
              <p className='text-xs font-semibold uppercase tracking-wide'>← Previous</p>
              <h5 className='mt-1 line-clamp-2'>{prev.title}</h5>
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/blog/${next.slug}`} className='card p-5 text-right hover:shadow-lift transition'>
              <p className='text-xs font-semibold uppercase tracking-wide'>Next →</p>
              <h5 className='mt-1 line-clamp-2'>{next.title}</h5>
            </Link>
          )}
        </div>
      </div>

      {/* Related */}
      <section className='max-padd-container mt-16'>
        <h3 className='mb-6'>You might also like</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {more.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className='group card p-3 hover:shadow-lift transition'>
              <img src={p.image} alt={p.title} className='aspect-[16/10] w-full object-cover rounded-xl' />
              <div className='p-2 pt-4'>
                <span className='eyebrow'>{p.category}</span>
                <h5 className='mt-1 line-clamp-2 group-hover:text-solid transition'>{p.title}</h5>
                <p className='mt-2 text-xs font-semibold'>{p.readTime} min read</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  )
}

export default BlogDetails
