import React, { useState } from 'react'
import axios from 'axios'

export default function ApplyForm({ jobUrl = '', submitLabel = 'Submit Application', onSuccess }) {
  const [status, setStatus] = useState(null)
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  async function handleSubmit(e) {
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
    if (job) payload.jobUrl = job

    // attach CV from state
    if (file) {
      try {
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
      } catch (err) {
        console.warn('CV encoding failed', err)
      }
    }

    try {
      // Send to Netlify Function (securely handles Gmail SMTP)
      const res = await axios.post('/.netlify/functions/send-email', payload)

      if (res.status >= 200 && res.status < 300) {
        setStatus('sent')
        setFile(null)
        e.target.reset()
        if (onSuccess) onSuccess()
      } else {
        setStatus('error: ' + (res.data?.error || res.statusText || 'unknown'))
      }
    } catch (err) {
      setStatus('error: ' + (err.response?.data?.error || err.message || 'unknown error'))
    }
  }

  return (
    <div className="get-free-quote">
      <form id="free-quote" onSubmit={handleSubmit}>
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
          <div style={{ display: 'none' }}>
            <input type="hidden" name="jobUrl" value={jobUrl} />
          </div>

          <div className="col-lg-12">
            <fieldset>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('cv-input').click()}
                style={{
                  border: isDragging ? '2px solid #5b03e4' : '2px dashed #ddd',
                  borderRadius: '23px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  background: isDragging ? 'rgba(91, 3, 228, 0.05)' : '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '20px'
                }}
              >
                <i className="fa fa-cloud-upload" style={{ fontSize: '32px', color: '#5b03e4', marginBottom: '10px', display: 'block' }}></i>
                {file ? (
                  <p style={{ color: '#2a2a2a', fontWeight: '600' }}>
                    <i className="fa fa-file-text" style={{ marginRight: '8px' }}></i>
                    {file.name}
                  </p>
                ) : (
                  <p style={{ color: '#afafaf', fontSize: '14px' }}>
                    Drag & Drop your CV here or <span style={{ color: '#5b03e4', fontWeight: '600' }}>Browse</span>
                    <br />
                    <small>Accepted formats: .pdf, .doc, .docx</small>
                  </p>
                )}
                <input
                  type="file"
                  id="cv-input"
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
              </div>
            </fieldset>
          </div>

          <div className="col-lg-12">
            <fieldset>
              <button type="submit" id="form-submit" className="orange-button">{submitLabel}</button>
            </fieldset>
            {status && <p className="mt-2" style={{
              color: status === 'sent' ? '#28a745' : (status.startsWith('error') ? '#dc3545' : '#5b03e4'),
              fontWeight: '600',
              textAlign: 'center'
            }}>
              {status === 'sent' ? '✓ Application sent successfully!' : (status === 'sending' ? 'Sending application...' : status)}
            </p>}
          </div>
        </div>
      </form>
    </div>
  )
}
