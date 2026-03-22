import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeading from '../components/PageHeading'

const SITE = 'https://public-api.wordpress.com/wp/v2/sites/aspyre7.wordpress.com'

export default function Testimonials(){
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    // find category id for testimonial posts by slug
    fetch(`${SITE}/categories`)
      .then(r=>r.json())
      .then(cats=>{
        const cat = cats.find(c=>c.slug && c.slug.toLowerCase().includes('testimonial'))
        if(cat && cat.id){
          return fetch(`${SITE}/posts?categories=${cat.id}&_embed`)
        }
        return fetch(`${SITE}/posts?_embed`)
      })
      .then(r=>r.json())
      .then(data=>{ if(mounted){ setPosts(data); setLoading(false) } })
      .catch(err=>{ if(mounted){ setError(String(err)); setLoading(false) } })

    return ()=>{ mounted=false }
  },[])

  if(loading) return <div className="container"><p>Loading testimonials…</p></div>
  if(error) return <div className="container"><p>Error: {error}</p></div>

  return (
    <>
      <PageHeading title={'Client <em>Testimonials</em>'} intro={''} image={'/assets/images/happyclient-01.jpg'} />
      <div className="testimonials section">
        <div className="container">
          <div className="main-content">
            <div className="row">
              {posts.map(p=> (
                <div className="col-lg-4" key={p.id}>
                  <div className="testimonial-item down-content">
                    <h5 dangerouslySetInnerHTML={{__html: p.title.rendered}} />
                    <p dangerouslySetInnerHTML={{__html: p.excerpt.rendered}} />
                    <p><Link to={`/blog/${p.id}`} className="main-button">Read</Link></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
