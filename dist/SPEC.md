HeadStart CV Website — Specification Document
===========================================

Prepared by: HeadStart CV
Date: 2026-03-02

Purpose
-------
Guide design and development of the HeadStart CV website: a lightweight, professional career services platform focused on CV writing and job-search support. Use the provided HTML template as a scaffold; implement as a lightweight React single-page app (Vite + React) and deploy on Netlify. The primary lead-capture flow uses a serverless SendGrid-backed function rather than relying solely on static Netlify Forms.

1. Project Overview
-------------------
- Project name: HeadStart CV Website
- Primary goal: Lead generation and credibility building for career services (CV writing, ATS optimisation, LinkedIn optimisation, cover letters, coaching).
- Target users: Job seekers, recent graduates, mid-career professionals, career switchers.

2. Objectives
-------------
- Clearly communicate services and value proposition.
- Encourage CV submissions and inquiries via forms and WhatsApp.
- Build trust via testimonials, success stories, and content.
- Support WhatsApp click-to-chat and email engagement; capture leads via a SendGrid-backed serverless function (primary) with an optional Netlify Forms fallback.

3. Sitemap (core)
-----------------
- Home
- Services
- How It Works
- Success Stories
- Blog / Insights (CMS-backed)
- Contact Us

Optional: About Us, Pricing, FAQs (implement as SPA routes only if needed; avoid hardcoding static pages unless required)

4. Functional Requirements
--------------------------
- Responsive design across mobile / tablet / desktop.
 - Contact and CV submission forms:
  - Fields: name, email, phone, role/industry, message, file upload (PDF/DOCX).
  - Primary implementation: client-side form submits JSON (optionally including base64-encoded attachments) to a Netlify Function which forwards messages to SendGrid (`/.netlify/functions/send-email`). This provides reliable delivery and attachment support.
  - Optional fallback: keep Netlify Forms-compatible static markup for simple captures, but do not rely on it as the primary delivery mechanism for attachments.
 - WhatsApp click-to-chat integration (wa.me link with prefilled message).
 - Blog: CMS-backed or remote CMS (e.g., WordPress API) for listing and detail pages; current approach supports fetching posts from a remote API and rendering SPA routes.
 - Email integration: primary via serverless forwarding to SendGrid; Netlify form notifications may be kept as a secondary/fallback mechanism.

5. Content Requirements
- How It Works: process steps with timeline and expectations.
- Success Stories: case studies and measurable outcomes.
- Blog/Insights: articles on job search, CV tips, ATS advice.
  - Serverless email forwarding using SendGrid: primary form submissions will be sent to a Netlify Function which forwards to SendGrid (preferred for attachments and richer handling). Keep the Netlify Forms option as fallback if needed.
- Contact: form + WhatsApp + email + optional phone number.

- Microcopy for form privacy and expected response times.

 - SendGrid-based form handling: the site uses a serverless function (`/.netlify/functions/send-email`) that accepts JSON payloads (including optional base64-encoded attachments) and sends mail via SendGrid. This allows larger attachments and better control. Do NOT commit your SendGrid API key into the repo; use environment variables (`SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SENDGRID_TO_EMAIL`).
- File uploads: Netlify Forms supports attachments but with limits; for larger or more reliable uploads, use a serverless function to store in cloud object storage.

8. Success Metrics (KPIs)
------------------------
- Number of CV submissions (form completions with attachment).
- Number of contact inquiries (form submissions).
- WhatsApp engagements (click-to-chat counts).
- Bounce rate, average time on site, pages per session.
- Conversion rate (visits → submissions).

9. Out of Scope (Phase One)
---------------------------
- Online payments / checkout
- Job board or job listings
- User accounts and login

10. Deliverables
----------------
- This SPEC file (`SPEC.md`).
- Lightweight React codebase using the `template/` assets as scaffold (components and pages).
- Netlify-ready build configuration and Netlify Forms-enabled contact/CV form markup.
- Blog content setup (Markdown + Netlify CMS or simple content folder).
- Deployment plan and basic analytics and form notifications configured.

11. Implementation Notes & Constraints
------------------------------------
- Use the existing `template/` HTML, CSS, and assets as the starting scaffold; convert static sections into React components to keep structure and styling.
- Netlify Forms requirement: ensure the form markup is present in the built HTML (not only client-side rendered after hydration). Prefer static pre-rendered form markup or server-side rendering / pre-render step.
- For attachments: consider a Netlify Function to accept multipart uploads and store files in cloud storage if Netlify Forms limits are restrictive.
- WhatsApp link should use a configurable environment variable for the target phone number.
- Blog/CMS: prefer Markdown files in a `/content` folder for simplicity; Netlify CMS may be added if non-technical editors need a UI.

12. Acceptance Criteria
----------------------
- Responsive site that uses the provided `template/` styling and renders the specified pages.
- Lead forms submit successfully to Netlify Forms and owner receives notifications.
- WhatsApp click-to-chat works on mobile/desktop.
- Blog posts are accessible and routable.
- Basic SEO tags and performance optimizations present.

Checklist
---------
- [x] Draft baseline specification document (this file).
- [ ] Review & feedback from user.
- [ ] Create lightweight React scaffold using template HTML.
- [ ] Integrate Netlify Forms, WhatsApp and email.
- [ ] Deploy to Netlify and verify forms/metrics.

Notes — Start
-------------
- Repository location: use the existing `template/` folder as the starting point.
- Recommended stack: Vite + React, CSS from `template/assets/css`, and simple routing (React Router or file-based with SSG).
- Netlify: configure build command (`npm run build`) and publish directory (`dist` or `build`) depending on framework.

Next steps
----------
1. Confirm this spec.
2. If confirmed, I will scaffold a minimal Vite + React project and port the template HTML into React components, then add a Netlify-ready contact/CV form.

Progress & Changes (live)
-------------------------
- 2026-03-02: Spec drafted and saved.
- 2026-03-02: Minimal Vite + React scaffold created at `site/` with `Home` and `Contact` pages, header/footer, basic styles, and Netlify-ready contact form.
- 2026-03-02: WhatsApp CTA wired to use `VITE_WHATSAPP_NUMBER` environment variable (see `site/.env.example`).
- 2026-03-02: Added a sample Netlify Function `netlify/functions/send-email.js` to forward form data to SendGrid (optional approach for email forwarding or richer handling).

Updated Checklist
-----------------
- [x] Draft baseline specification document (this file).
- [x] Review & feedback from user (user approved continuation to scaffold).
- [x] Create lightweight React scaffold using template HTML.
- [ ] Integrate Netlify Forms, WhatsApp and email (in-progress — form present, WhatsApp configurable, SendGrid function stub added).
- [ ] Deploy to Netlify and verify forms/metrics.

Notes on integration
--------------------
- Netlify Forms: the contact form includes `data-netlify="true"` and a `form-name` hidden field so Netlify will capture submissions during build.
- File uploads: Netlify Forms supports attachments but with limits; if you expect larger files or need reliable storage, use the provided serverless function or a direct upload to cloud storage.
- SendGrid function: included as a starter stub — it requires environment variables and may be used by posting JSON to `/.netlify/functions/send-email` or by wiring a webhook.

