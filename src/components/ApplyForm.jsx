import React, { useState } from 'react'

export default function ApplyForm({ jobUrl = '', submitLabel = 'Upload CV', onSuccess }){
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

    // include job URL if provided
    const job = fd.get('jobUrl') || jobUrl || ''
    if(job) payload.jobUrl = job

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
        if(onSuccess) onSuccess()
      }
    }catch(err){
      setStatus('error: ' + String(err))
    }
  }

  return (
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
          <div style={{display:'none'}}>
            <input type="hidden" name="jobUrl" value={jobUrl} />
          </div>
          <div className="col-lg-12">
            <fieldset>
              <input type="file" name="cv" id="cv" accept=".pdf,.doc,.docx" />
            </fieldset>
          </div>
          <div className="col-lg-12">
            <fieldset>
              <button type="submit" id="form-submit" className="orange-button">{submitLabel}</button>
            </fieldset>
            {status && <p className="mt-2">{status}</p>}
          </div>
        </div>
      </form>
    </div>
  )
}
