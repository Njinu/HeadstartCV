import React from 'react'

export default function PageHeading({eyebrow='SEO DIGITAL AGENCY', title='Page Title', intro='', ctaText='', ctaLink='#', image='/assets/images/services-left.jpg', imageAlt=''}){
  return (
    <div className="page-heading">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 align-self-center">
            <div className="caption header-text">
              <h6>{eyebrow}</h6>
              <div className="line-dec"></div>
              <h4 dangerouslySetInnerHTML={{__html: title}} />
              {intro && <p>{intro}</p>}
              {ctaText && <div className="main-button"><a href={ctaLink}>{ctaText}</a></div>}
              {/* <span>or</span>
              <div className="second-button"><a href="/faq">Check our FAQs</a></div> */}
            </div>
          </div>
          <div className="col-lg-5 align-self-center">
            <img src={image} alt={imageAlt} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  )
}
