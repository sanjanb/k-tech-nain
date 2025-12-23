# Kannada Language Support (Next.js + Firebase)

Phase-by-Phase Build Plan

## Supported Languages

- English (default)
- Kannada (`kn`)

---

## PHASE 0 – Language Foundation

### Goal

Introduce language awareness without changing UI behavior yet.

### AI PROMPT

Prepare the application for multi-language support.
Add language preference handling with English as default.

### TODO

- [ ] Add `language` field to user profile (`en` | `kn`)
- [ ] Default language to `en` for existing users
- [ ] Allow farmers and buyers to update language in profile
- [ ] Ensure fallback to English if language is missing

---

## PHASE 1 – UI Translation (Core Screens)

### Goal

Translate critical UI text into Kannada.

### AI PROMPT

Implement Kannada translations for key UI messages
using a simple, maintainable translation structure.

### TODO

- [ ] Create translation files:
  - `en.json`
  - `kn.json`
- [ ] Translate key UI strings:
  - Deal confirmed
  - Deal completed
  - Payment instructions
  - Notifications sent messages
- [ ] Load language based on user preference
- [ ] Avoid hardcoded strings in components

---

## PHASE 2 – Email Notifications (Most Important)

### Goal

Send emails in the user’s preferred language.

### AI PROMPT

Update email notification templates to support English and Kannada.
Select templates dynamically based on user language.

### TODO

- [ ] Create email templates:
  - English versions
  - Kannada versions
- [ ] Select template based on `user.language`
- [ ] Fallback to English if Kannada template missing
- [ ] Test Kannada rendering in email clients

---

## PHASE 3 – Frontend Feedback & UX

### Goal

Make language choice visible and trustworthy.

### AI PROMPT

Ensure frontend feedback messages respect user language
and provide a consistent bilingual experience.

### TODO

- [ ] Show toasts/alerts in selected language
- [ ] Update confirmation messages in Kannada
- [ ] Ensure no mixed-language UI
- [ ] Keep language switch simple (dropdown or toggle)

---

## PHASE 4 – Quality & Accessibility

### Goal

Ensure Kannada content is readable and correct.

### AI PROMPT

Review Kannada language support for clarity, correctness,
and usability for real users.

### TODO

- [ ] Verify Kannada translations with native speakers
- [ ] Ensure font renders Kannada properly
- [ ] Check text overflow and line breaks
- [ ] Avoid auto-translation tools for final copy

---

## Final Success Criteria

- Users can choose Kannada or English
- UI and emails respect language preference
- No broken layouts due to Kannada text
- English fallback always works
- No duplication of logic across components

---
