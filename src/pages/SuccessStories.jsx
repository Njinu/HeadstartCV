import React from 'react'
import PageHeading from '../components/PageHeading'

export default function SuccessStories(){
  const stories = [
    {id:1, name:'Aisha', result:'Secured role at a top fintech company within 4 weeks.'},
    {id:2, name:'Mark', result:'Interview invites increased by 300% after CV rewrite.'},
    {id:3, name:'Priya', result:'Transitioned into product management with our coaching.'}
  ]

  return (
    <>
      <PageHeading title={'Success <em>Stories</em>'} intro={'Real outcomes from clients we helped.'} image={'/assets/images/happyclient-01.jpg'} />
      <section className="stories-page section">
        <div className="container">
          <div className="main-content">
            <div className="row">
              {stories.map(s=> (
                <div className="col-lg-4" key={s.id}>
                  <div className="down-content story-item">
                    <h5>{s.name}</h5>
                    <p>{s.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
