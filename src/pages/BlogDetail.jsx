import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ApplyForm from '../components/ApplyForm'
import { WP_SITE as SITE } from '../config'

export default function BlogDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetch(`${SITE}/posts/${id}?_embed`)
      .then(r => r.json())
      .then(data => { if (mounted) { setPost(data); setLoading(false) } })
      .catch(err => { if (mounted) { setError(String(err)); setLoading(false) } })
    return () => { mounted = false }
  }, [id])

  // after post content is injected, find any in-content Apply buttons/links and
  // style them and wire them to toggle the same Apply form used on this page.
  useEffect(() => {
    if (!post) return
    const contentEl = document.querySelector('.blog-detail .content')
    if (!contentEl) return
    const candidates = contentEl.querySelectorAll('a,button')
    const toggle = () => { const el = document.getElementById('apply-form-wrapper'); if (el) { el.style.display = el.style.display === 'none' ? 'block' : 'none' } }
    const handlers = []
    candidates.forEach(el => {
      try {
        const text = (el.textContent || '').trim().toLowerCase()
        if (text && text.includes('apply')) {
          el.classList.add('orange-button')
          const h = (e) => { e.preventDefault(); toggle() }
          el.addEventListener('click', h)
          handlers.push({ el, h })
        }
      } catch (e) { }
    })
    return () => { handlers.forEach(h => h.el.removeEventListener('click', h.h)) }
  }, [post])

  if (loading) return <div className="container"><p>Loading…</p></div>
  if (error) return <div className="container"><p>Error: {error}</p></div>
  if (!post) return null

  // Find any available image size from WordPress
  const getFullImg = (p) => {
    try {
      const fm = p._embedded && p._embedded['wp:featuredmedia'] && p._embedded['wp:featuredmedia'][0]
      if (!fm) return null
      const sizes = fm.media_details && fm.media_details.sizes
      if (sizes && sizes.large) return sizes.large.source_url
      if (sizes && sizes.full) return sizes.full.source_url
      return fm.source_url || null
    } catch (e) { return null }
  }

  const img = getFullImg(post)

  // ensure WP content images are responsive and visible
  const sanitizeContent = (html) => {
    if (!html) return ''
    let out = html
    // remove hardcoded widths/heights to allow responsive CSS to work
    out = out.replace(/\swidth=["']\d+["']/gi, '')
    out = out.replace(/\sheight=["']\d+["']/gi, '')
    // inject img-fluid into all images
    out = out.replace(/<img\b([^>]*)>/gi, (m, p1) => {
      if (!p1.includes('class=')) return `<img class="img-fluid" ${p1}>`
      return m.replace(/class=["']([^"']*)["']/i, 'class="$1 img-fluid"')
    })
    return out
  }

  return (
    <div className="blog-detail section">
      {img && <div className="banner" style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', height: 300 }}></div>}
      <div className="container">
        <div className="section-heading">
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div className="line-dec"></div>
        </div>

        <div className="main-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="content" dangerouslySetInnerHTML={{ __html: sanitizeContent(post.content.rendered) }} />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <button className="orange-button" onClick={() => { const el = document.getElementById('apply-form-wrapper'); if (el) { el.style.display = el.style.display === 'none' ? 'block' : 'none' } }}>Apply</button>
        </div>

        <div id="apply-form-wrapper" style={{ display: 'none', marginTop: 20, maxWidth: 680, marginLeft: 'auto', marginRight: 'auto' }}>
          <ApplyForm jobUrl={window.location.href} submitLabel={'Apply for this role'} />
        </div>

        <p><Link to="/blog" className="main-button">Back to Blog</Link></p>
      </div>
    </div>
  )
}
