# Farm To Table

A minimal, working prototype that connects farmers directly with buyers, removing intermediaries and allowing farmers to receive fair prices for their produce.

Farm To Table is intentionally simple. It focuses only on listing produce and enabling direct contact and payment between buyers and farmers. No commissions, no in-platform payments, no complex workflows.

---

## Problem Statement

Farmers often lose a significant portion of their earnings due to intermediaries between them and buyers. While middlemen handle coordination and logistics, they also reduce farmer margins and transparency.

Existing digital marketplaces are often complex, commission-based, or difficult for small farmers to use.

---

## Solution Overview

Farm To Table acts as a lightweight digital mandi.

- Farmers list their produce online
- Buyers browse available produce
- Buyers directly contact or pay farmers using shared details
- The platform does not handle money or logistics

The platform’s role is discovery and connection, not transaction processing.

---

## Core Principles

- Minimal but aesthetic
- Mobile-first design
- No platform commission
- No in-app payments
- Clear and honest user flows
- Easy for non-technical users

---

## Scope (MVP)

This project is deliberately scoped to remain simple and functional.

### Included

- User authentication
- Role-based access (Farmer / Buyer)
- Farmer product listing
- Public product browsing
- Product detail page with farmer contact and payment details

### Excluded (Out of Scope)

- Cart or checkout
- Payment gateway integration
- Logistics or delivery management
- In-app chat
- Reviews or ratings
- Admin panel
- Verification workflows

---

## User Roles

### Farmer

- Registers and selects role as Farmer
- Adds produce listings
- Shares price, quantity, and payment details

### Buyer

- Browses available produce
- Views product and farmer details
- Contacts or pays farmer directly outside the platform

---

## User Flows

### Farmer Flow

1. Register / Login
2. Select role as Farmer
3. Add product details
4. Product becomes publicly visible

### Buyer Flow

1. Visit platform
2. Browse produce listings
3. Open product detail page
4. View farmer contact and payment information
5. Complete transaction directly with farmer

---

## Pages and Screens

1. Home
2. Login / Register
3. Browse Produce
4. Product Detail
5. Add Product (Farmer only)
6. Farmer Home (View own listings)

---

## Data Model (Minimal)

### User

```
uid: string
name: string
email: string
role: 'farmer' | 'buyer'
```

### Product

```
id: string
cropName: string
price: number
quantity: string
farmerId: string
upiId: string
imageUrl?: string
createdAt: timestamp
```

No transaction or payment data is stored.

---

## Tech Stack (Recommended)

- Frontend: Next.js (React)
- Backend & Database: Firebase (Auth + Firestore)
- Image Storage: Firebase Storage
- Hosting: Vercel or Firebase Hosting

This stack is chosen for speed, reliability, and minimal configuration.

---

## Design Guidelines

### Color Palette

- Primary Green: #2E7D32
- Background: #F1F8F4
- Text Primary: #1F2933
- Text Secondary: #6B7280
- White: #FFFFFF

### Typography

- Font: Inter
- One font family only
- Clear hierarchy using size and weight

### UI Rules

- Mobile-first layout
- Large touch-friendly buttons
- One-column layouts
- Consistent spacing and card styles
- No heavy shadows or animations

---

## Accessibility & Usability

- Large readable text
- Simple forms with minimal fields
- Labels above inputs
- No hidden actions

---

## Disclaimer

Farm To Table only connects buyers and farmers.

All payments, transactions, quality checks, and delivery arrangements are handled directly between the buyer and the farmer. The platform does not act as a payment intermediary and is not responsible for disputes.

---

## Project Goals

- Demonstrate a working farm-to-buyer marketplace concept
- Serve as a portfolio-quality project
- Validate usability with real users
- Provide a foundation for future expansion if needed

---

## Future Enhancements (Not in MVP)

- Farmer verification badges
- Location-based filtering
- Ratings or trust indicators
- Featured listings
- Logistics partnerships

These features should only be considered after real user adoption.

---

## Development Plan (High-Level)

1. Setup Firebase and authentication
2. Implement role-based login
3. Build Add Product flow
4. Build Browse and Product Detail pages
5. Apply minimal aesthetic styling
6. Deploy and test with sample users

---

## Success Criteria

The MVP is successful if:

- A farmer can list produce in under 2 minutes
- A buyer can discover and contact a farmer easily
- The platform works reliably on mobile devices

---

## License

This project is intended for educational, prototype, and portfolio use.
