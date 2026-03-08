import React, { useState } from 'react'
import PageHeading from '../components/PageHeading'

export default function HowItWorks(){
  const [status, setStatus] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()
    setStatus('sending')
    const fd = new FormData(e.target)
    const payload = {
      name: fd.get('full-name') || '',
      email: fd.get('email') || '',
      phone: fd.get('phone-number') || '',
      role: fd.get('role') || '',
      message: fd.get('message') || ''
    }

    // attach CV if provided
    const file = fd.get('cv')
    if (file && file.size) {
      try{
        const base64 = await new Promise((res, rej) => {
          const reader = new FileReader()
          reader.onload = () => res(reader.result.split(',')[1])
          reader.onerror = rej
          reader.readAsDataURL(file)
        })
        payload.attachment = {
          fileName: file.name,
          content: base64,
          type: file.type || 'application/octet-stream'
        }
      }catch(err){
        // continue without attachment if encoding fails
        console.warn('CV encoding failed', err)
      }
    }

    try{
      const res = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if(!res.ok){
        const text = await res.text()
        setStatus('error: ' + text)
      } else {
        setStatus('sent')
        e.target.reset()
      }
    }catch(err){
      setStatus('error: ' + String(err))
    }
  }

  return (
    <>
      <PageHeading title={'How It <em>Works</em>'} intro={'A simple 3-step process to improve your job applications.'} image={'/assets/images/connect.png'} />

      <div className="happy-steps">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Our 4 Steps To Career Success</h2>
            </div>
            <div className="col-lg-12">
              <div className="steps">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="item">
                      <img src="/assets/images/services-01.jpg" alt="" style={{maxWidth:'66px', borderRadius:'50%', margin:'0 auto', display:'block'}} />
                      <h4>Upload Your CV</h4>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="item">
                      <img src="/assets/images/services-02.jpg" alt="" style={{maxWidth:'66px', borderRadius:'50%', margin:'0 auto', display:'block'}} />
                      <h4>CV Review &amp; ATS Optimisation</h4>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="item">
                      <img src="/assets/images/services-03.jpg" alt="" style={{maxWidth:'66px', borderRadius:'50%', margin:'0 auto', display:'block'}} />
                      <h4>Revision &amp; Delivery</h4>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="item last-item">
                      <img src="/assets/images/services-04.jpg" alt="" style={{maxWidth:'66px', borderRadius:'50%', margin:'0 auto', display:'block'}} />
                      <h4>Interview Preparation &amp; Support</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="most-asked section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Most <em>Frequently</em> Asked <span>Questions</span> ?</h2>
                <div className="line-dec"></div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doers.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="accordions is-first-expanded">
                <article className="accordion">
                  <div className="accordion-head is-open">
                    <span>What services do you offer?</span>
                    <span className="icon">
                      <i className="icon fa fa-chevron-right"></i>
                    </span>
                  </div>
                  <div className="accordion-body" style={{height:120}}>
                    <div className="content">
                      <p>We provide professional CV writing, ATS optimisation, LinkedIn profile makeovers, tailored cover letters and interview coaching to help you land interviews.</p>
                    </div>
                  </div>
                </article>
                <article className="accordion">
                  <div className="accordion-head">
                    <span>How long does a CV review take?</span>
                    <span className="icon">
                      <i className="icon fa fa-chevron-right"></i>
                    </span>
                  </div>
                  <div className="accordion-body" style={{height:0}}>
                    <div className="content">
                      <p>Standard CV reviews are returned within 48 hours. Full rewrites and ATS optimisation may take 3–5 business days depending on workload and complexity.</p>
                    </div>
                  </div>
                </article>
                <article className="accordion">
                  <div className="accordion-head">
                    <span>Do you handle LinkedIn profiles?</span>
                    <span className="icon">
                      <i className="icon fa fa-chevron-right"></i>
                    </span>
                  </div>
                  <div className="accordion-body" style={{height:0}}>
                    <div className="content">
                      <p>Yes — we update your LinkedIn headline, summary and experience sections to align with your CV and the roles you are targeting, improving discoverability by recruiters.</p>
                    </div>
                  </div>
                </article>
                <article className="accordion">
                  <div className="accordion-head">
                    <span>Do you offer interview coaching?</span>
                    <span className="icon">
                      <i className="icon fa fa-chevron-right"></i>
                    </span>
                  </div>
                  <div className="accordion-body" style={{height:0}}>
                    <div className="content">
                    <p>We provide mock interviews, feedback, and personalised briefing notes to prepare you for interviews, including competency and behavioural question coaching.</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="get-free-quote">
                <form id="free-quote" onSubmit={handleSubmit} role="search">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="section-heading">
                        <h2>Upload Your <em>CV</em> Now</h2>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input type="text" name="full-name" id="full-name" placeholder="Full Name" autoComplete="name" required />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail" required />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input type="phone-number" name="phone-number" id="phone-number" placeholder="Phone Number (optional)" autoComplete="tel" />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input type="file" name="cv" id="cv" accept=".pdf,.doc,.docx" />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button type="submit" id="form-submit" className="orange-button">Upload CV</button>
                      </fieldset>
                      {status && <p className="mt-2">{status}</p>}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
