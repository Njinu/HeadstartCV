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

  // NUCLEAR EXTRACTOR: Finds ANY WordPress upload link in the post data
  const getThumb = (p) => {
    try {
      // 1. Check standard featured fields first
      if (p.jetpack_featured_media_url) return p.jetpack_featured_media_url
      const fm = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0]
      if (fm) {
        const sizes = fm.media_details && fm.media_details.sizes
        if (sizes && sizes.medium) return sizes.medium.source_url
        if (sizes && sizes.full) return sizes.full.source_url
        return fm.source_url
      }

      // 2. SEARCH EVERYTHING for any "wp-content/uploads" link (Nuclear Fallback)
      const fullString = JSON.stringify(p)
      // Look for any link ending in an image format that lives in the uploads folder
      const uploadsMatch = fullString.match(/https:\/\/[^"'>\s]+\/wp-content\/uploads\/[^"'>\s]+\.(?:png|jpg|jpeg|gif|webp)/i)
      if (uploadsMatch && uploadsMatch[0]) return uploadsMatch[0]

      return null
    } catch (e) { return null }
  }

  if (loading) return <div className="container" style={{ padding: '100px 0' }}><p>Loading posts…</p></div>
  if (error) return <div className="container" style={{ padding: '100px 0' }}><p>Error: {error}</p></div>

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
                    <div className="blog-item down-content" style={{ background: '#fff', borderRadius: 23, overflow: 'hidden', boxShadow: '0px 0px 15px rgba(0,0,0,0.05)', height: '100%', paddingBottom: 20 }}>
                      {img && (
                        <div className="thumb">
                          <img src={img} alt="" className="img-fluid" style={{ width: '100%', height: 260, objectFit: 'cover' }} />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} style={{ fontSize: 20, marginBottom: 15 }} />
                        <div className="excerpt mb-3" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} style={{ fontSize: 14, color: '#666' }} />
                        <Link to={`/blog/${post.id}`} className="main-button" style={{ color: '#5b03e4', fontWeight: 600 }}>Read More</Link>
                      </div>
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
