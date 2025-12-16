# Farm To Table

A direct connection platform between farmers and buyers, removing intermediaries from the produce supply chain.

---

## The Problem

Farmers often receive lower prices for their produce due to multiple intermediaries between them and end buyers. Buyers, on the other hand, pay higher prices without knowing where their produce comes from or who grew it. This creates a trust gap and reduces profit margins for farmers.

---

## The Solution

Farm To Table is a minimal web application that lets farmers list their produce directly and allows buyers to browse, compare, and contact farmers without any platform commission or in-app payment processing.

**How it works:**

1. Farmers register and list their produce with price, quantity, and contact details (UPI ID)
2. Buyers browse available produce and view farmer profiles
3. Payment happens directly between buyer and farmer using UPI

The platform simply connects the two parties—it doesn't handle transactions, charge fees, or take commission.

---

## Key Features

### For Farmers

- **List Produce**: Add crops with price, quantity, image, and UPI ID
- **Manage Listings**: Edit price/quantity, mark as sold, or delete listings
- **Farmer Dashboard**: View all personal listings in one place
- **Public Profile**: Buyers can see verification status and listing history

### For Buyers

- **Browse Produce**: View all available produce with search and price filters
- **Sort & Filter**: Find products by name, price range, or posting date
- **Farmer Profiles**: Check farmer details, active listings, and join date
- **Direct Contact**: Payment details (UPI) provided for direct transactions

### Platform Features

- **Email/Password Authentication**: Simple login with role selection (farmer/buyer)
- **Firebase Backend**: Firestore for data, Authentication for users
- **Mobile Responsive**: Burger menu navigation for mobile devices
- **Base64 Image Storage**: Stays on Firebase free tier by storing images directly in Firestore

---

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19
- **Backend**: Firebase (Firestore, Authentication)
- **Styling**: CSS custom properties, inline styles
- **Image Handling**: Base64 encoding (max 500KB per image)
- **Hosting**: Local development (deployment-ready)

---

## Current Limitations

This is a minimal viable product (MVP) built to demonstrate the core concept:

- **No payment processing**: Platform doesn't handle money—transactions happen externally via UPI
- **No verification system**: Farmers can claim "verified" status, but there's no actual verification workflow
- **No messaging**: Buyers contact farmers directly using provided email/phone/UPI
- **No order tracking**: Once contact is made, the platform isn't involved
- **No admin panel**: No moderation or content management features
- **Limited image storage**: 500KB max per image due to Firestore limits
- **No notifications**: No email or push notifications for new listings

These are intentional design choices to keep the platform simple and focused on its core purpose: connecting farmers and buyers.

---

## Demo Flow (3 minutes)

**Setup**: Have one browser window logged in as a farmer, another as a buyer (or use incognito mode).

### Part 1: Farmer Journey (60 seconds)

1. **Register** as a farmer (email, password, select "farmer" role)
2. **Add a product**: Navigate to "Add Product"
   - Enter crop name (e.g., "Organic Tomatoes")
   - Set price (e.g., ₹50/kg)
   - Add quantity (e.g., "100 kg")
   - Provide UPI ID for payment
   - Upload optional image (< 500KB)
3. **View dashboard**: Check "My Listings" page showing your product

### Part 2: Buyer Journey (60 seconds)

1. **Browse** without logging in (or register as buyer)
2. **Use filters**: Search by crop name, apply price range
3. **View product detail**: Click on a listing to see full details
4. **Check farmer profile**: Click farmer name to see their profile, verification badge, and listing count
5. **Note payment info**: UPI ID is displayed for direct payment

### Part 3: Farmer Control (60 seconds)

1. **Switch back to farmer account**
2. **Edit listing**: Change price or quantity
3. **Mark as sold**: Toggle status to "Sold"
4. **Verify buyer view**: Switch to buyer—sold product no longer appears in browse listings
5. **Delete listing**: (Optional) Demonstrate permanent deletion with confirmation

**Key Points to Emphasize:**

