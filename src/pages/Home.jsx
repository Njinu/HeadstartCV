import React, { useEffect, useState } from 'react'
import { WP_SITE } from '../config'
import { Link } from 'react-router-dom'

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || ''

export default function Home(){
  const waLink = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/'
  const [jobs, setJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(true)

  useEffect(()=>{
    let mounted = true
    const SITE = WP_SITE
    fetch(`${SITE}/categories`)
      .then(r=>r.json())
      .then(cats=>{
        const cat = cats.find(c=>c.slug && c.slug.toLowerCase().includes('job'))
        if(cat && cat.id){
          return fetch(`${SITE}/posts?categories=${cat.id}&_embed`)
        }
        return fetch(`${SITE}/posts?_embed`)
      })
      .then(r=>r.json())
      .then(data=>{ if(mounted){ setJobs(data); setLoadingJobs(false) } })
      .catch(()=>{ if(mounted){ setJobs([]); setLoadingJobs(false) } })
    return ()=>{ mounted=false }
  },[])

  // initialize owl carousel after jobs are rendered
  useEffect(()=>{
    if(!loadingJobs){
      const $ = window.jQuery
      try{
        if($ && $.fn && $.fn.owlCarousel){
          // destroy existing instance if present
          try{ $('.owl-features').trigger('destroy.owl.carousel'); }catch(e){}
          // init after a short delay to ensure DOM is updated
          setTimeout(()=>{
            $('.owl-features').owlCarousel({
              center: true,
              items:2,
              loop:true,
              nav:true,
              margin:30,
              responsive:{992:{items:3},1200:{items:4}}
            })
            // wire custom nav buttons
            try{
              $('.custom-prev').off('click').on('click', function(e){ e.preventDefault(); $('.owl-features').trigger('prev.owl.carousel'); })
              $('.custom-next').off('click').on('click', function(e){ e.preventDefault(); $('.owl-features').trigger('next.owl.carousel'); })
            }catch(err){ }
          }, 50)
        }
      }catch(e){
        // ignore initialization errors
      }
    }
  },[loadingJobs])

    return (
      <>
        {/* main banner */}
        <div className="main-banner" id="top">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="caption header-text">
                  <h6>HEADSTART CAREER SERVICES</h6>
                  <div className="line-dec"></div>
                  <h4>Accelerate <em>Your Job Search</em> <span>With HeadStart</span></h4>
                  <p>Professional CV writing, ATS optimisation, LinkedIn profile polish, custom cover letters, and career coaching designed to increase interview invitations and land you the right role.</p>
                  <div className="main-button"><a href="#services">Discover More</a></div>
                  <span>or</span>
                  <div className="second-button"><a href="/how-it-works">Check our FAQs</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* services */}
        <div className="services section" id="services">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-6">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-heading">
                      <h2>Services to <em>Accelerate</em> Your Job Search &amp; <span>Get You Hired</span></h2>
                      <div className="line-dec"></div>
                      <p>Professional CV writing, ATS optimisation, LinkedIn profile optimisation, custom cover letters, and one-to-one coaching to help you land interviews.</p>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="service-item">
                      <div className="icon">
                        <img src="/assets/images/services-01.jpg" alt="CV writing" className="templatemo-feature" />
                      </div>
                      <h4>Professional CV Writing</h4>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="service-item">
                      <div className="icon">
                        <img src="/assets/images/services-02.jpg" alt="ATS and LinkedIn optimisation" className="templatemo-feature" />
                      </div>
                      <h4>ATS &amp; LinkedIn Optimisation</h4>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="service-item">
                      <div className="icon">
                        <img src="/assets/images/services-03.jpg" alt="Cover letters" className="templatemo-feature" />
                      </div>
                      <h4>Custom Cover Letters</h4>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                    <div className="service-item">
                      <div className="icon">
                        <img src="/assets/images/services-04.jpg" alt="Career coaching and interview prep" className="templatemo-feature" />
                      </div>
                      <h4>Career Coaching &amp; Interview Prep</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* projects/opportunities */}
        <div className="projects section" id="projects">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="section-heading">
                  <h2>Discover Our <em>Work</em> &amp; <span>Projects</span></h2>
                  <div className="line-dec"></div>
                  <p>Examples of CVs, interview prep outcomes and candidate success stories that show how we help people land roles.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="owl-features owl-carousel">
                  {loadingJobs && (
                    <div className="item"><p style={{padding:20}}>Loading jobs…</p></div>
                  )}
                  {!loadingJobs && jobs && jobs.length>0 ? (
                    jobs.map(job=>{
                      const img = job._embedded && job._embedded['wp:featuredmedia'] && job._embedded['wp:featuredmedia'][0] && job._embedded['wp:featuredmedia'][0].source_url
                      return (
                        <div className="item" key={job.id}>
                          {img ? <img src={img} alt={job.title && job.title.rendered} /> : <img src="/assets/images/projects-01.jpg" alt="" />}
                          <div className="down-content">
                            <h4 dangerouslySetInnerHTML={{__html: job.title.rendered}} />
                            {job.excerpt && job.excerpt.rendered && (
                              <p dangerouslySetInnerHTML={{__html: job.excerpt.rendered}} />
                            )}
                            <Link to={`/blog/${job.id}`}><i className="fa fa-link"></i></Link>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    // fallback to static items if no jobs
                    <>
                      <div className="item">
                        <img src="/assets/images/projects-01.jpg" alt="" />
                        <div className="down-content">
                          <h4>Digital Agency HTML Templates</h4>
                          <p>Responsive HTML templates for agencies and portfolios.</p>
                          <a href="#"><i className="fa fa-link"></i></a>
                        </div>
                      </div>
                      <div className="item">
                        <img src="/assets/images/projects-02.jpg" alt="" />
                        <div className="down-content">
                          <h4>Admin Dashboard CSS Templates</h4>
                          <p>Clean admin UI designs for dashboards and management tools.</p>
                          <a href="#"><i className="fa fa-link"></i></a>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* explicit nav buttons */}
                <div className="carousel-nav">
                  <button className="custom-prev btn btn-link"><i className="fa fa-chevron-left"></i></button>
                  <button className="custom-next btn btn-link"><i className="fa fa-chevron-right"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* infos / detailed information */}
        <div className="infos section" id="infos">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="main-content">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="left-image">
                        <img src="/assets/images/left-infos.jpg" alt="" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="section-heading">
                        <h2>More <em>About Us</em> &amp; What <span>We Offer</span></h2>
                        <div className="line-dec"></div>
                        <p>HeadStart provides expert CV writing, ATS optimisation, LinkedIn profile improvements, targeted cover letters and interview coaching — practical, recruiter-focused services to improve your chances of success.</p>
                      </div>
                      <p className="more-info">We combine recruitment insight with clear writing to produce application materials that present your achievements and match the roles you want.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
}
