import React from 'react'
import PageHeading from '../components/PageHeading'

export default function Faqs(){
  const faqs = [
    {q:'How long does a CV review take?', a:'We aim to return a reviewed CV within 3 business days.'},
    {q:'What formats do you accept?', a:'PDF and Word (.doc/.docx) are accepted.'},
    {q:'Can you help with interview prep?', a:'Yes — we offer coaching sessions tailored to your role.'}
  ]

  return (
    <>
      <PageHeading title={'Most Frequently Asked <em>Questions</em> Here <em>?</em>'} image={'/assets/images/faqs-image.jpg'} />
      <section className="faqs-page section">
        <div className="container">
          <div className="main-content">
            <div className="row">
              <div className="col-lg-8">
                <div className="faqs">
                  {faqs.map((f,i)=> (
                    <div key={i} className="faq-item">
                      <h5>{f.q}</h5>
                      <p>{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