- No commission or fees charged
- Direct farmer-to-buyer payment
- Farmers control their own listings
- Platform stays completely free
- Clean, minimal UI focused on trust and transparency

---

## Why I Built This

This project was built to explore how technology can remove inefficiencies in traditional supply chains without adding complexity. The agricultural supply chain has many intermediaries—each taking a cut—which reduces farmer income and increases buyer costs.

**Core Philosophy:**

- **Simplicity over features**: Only what's necessary to connect two parties
- **Trust through transparency**: Show farmer info, verification status, listing history
- **Zero platform fees**: The platform doesn't need to make money to be useful
- **Direct transactions**: Avoid the complexity (and liability) of handling payments

**Key Design Decisions:**

1. **No Payment Processing**

   - Keeps the platform legally simple
   - Reduces development complexity significantly
   - Eliminates need for payment gateway integration
   - Farmers receive 100% of the payment directly

2. **Base64 Image Storage**

   - Avoids Firebase Storage costs (requires paid plan)
   - Keeps entire project on free tier
   - 500KB limit encourages optimized images
   - Trade-off: Slightly larger Firestore documents

3. **Minimal Verification**

   - Real verification requires government integration
   - Current "verified" badge shows platform intent
   - Buyers can still check farmer profiles and listing history
   - Future: Could integrate with farmer ID databases

4. **Role-Based Access**

   - Farmers and buyers have different needs
   - Prevents accidental buyer listings
   - Simplifies UI by hiding irrelevant features

5. **No Messaging System**
   - Would require real-time infrastructure
   - Contact details (email, phone, UPI) already provided
   - Buyers can use existing communication channels
   - Keeps platform focused on discovery, not communication

**What I Learned:**

- Free tier constraints force creative solutions (Base64 images)
- Sometimes removing features creates better UX
- Trust signals (verification, profiles) matter more than fancy features
- Solving a real problem doesn't require a complex product

**Future Improvements (if this were production):**

- Government ID-based farmer verification
- SMS notifications for new listings in buyer's area
- Integration with agricultural databases for seasonal pricing
- Multi-language support for regional farmers
- Geolocation-based listing discovery

This project demonstrates that useful software doesn't need to be complicated. The best solution is often the simplest one that actually works.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase account (free tier)

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd k-tech-nain
```

2. Install dependencies:

```bash
npm install
```

3. Create a Firebase project:

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create Firestore Database (test mode)

4. Add environment variables:
   - Create `.env.local` in the root directory
   - Add your Firebase config:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
├── app/
│   ├── page.jsx              # Home page with "How it works"
│   ├── auth/page.jsx         # Login/Register with role selection
│   ├── browse/page.jsx       # Browse products (public)
│   ├── add-product/page.jsx  # Add new listing (farmers only)
│   ├── farmer/page.jsx       # Farmer dashboard (listings management)
│   ├── edit-product/[id]/    # Edit listing page
│   ├── product/[id]/         # Product detail page
│   └── farmer-profile/[id]/  # Public farmer profile
├── components/
│   ├── Navigation.jsx        # Header with role-based links
│   └── Footer.jsx            # Footer with disclaimer
├── lib/
│   └── firebase.js           # Firebase configuration
└── styles/
    └── globals.css           # Global styles and CSS variables
```

---

## Screenshots

Screenshots demonstrate the following flows:

1. Home page with value proposition
2. Farmer registration and product listing
3. Buyer browsing with filters
4. Product detail page with farmer info
5. Farmer dashboard with edit/delete controls
6. Mobile responsive navigation

(Screenshots available in `/screenshots` folder)

---

## License

This project is open source and available for educational purposes.

---

## Contact

Built by **Sanjan BM**  
Portfolio: [sanjanb.github.io](https://sanjanb.github.io/)
[->](https://console.firebase.google.com/u/0/project/k-tech-nain/firestore/databases/)

---

**Note**: This is a portfolio/demonstration project. It is not intended for production use without additional security, verification, and moderation features.
