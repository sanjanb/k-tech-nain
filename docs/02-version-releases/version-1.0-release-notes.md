# Farm To Table – Trust & Credibility Update

This document defines the **next update (Option 1)** focused on improving trust and credibility while keeping the product minimal.

This update must NOT introduce payments, chat, reviews, or admin dashboards.

---

## PART A: Task-based TODO.md

Follow tasks in order. Do not skip steps.

---

### Phase A1: Data Model Extension

- [ ] Add `createdAt` field to user records (if not already present)
- [ ] Add `isVerified` boolean field to user records (default: false)

Constraints:

- No new collections
- No document uploads

---

### Phase A2: Farmer Profile Page

- [ ] Create a public Farmer Profile page
- [ ] Fetch farmer details from `users` collection
- [ ] Display only the following fields:

  - Farmer name
  - Location (if available)
  - Total active listings count
  - Active since (formatted from `createdAt`)
  - Contact details (phone or UPI if already stored)

Constraints:

- No edit functionality
- No bio or description text
- No images required

---

### Phase A3: Navigation to Farmer Profile

- [ ] Make farmer name clickable on Product Detail page
- [ ] Route click to Farmer Profile page

Constraints:

- No modal views
- Use a normal page route

---

### Phase B1: Verification Indicator

- [ ] Add a lightweight verification indicator on Farmer Profile page
- [ ] Logic: show "Basic details verified" if `isVerified === true`
- [ ] Hide indicator if false

Constraints:

- No verification workflow
- No document upload
- No automated checks

---

### Phase B2: Product Detail Trust Signals

- [ ] Update Product Detail page to include:

  - "Sold by: Farmer Name" (clickable)
  - "Direct payment to farmer" text near payment section

- [ ] Visually separate payment/contact section using a bordered card

Constraints:

- No checkout
- No payment processing

---

### Phase C: UI Polish (Minimal)

- [ ] Ensure Farmer Profile page matches existing color palette
- [ ] Ensure consistent spacing and typography
- [ ] Ensure mobile-first layout

Constraints:

- No new UI components unless necessary
- No animations

---

### Definition of Done (Trust Update)

This update is complete when:

- Buyers can view a farmer’s profile
- Buyers can see how long a farmer has been active
- Buyers can identify basic verification status
- No new complex features are introduced

---

## PART B: Copilot-Ready Prompts (Phase by Phase)

Use **one prompt at a time**. Do not combine phases.

---

### Prompt A1: Update User Data Model

"Extend the existing Firestore `users` documents to include `createdAt` (timestamp) and `isVerified` (boolean, default false). Ensure `createdAt` is set during user registration. Do not create new collections or add verification workflows."

---

### Prompt A2: Farmer Profile Page

"Create a public Farmer Profile page. Fetch farmer data from the Firestore `users` collection using farmer ID. Display only: farmer name, location (if available), total number of active product listings, and `Active since` derived from `createdAt`. Keep the layout minimal and mobile-first. Do not add edit functionality, images, or bio text."

---

### Prompt A3: Link Farmer Profile

"Update the Product Detail page so the farmer name is clickable and routes to the Farmer Profile page using a standard page route. Do not use modals or overlays."

---

### Prompt B1: Verification Indicator

"On the Farmer Profile page, display a simple text badge that says `Basic details verified` when `isVerified` is true. Hide the badge when false. Do not add verification logic, uploads, or admin controls."

---

### Prompt B2: Product Detail Trust Signals

"Update the Product Detail page UI to clearly show `Sold by: <Farmer Name>` above the payment/contact section. Add the text `Direct payment to farmer` near the UPI/contact details. Visually separate this section using a subtle border or card style. Do not add checkout or payment processing."

---

### Prompt C1: UI Consistency Pass

"Review the Farmer Profile and Product Detail pages for consistent spacing, typography, and colors based on the existing design system. Ensure mobile responsiveness. Do not introduce animations or new components unless required."

---

## Golden Rules for This Update

- If a feature is not listed here, it must NOT be added
- Do not introduce chat, reviews, payments, or admin dashboards
- Trust signals must remain lightweight and informational
- Keep the product minimal and readable

---

This update strengthens credibility without increasing complexity and prepares the platform for real-world usage or demos.
