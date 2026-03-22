# HeadStart CV — Minimal Vite + React scaffold

This is a minimal scaffold created as the starting point for the HeadStart CV website.

To run locally:

```bash
cd site
npm install
npm run dev
```

Notes:
- Contact form in `/src/pages/Contact.jsx` includes Netlify Forms-compatible markup (data-netlify="true").
- WhatsApp number is configurable via `VITE_WHATSAPP_NUMBER` (see `.env.example`).
- A sample Netlify Function to forward form data to SendGrid is included at `netlify/functions/send-email.js` (optional).

How to wire SendGrid forwarding (optional)

1. Add environment variables on Netlify (Site settings > Build & deploy > Environment):

	- SENDGRID_API_KEY
	- SENDGRID_FROM_EMAIL
	- SENDGRID_TO_EMAIL
	- VITE_WHATSAPP_NUMBER

2a. Option A — use Netlify Forms only
	- Keep the current form (Netlify will capture submissions).
	- Configure form notifications in Netlify or integrate with Zapier/webhooks.

2b. Option B — forward to SendGrid via function
	- Change the contact form to POST JSON to `/.netlify/functions/send-email` (or add a webhook that posts to that URL).
	- The provided function expects JSON with fields: `name`, `email`, `phone`, `role`, `message`.

Local dev notes
- Vite loads env vars from `.env` files prefixed with `VITE_` — create a local `.env` (not committed) or use Netlify build vars.
