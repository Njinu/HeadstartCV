import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <>
     <div class="pre-header">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-sm-9">
          <div class="left-info">
            <ul>
              <li><a href="#"><i class="fa fa-phone"></i>+254 708 845907</a></li>
              <li><a href="#"><i class="fa fa-envelope"></i>headstartcv.ke@gmail.com</a></li>
              <li><a href="#"><i class="fa fa-map-marker"></i>3rd South Ave, Nairobi Kenya</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-sm-3">
          <div class="social-icons">
            <ul>
              <li><a href="#"><i class="fab fa-facebook"></i></a></li>
              <li><a href="#"><i class="fab fa-twitter"></i></a></li>
              <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
              <li><a href="#"><i class="fab fa-google-plus"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
    <header className="header-area header-sticky">
      <div className="container">
          <div className="row">
              <div className="col-12">
                  <nav className="main-nav">
                      <a href="/index.html" className="logo">
                          <img src="/assets/images/logo.png" alt="" style={{maxWidth: 112}} />
                      </a>
                      <ul className="nav">
                        <li className="scroll-to-section"><Link to="/" className="active">Home</Link></li>
                        <li className="scroll-to-section"><Link to="/services">Services</Link></li>
                        <li className="scroll-to-section"><Link to="/jobs">Jobs</Link></li>
                        <li className="scroll-to-section"><Link to="/blog">Blog</Link></li>
                        <li className="scroll-to-section"><Link to="/how-it-works">Contact</Link></li>
                      </ul>
                      <a className='menu-trigger'>
                          <span>Menu</span>
                      </a>
                  </nav>
              </div>
          </div>
      </div>
    </header>
    </>
  )
}
