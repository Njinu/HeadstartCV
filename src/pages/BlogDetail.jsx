import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function BlogDetail(){
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    fetch(`https://public-api.wordpress.com/wp/v2/sites/aspyre7.wordpress.com/posts/${id}?_embed`)
      .then(r=>r.json())
      .then(data=>{ if(mounted){ setPost(data); setLoading(false) } })
      .catch(err=>{ if(mounted){ setError(String(err)); setLoading(false) } })
    return ()=>{ mounted=false }
  },[id])

  if(loading) return <div className="container"><p>Loading…</p></div>
  if(error) return <div className="container"><p>Error: {error}</p></div>
  if(!post) return null

  const img = post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] && post._embedded['wp:featuredmedia'][0].source_url

  // ensure WP content images are responsive and wrap content inside template containers
  const sanitizeContent = (html) => {
    if(!html) return ''
    // add bootstrap img-fluid to images without class
    let out = html.replace(/<img\b(?![^>]*\bclass=)([^>]*)>/gi, '<img class="img-fluid" $1>')
    // ensure existing img tags include img-fluid
    out = out.replace(/<img\b([^>]*\bclass=["'])([^"']*)(["'][^>]*)>/gi, (m, p1, p2, p3) => `${p1}${p2} img-fluid${p3}`)
    return out
  }

  return (
    <div className="blog-detail section">
      {img && <div className="banner" style={{backgroundImage:`url(${img})`, backgroundSize:'cover', backgroundPosition:'center', height:300}}></div>}
      <div className="container">
        <div className="section-heading">
          <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}} />
          <div className="line-dec"></div>
        </div>

        <div className="main-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="content" dangerouslySetInnerHTML={{__html: sanitizeContent(post.content.rendered)}} />
            </div>
          </div>
        </div>

        <p><Link to="/blog" className="main-button">Back to Blog</Link></p>
      </div>
    </div>
  )
}
