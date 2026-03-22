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

  return (
    <>
      <div className="page-heading">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 align-self-center">
              <div className="caption  header-text">
                <h6>CAREERS</h6>
                <div className="line-dec"></div>
                <h4>Explore <em>Job</em> Opportunities</h4>
              </div>
            </div>
            <div className="col-lg-5">
              <img src="/assets/images/job.jpg" alt="Jobs header" />
            </div>
          </div>
        </div>
      </div>
      <div className="jobs section">
        <div className="container">
          <div className="main-content">
            <div className="row">
              {loading && !error && (
                <div className="col-12"><p>Loading job posts…</p></div>
              )}
              {error && (
                <div className="col-12"><p className="text-danger">Error loading posts: {error}</p></div>
              )}
              {!loading && !error && posts.length === 0 && (
                <div className="col-12"><p>No job posts found.</p></div>
              )}
              {!loading && !error && posts.map(p => {
                const thumb = getThumb(p)
                return (
                  <div className="col-lg-4 col-md-6 mb-4" key={p.id}>
                    <div className="job-item blog-item down-content">
                      {thumb && (
                        <div className="thumb mb-3">
                          <img src={thumb} alt="" className="img-fluid" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 10 }} />
                        </div>
                      )}
                      <h5 dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
                      <div className="excerpt mb-3" dangerouslySetInnerHTML={{ __html: p.excerpt.rendered }} />
                      <p><Link to={`/blog/${p.id}`} className="main-button">Read More</Link></p>
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
