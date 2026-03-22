const nodemailer = require('nodemailer')

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" }
    }

    try {
        const data = JSON.parse(event.body)

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

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully" })
        }
    } catch (error) {
        console.error("Error sending email:", error)
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}
