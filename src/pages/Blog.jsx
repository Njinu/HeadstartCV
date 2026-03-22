import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading'
import { WP_SITE as SITE } from '../config'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    // resolve category id for blog posts (slug contains 'blog')
    fetch(`${SITE}/categories`)
      .then(r => r.json())
      .then(cats => {
        const cat = cats.find(c => c.slug && c.slug.toLowerCase().includes('blog'))
        if (cat && cat.id) {
          return fetch(`${SITE}/posts?categories=${cat.id}&_embed`)
        }
        return fetch(`${SITE}/posts?_embed`)
      })
      .then(r => r.json())
      .then(data => { if (mounted) { setPosts(data); setLoading(false) } })
      .catch(err => { if (mounted) { setError(String(err)); setLoading(false) } })
    return () => { mounted = false }
  }, [])

  // Resolve thumbnail from WordPress embedded data
  const getThumb = (p) => {
    try {
      const fm = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0]
      if (!fm) return null
      const sizes = fm.media_details && fm.media_details.sizes
      if (sizes && sizes.medium) return sizes.medium.source_url
      if (sizes && sizes.medium_large) return sizes.medium_large.source_url
      if (sizes && sizes.thumbnail) return sizes.thumbnail.source_url
      return fm.source_url || null
    } catch (e) { return null }
  }

  if (loading) return <div className="container"><p>Loading posts…</p></div>
  if (error) return <div className="container"><p>Error: {error}</p></div>

  return (
    <>
      <PageHeading title={'Blog &amp; <em>Insights</em>'} intro={'Latest articles and career advice.'} image={'/assets/images/blog.jpg'} />
      <div className="blog-list section">
        <div className="container">
          <div className="main-content">
            <div className="row">
              {posts.map(post => {
                const img = getThumb(post)
                return (
                  <div className="col-lg-4 col-md-6 mb-4" key={post.id}>
                    <div className="blog-item down-content">
                      {img && (
                        <div className="thumb mb-3">
                          <img src={img} alt="" className="img-fluid" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 10 }} />
                        </div>
                      )}
                      <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                      <Link to={`/blog/${post.id}`} className="main-button">Read More</Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
