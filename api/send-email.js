const nodemailer = require('nodemailer')

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    try {
        const data = req.body

        // Gmail SMTP Transport
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_TO || process.env.GMAIL_USER,
            subject: `[Job Application] ${data.name || 'New Candidate'}`,
            text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Job URL: ${data.jobUrl || 'N/A'}
Message: ${data.message || ''}
      `,
        }

        // Attach CV if provided
        if (data.attachment && data.attachment.content) {
            mailOptions.attachments = [{
                filename: data.attachment.fileName,
                content: data.attachment.content,
                encoding: 'base64',
                contentType: data.attachment.type
            }]
        }

        await transporter.sendMail(mailOptions)

        return res.status(200).json({ message: 'Email sent successfully' })
    } catch (error) {
        console.error('Error sending email:', error)
        return res.status(500).json({ error: error.message })
    }
}
