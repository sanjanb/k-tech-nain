# Farm To Table

**A direct farmer-to-buyer marketplace that removes intermediaries from the agricultural supply chain.**

Farm To Table is a minimal web platform that allows farmers to list their produce directly and enables buyers to discover and transact with them without platform fees, commissions, or in-app payments.
![homepage](/assets/Screenshot 2025-12-17 101852.png)

---

## Overview

In traditional agricultural supply chains, farmers lose a significant portion of their earnings to intermediaries, while buyers pay higher prices without transparency about the source of their produce.

Farm To Table addresses this gap by acting purely as a **connection layer**. It helps farmers and buyers find each other, while all transactions and communication happen directly between them.

The platform is intentionally simple, transparent, and fee-free.

---

## How It Works

1. **Farmers** register and list produce with price, quantity, and payment details.
2. **Buyers** browse available produce and view farmer profiles.
3. **Payment and delivery** are handled directly between buyer and farmer using UPI or external communication.

The platform does not process payments, handle logistics, or charge commissions.

---

## Key Features

### Farmer Features

* Create and manage produce listings (price, quantity, image, UPI ID)
* Edit or delete listings at any time
* Mark listings as sold
* View all listings in a dedicated dashboard
* Public farmer profile visible to buyers

### Buyer Features

* Browse produce without mandatory login
* Search and filter by crop name and price
* View detailed product pages
* Access farmer profiles with listing history
* Get direct payment details for off-platform transactions

### Platform Capabilities

* Email/password authentication with role-based access
* Firebase Authentication and Firestore backend
* Responsive UI for desktop and mobile
* Free-tier–friendly Base64 image storage
* No commissions, no hidden charges

---

## Design Philosophy

This project follows a strict set of principles:

* **Simplicity over scale**
  Only features that support direct discovery and trust are included.

* **Transparency over control**
  Users always know who they are dealing with.

* **Zero platform dependency**
  The platform does not lock users into payments, messaging, or logistics.

* **Free by design**
  The platform does not monetize transactions.

---

## Technology Stack

* **Frontend**: Next.js (App Router), React
* **Backend**: Firebase (Firestore, Authentication)
* **Styling**: CSS custom properties
* **Image Handling**: Base64 encoding (≤ 500KB per image)
* **Hosting**: Local development (deployment-ready)

---

## Current Scope & Limitations

This project is intentionally built as a focused MVP.

* No in-app payments or order processing
* No messaging system
* No logistics or delivery tracking
* No admin moderation panel
* No real-world identity verification
* Limited image size due to Firestore constraints
* No notifications or alerts

These limitations are deliberate to keep the platform lightweight, understandable, and legally simple.

---

## Demo Walkthrough (3 Minutes)

**Setup:**
Use two browser sessions (or incognito mode): one as a farmer, one as a buyer.

### Farmer Flow

1. Register as a farmer
2. Add a produce listing with price, quantity, and UPI ID
3. View listings in the farmer dashboard
4. Edit or mark a product as sold

### Buyer Flow

1. Browse listings publicly
2. Search and filter produce
3. View product details
4. Open farmer profile
5. Access payment details for direct transaction

### Key Takeaways

* No platform fees
* Direct farmer control
* Clear trust signals
* Clean, minimal UI

---

## Project Structure

```
├── app/
│   ├── page.jsx              # Home page
│   ├── auth/page.jsx         # Login & registration
│   ├── browse/page.jsx       # Public product browsing
│   ├── add-product/page.jsx  # Farmer product listing
│   ├── farmer/page.jsx       # Farmer dashboard
│   ├── edit-product/[id]/    # Edit listing
│   ├── product/[id]/         # Product detail
│   └── farmer-profile/[id]/  # Public farmer profile
├── components/
│   ├── Navigation.jsx
│   └── Footer.jsx
├── lib/
│   └── firebase.js
└── styles/
    └── globals.css
```

---

## Setup Instructions

### Prerequisites

* Node.js 18+
* Firebase account (free tier)

### Installation

```bash
git clone <repository-url>
cd farm-to-table
npm install
```

### Firebase Configuration

1. Create a Firebase project
2. Enable Email/Password Authentication
3. Create a Firestore database (test mode)
4. Add environment variables in `.env.local`:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Future Enhancements

If expanded toward production use:

* Verified farmer onboarding
* Post-transaction ratings and feedback
* Location-based discovery
* Multi-language support
* SMS notifications for listings

---

## Author

**Sanjan BM**
Portfolio: [https://sanjanb.github.io/](https://sanjanb.github.io/)

---

## Disclaimer

Farm To Table only connects buyers and farmers.
All payments, communication, and deliveries occur directly between users.

