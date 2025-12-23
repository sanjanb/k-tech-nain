# Farm To Table – Copilot‑Ready Prompts (Phase by Phase)

Use these prompts exactly as written. Run them one phase at a time. Do not combine phases.

Each prompt is intentionally strict so Copilot does not add extra features or complexity.

---

## Phase 0: Project Setup

**Prompt to Copilot:**

"Initialize a new Next.js project using the latest stable version. Create a clean project with no extra demo content. Set up a basic folder structure with `app` (or `pages`), `components`, and `styles`. Do not add any UI libraries or example pages. Keep it minimal."

---

## Phase 1: Firebase Setup

**Prompt to Copilot:**

"Set up Firebase in this Next.js project. Use Firebase Authentication (Email and Password only), Firestore, and Firebase Storage. Create a single Firebase config file and export initialized instances. Do not add phone auth, Google auth, or any other providers. Do not add backend APIs."

---

## Phase 2: Authentication & Roles

**Prompt to Copilot:**

"Create a combined Login/Register page using Firebase Email and Password authentication. During signup, allow the user to select a role: `farmer` or `buyer`. Store the user record in a Firestore `users` collection with fields: uid, name, email, role. After login, redirect farmers to a farmer home page and buyers to a browse produce page. Do not add password reset or email verification."

---

## Phase 3: Global Layout & Styling

**Prompt to Copilot:**

"Create a global layout with a simple top navigation bar. Navigation items: Home, Browse Produce, Add Product (visible only for farmers), Logout. Apply global styling using the Inter font and the following colors only: primary green `#2E7D32`, background `#F1F8F4`, text primary `#1F2933`, text secondary `#6B7280`, white `#FFFFFF`. Mobile-first layout. No animations, no UI libraries."

---

## Phase 4: Home Page

**Prompt to Copilot:**

"Build a minimal Home page with a centered tagline: `Buy directly from farmers. No middlemen.` Add two buttons: `Browse Produce` and `I am a Farmer`. Keep the page simple with plenty of white space. Do not add images, icons, or extra sections."

---

## Phase 5: Add Product (Farmer Only)

**Prompt to Copilot:**

"Create an Add Product page accessible only to users with the `farmer` role. Build a simple form with exactly these fields: Crop Name, Price (₹ per kg), Quantity, UPI ID, Image upload (optional). On submit, save the product to a Firestore `products` collection with a reference to the farmer’s user ID. Do not add validation beyond required fields. Do not add edit or delete functionality."

---

## Phase 6: Browse Produce (Public)

**Prompt to Copilot:**

"Create a Browse Produce page that fetches all products from Firestore and displays them in a simple grid. Each product card should show crop name, price, and farmer location if available. Clicking a card should navigate to the product detail page. Do not add filters, sorting, pagination, or search."

---

## Phase 7: Product Detail Page

**Prompt to Copilot:**

"Create a Product Detail page that displays full product information: crop name, price, quantity, image (if available), and farmer payment/contact details (UPI ID or phone). Include the following disclaimer text at the bottom: `Farm To Table only connects buyers and farmers. Payments and transactions happen directly between them.` Do not add cart, checkout, or payment processing."

---

## Phase 8: Farmer Home (Listings)

**Prompt to Copilot:**

"Create a Farmer Home page that lists all products created by the logged-in farmer. Display them in a simple list or cards. Do not add analytics, edit, delete, or status toggles. This page is view-only."

---

## Phase 9: Basic Access Control

**Prompt to Copilot:**

"Add basic route protection to prevent buyers from accessing farmer-only pages and prevent unauthenticated users from adding products. Keep the logic simple and client-side only. Do not add middleware or advanced auth guards."

---

## Phase 10: Disclaimer & Safety

**Prompt to Copilot:**

"Ensure the platform disclaimer is visible on the Product Detail page and optionally in the footer. Use plain text. Do not add legal pages or extra explanations."

---

## Phase 11: Final Polish

**Prompt to Copilot:**

"Review the application for consistency in spacing, typography, and colors. Ensure mobile responsiveness. Remove unused components or styles. Do not add any new features or refactor existing logic unless necessary."

---

## Phase 12: Deployment

**Prompt to Copilot:**

"Prepare the project for deployment and deploy it using Vercel or Firebase Hosting. Ensure environment variables are configured correctly and the build runs successfully. Do not change application features."

---

## Golden Rule

If a feature is not explicitly requested in these prompts, it must NOT be implemented.
