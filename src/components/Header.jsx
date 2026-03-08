import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
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
  )
}
