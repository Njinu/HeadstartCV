import React, { useEffect } from 'react'
import PageHeading from '../components/PageHeading'

export default function Services(){
  // content updated to match HeadStart CV Website specification
  useEffect(() => {
    // ensure template tabs (tabs.js) initialize if present
    if (window?.initNaccs) {
      try { window.initNaccs() } catch(e) { /* ignore */ }
    }
  }, [])

  return (
    <>
      <PageHeading title={'HeadStart <span>Career Services</span>'} intro={'Professional CV writing, ATS optimisation, LinkedIn profile optimisation, custom cover letters, and career coaching to help you land interviews.'} image={'/assets/images/services-left.jpg'} ctaText={'Get Started'} />
      <section className="services-page section">
        <div className="happy-clients section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-heading">
                  <h2>Services to <em>Accelerate</em> Your Job Search &amp; <span>Get You Hired</span></h2>
                  <div className="line-dec"></div>
                  <p>We specialise in delivering targeted, recruiter-friendly application materials and personalised coaching to increase interview invites.</p>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="naccs">
                  <div className="tabs">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="menu">
                          <div className="active"><span>CV Writing</span></div>
                          <div><span>ATS &amp; LinkedIn Optimisation</span></div>
                          <div><span>Cover Letters</span></div>
                          <div className="last-item"><span>Career Coaching</span></div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <ul className="nacc">
                          <li className="active">
                            <div>
                              <div className="row">
                                <div className="col-lg-7">
                                  <h4>Professional CV Writing</h4>
                                  <div className="line-dec"></div>
                                  <p>We craft personalised CVs that present your experience, achievements and skills clearly for hiring managers. Each CV is tailored to your target role and written to showcase impact and results.</p>
                                  <div className="info">
                                    <span>Personalised</span>
                                    <span>Results-focused</span>
                                    <span>Role-targeted</span>
                                    <span className="last-span">ATS-aware</span>
                                  </div>
                                  <p>Submit your current CV to receive a free review and a recommended next step to improve interview outcomes.</p>
                                </div>
                                <div className="col-lg-5 align-self-center">
                                  <img src="/assets/images/services-01.jpg" alt="CV writing" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div>
                              <div className="row">
                                <div className="col-lg-7">
                                  <h4>ATS &amp; LinkedIn Optimisation</h4>
                                  <div className="line-dec"></div>
                                  <p>We optimise your CV for Applicant Tracking Systems (ATS) and polish your LinkedIn profile to improve discoverability and recruiter appeal. Our service includes keyword research, formatting fixes, headline and summary rewrites, and profile polish to ensure consistency across your application materials.</p>
                                  <div className="info">
                                    <span>Keyword Research</span>
                                    <span>Format & Profile Fixes</span>
                                    <span>Score & Visibility</span>
                                    <span className="last-span">Job-match Focus</span>
                                  </div>
                                  <p>This combined service increases the chance your application is seen by recruiters and improves inbound opportunities from LinkedIn searches.</p>
                                </div>
                                <div className="col-lg-5 align-self-center">
                                  <img src="/assets/images/services-02.jpg" alt="ATS and LinkedIn optimisation" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div>
                              <div className="row">
                                <div className="col-lg-7">
                                  <h4>Custom Cover Letters</h4>
                                  <div className="line-dec"></div>
                                  <p>We write bespoke cover letters tailored to specific roles, reflecting the job description and your strengths. Our letters are concise, persuasive and formatted for recruiter scanning.</p>
                                  <div className="info">
                                    <span>Role-specific</span>
                                    <span>Concise & Persuasive</span>
                                    <span>Application-ready</span>
                                    <span className="last-span">Interview-focused</span>
                                  </div>
                                  <p>Receive a cover letter that complements your CV and increases response rates.</p>
                                </div>
                                <div className="col-lg-5 align-self-center">
                                  <img src="/assets/images/services-04.jpg" alt="Cover letters" />
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div>
                              <div className="row">
                                <div className="col-lg-7">
                                  <h4>Coaching & Interview Prep</h4>
                                  <div className="line-dec"></div>
                                  <p>One-to-one coaching to prepare you for interviews, improve your job-search strategy and optimise your applications. Includes mock interviews, feedback and negotiation guidance.</p>
                                  <div className="info">
                                    <span>Mock Interviews</span>
                                    <span>Job-search Strategy</span>
                                    <span>Negotiation Tips</span>
                                    <span className="last-span">Confidence Building</span>
                                  </div>
                                  <p>Book a coaching session to sharpen your interview skills and land offers with confidence.</p>
                                </div>
                                <div className="col-lg-5 align-self-center">
                                  <img src="/assets/images/happyclient-01.jpg" alt="Career coaching" />
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
