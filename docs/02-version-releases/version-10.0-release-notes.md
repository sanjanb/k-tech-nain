# Event-Based Notifications (Next.js + Firebase)

Phase-by-Phase Build Plan

## Tech Context

- Frontend: Next.js
- Backend: Firebase (Auth, Firestore, Functions)
- Notifications: Email first, SMS later (optional)
- Scope: Deal confirmation and deal completion only

---

## PHASE 0 – Foundation (Prep Work)

### Goal

Create the minimum structure needed to support notifications without sending anything yet.

### AI PROMPT

Set up a scalable notification foundation in a Next.js + Firebase app.
Do not send messages yet. Focus only on events, data flow, and structure.

### TODO

- [ ] Confirm Firebase Auth is used for farmers and buyers
- [ ] Ensure email and phone are stored in user profiles
- [ ] Define deal status lifecycle:
  - `PENDING`
  - `CONFIRMED`
  - `COMPLETED`
- [ ] Add Firestore collection: `notification_logs`
- [ ] Define event types:
  - `DEAL_CONFIRMED`
  - `DEAL_COMPLETED`

---

## PHASE 1 – Backend Event Triggers (Firebase Functions)

### Goal

Trigger notification events reliably when deal status changes.

### AI PROMPT

Create Firebase Cloud Functions that listen to deal status changes
and emit notification events for confirmed and completed deals.

### TODO

- [ ] Create Cloud Function trigger on `deals/{dealId}` updates
- [ ] Detect valid state transitions:
  - `PENDING → CONFIRMED`
  - `CONFIRMED → COMPLETED`
- [ ] Prevent duplicate triggers (idempotency check)
- [ ] Write event metadata to `notification_logs`
- [ ] Do NOT send emails yet

---

## PHASE 2 – Email Notifications (Core Feature)

### Goal

Send transactional emails for deal confirmation and completion.

### AI PROMPT

Implement transactional email notifications using Firebase Functions.
Send emails only for deal confirmation and completion events.
Use clean templates and avoid sensitive data.

### TODO

- [ ] Integrate email provider (SendGrid / Nodemailer / SES)
- [ ] Create email templates:
  - Deal confirmed (Farmer)
  - Deal confirmed (Buyer)
  - Deal completed (Farmer)
  - Deal completed (Buyer)
- [ ] Fetch recipient email from Firestore profile
- [ ] Send emails asynchronously
- [ ] Update `notification_logs` with send status
- [ ] Handle email failures gracefully (retry or log)

---

## PHASE 3 – Frontend Feedback (Next.js)

### Goal

Make notifications visible and understandable to users.

### AI PROMPT

Update the Next.js UI to inform users when notifications are sent.
Do not expose contact details or message content.

### TODO

- [ ] Show toast/banner:
      “Confirmation sent to your registered email”
- [ ] Show similar message on deal completion
- [ ] Add profile page fields for updating email/phone
- [ ] Add “Resend notification” button (rate-limited)
- [ ] Do NOT display message content in UI

---

## PHASE 4 – Reliability & Safety

### Goal

Ensure notifications are reliable, compliant, and safe.

### AI PROMPT

Harden the notification system against duplicates, failures,
and misuse while keeping it simple.

### TODO

- [ ] Ensure functions are idempotent
- [ ] Prevent multiple emails for same event
- [ ] Add basic rate limiting for resend
- [ ] Add clear disclaimer text in emails
- [ ] Ensure notifications are transactional only

---

## PHASE 5 – Optional Phone Notifications (Future)

### Goal

Prepare for SMS or WhatsApp without enabling it by default.

### AI PROMPT

Design the notification system so phone-based notifications
can be added later without refactoring.

### TODO

- [ ] Keep phone number available in user profile
- [ ] Add channel field in `notification_logs` (EMAIL / SMS)
- [ ] Do NOT send SMS without explicit consent
- [ ] Document WhatsApp/SMS integration path
- [ ] Leave feature disabled by default

---

## Final Success Criteria

- Notifications are triggered by deal state changes
- Emails are sent reliably to farmers and buyers
- No chat or direct messaging exists
- No onboarding, deal, or checkout flow is blocked
- System is extensible but minimal

---
