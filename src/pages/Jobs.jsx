import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading'
import { WP_SITE as SITE } from '../config'

export default function Jobs() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetch(`${SITE}/categories`)
      .then(r => r.json())
      .then(cats => {
        const cat = cats.find(c => c.slug && c.slug.toLowerCase().includes('job'))
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

  if (loading) return <div className="container" style={{ padding: '100px 0' }}><p>Loading job posts…</p></div>
  if (error) return <div className="container" style={{ padding: '100px 0' }}><p className="text-danger">Error: {error}</p></div>

  return (
    <>
      <div className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 align-self-center">
              <div className="caption header-text">
                <h6>CAREERS</h6>
                <div className="line-dec"></div>
                <h4>Explore <em>Job</em> Opportunities</h4>
              </div>
            </div>
            <div className="col-lg-5">
              <img src="/assets/images/job.jpg" alt="Jobs header" className="img-fluid" style={{ borderRadius: 25 }} />
            </div>
          </div>
        </div>
      </div>

      <div className="jobs section">
        <div className="container">
          <div className="main-content">
            <div className="row">
              {!loading && !error && posts.length === 0 && (
                <div className="col-12"><p>No job posts found.</p></div>
              )}
              {!loading && !error && posts.map(p => {
                const thumb = getThumb(p)
                return (
                  <div className="col-lg-4 col-md-6 mb-4" key={p.id}>
                    <div className="job-item blog-item down-content" style={{ background: '#fff', borderRadius: 23, overflow: 'hidden', boxShadow: '0px 0px 15px rgba(0,0,0,0.05)', height: '100%', paddingBottom: 20 }}>
                      {thumb && (
                        <div className="thumb">
                          <img src={thumb} alt="" className="img-fluid" style={{ width: '100%', height: 260, objectFit: 'cover' }} />
                        </div>
                      )}
                      <div className="p-4">
                        <h5 dangerouslySetInnerHTML={{ __html: p.title.rendered }} style={{ fontSize: 20, marginBottom: 15 }} />
                        <div className="excerpt mb-3" dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} style={{ fontSize: 14, color: '#666' }} />
                        <Link to={`/blog/${p.id}`} className="main-button" style={{ color: '#c03afe', fontWeight: 600 }}>Read More</Link>
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
