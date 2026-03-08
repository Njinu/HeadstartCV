import React from 'react'

export default function Footer(){
  return (
    <footer>
      <div className="container">
        <div className="col-lg-12">
          <p>Copyright © {new Date().getFullYear()} <a href="#">Headstart CV 2026</a>. All rights reserved.</p> 
          {/* <br /> */}
          {/* Design: <a href="https://templatemo.com" target="_blank" rel="noreferrer">TemplateMo</a></p> */}
        </div>
      </div>
    </footer>
  )
}
