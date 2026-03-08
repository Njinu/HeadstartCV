exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const data = JSON.parse(event.body)
    const apiKey = process.env.SENDGRID_API_KEY
    const from = process.env.SENDGRID_FROM_EMAIL
    const to = process.env.SENDGRID_TO_EMAIL

    // Require SendGrid configuration from Netlify environment variables
    if (!apiKey || !from || !to) {
      return { statusCode: 500, body: 'SendGrid not configured (ensure SENDGRID_API_KEY, SENDGRID_FROM_EMAIL and SENDGRID_TO_EMAIL are set in Netlify env)' }
    }

    const subject = `New CV submission from ${data.name || 'Unknown'}`
    const plain = `Name: ${data.name || ''}\nEmail: ${data.email || ''}\nPhone: ${data.phone || ''}\nRole: ${data.role || ''}\nMessage: ${data.message || ''}`

    const mail = {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject,
      content: [{ type: 'text/plain', value: plain }]
    }

    // Attach file if provided (expects base64 content)
    if (data.attachment && data.attachment.content) {
      mail.attachments = [
        {
          content: data.attachment.content,
          filename: data.attachment.fileName || 'attachment',
          type: data.attachment.type || 'application/octet-stream',
          disposition: 'attachment'
        }
      ]
    }

    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mail)
    })

    if (!res.ok) {
      const text = await res.text()
      return { statusCode: res.status || 500, body: `SendGrid error: ${text}` }
    }

    return { statusCode: 200, body: 'Email sent' }
  } catch (err) {
    return { statusCode: 500, body: String(err) }
  }
}
