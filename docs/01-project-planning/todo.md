# Farm To Table – Task-based TODO

This TODO file breaks the project into small, executable steps. Each task is intentionally scoped so Copilot or any AI coding assistant can complete it without guessing or adding extra features.

Do tasks in order. Do not skip steps.

---

## Phase 0: Project Setup

- [ ] Initialize a new Next.js project (latest stable)
- [ ] Initialize a Git repository
- [ ] Create basic folder structure:

  - `/app` or `/pages`
  - `/components`
  - `/styles`

---

## Phase 1: Firebase Setup

- [ ] Create a Firebase project
- [ ] Enable Email/Password authentication
- [ ] Create Firestore database
- [ ] Create Firebase config file
- [ ] Connect Firebase to the Next.js app

Constraints:

- Do not add phone OTP
- Do not add third-party auth

---

## Phase 2: Authentication & Roles

- [ ] Create Login/Register page
- [ ] Implement Email + Password authentication
- [ ] Add role selection (Farmer / Buyer) during signup
- [ ] Store user role in Firestore `users` collection
- [ ] Redirect users based on role after login

Constraints:

- Single form for login and register
- No password reset flow for MVP

---

## Phase 3: Global Layout & Styling

- [ ] Add global layout with top navigation
- [ ] Navigation items:

  - Home
  - Browse Produce
  - Add Product (Farmer only)
  - Logout

- [ ] Apply global styles

Design rules:

- Use Inter font
- Use defined color palette
- Mobile-first layout
- No animations

---

## Phase 4: Home Page

- [ ] Create Home page
- [ ] Display project tagline
- [ ] Add "Browse Produce" button
- [ ] Add "I am a Farmer" button (links to login)

Constraints:

- No hero images
- No extra sections

---

## Phase 5: Add Product (Farmer Only)

- [ ] Create Add Product page
- [ ] Restrict access to Farmers only
- [ ] Create product form with fields:

  - Crop Name
  - Price (₹ per kg)
  - Quantity
  - UPI ID
  - Image upload (optional)

- [ ] Save product to Firestore `products` collection

Constraints:

- Exactly 5 fields
- No dropdowns
- No validation beyond required fields

---

## Phase 6: Browse Produce (Public)

- [ ] Create Browse Produce page
- [ ] Fetch all products from Firestore
- [ ] Display products in a simple grid
- [ ] Show crop name, price, and location if available

Constraints:

- No filters
- No pagination
- No sorting

---

## Phase 7: Product Detail Page

- [ ] Create dynamic Product Detail page
- [ ] Display full product information
- [ ] Display farmer payment and contact details
- [ ] Add disclaimer text at bottom of page

Constraints:

- No cart
- No checkout
- No in-app payment

---

## Phase 8: Farmer Home (Listings)

- [ ] Create Farmer Home page
- [ ] Fetch products created by logged-in farmer
- [ ] Display list of farmer’s own products

Constraints:

- No edit or delete for MVP
- No analytics

---

## Phase 9: Basic Access Control

- [ ] Prevent buyers from accessing Add Product page
- [ ] Prevent unauthenticated users from adding products

---

## Phase 10: Disclaimer & Safety

- [ ] Add platform disclaimer on Product Detail page
- [ ] Add disclaimer in footer or About section

Text:
"Farm To Table only connects buyers and farmers. Payments and transactions happen directly between them."

---

## Phase 11: Final Polish

- [ ] Ensure mobile responsiveness
- [ ] Ensure consistent spacing and typography
- [ ] Remove unused components

Constraints:

- No feature additions
- No refactors unless required

---

## Phase 12: Deployment

- [ ] Deploy application using Vercel or Firebase Hosting
- [ ] Test signup, product listing, and browsing flows

---

## Definition of Done

The project is complete when:

- A farmer can add a product in under 2 minutes
- A buyer can view product and farmer payment details
- The platform works reliably on mobile
- No extra features beyond this TODO exist

---

## Important Rule

If a feature is not explicitly listed in this TODO file, it must NOT be implemented.
