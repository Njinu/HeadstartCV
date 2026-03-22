import React from 'react'
import PageHeading from '../components/PageHeading'

export default function About(){
  return (
    <>
      <PageHeading title={'Discover More <em>About Us</em>'} intro={'We help candidates present their best selves to employers through expert CV writing and coaching.'} image={'/assets/images/about-us-image.jpg'} />
      <section className="about-page section">
        <div className="container">
          <div className="main-content">
            <div className="row">
              <div className="col-lg-6">
                <div className="left-image">
                  <img src="/assets/images/about-us-image.jpg" alt="About" className="img-fluid" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="down-content">
                  <h2>About HeadStart CV</h2>
                  <p>Our team has experience across recruitment, HR and career coaching. We combine practical insights with strong writing to help you get interviews.</p>
                  <p>We focus on clarity, evidence-based accomplishment statements, and ATS-friendly formatting so your CV performs well in real hiring processes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
