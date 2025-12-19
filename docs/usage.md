# Farm To Table - Usage Guide

Complete guide on how to use the Farm To Table platform, covering all features and responsibilities for different user roles.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [User Roles](#user-roles)
3. [Authentication](#authentication)
4. [Buyer Features & Usage](#buyer-features--usage)
5. [Farmer Features & Usage](#farmer-features--usage)
6. [Admin Features & Usage](#admin-features--usage)
7. [Deal Management](#deal-management)
8. [Profile Management](#profile-management)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Accessing the Platform

1. Visit the Farm To Table website
2. The homepage shows an overview of the platform
3. You can browse products without logging in
4. To create listings or make deals, you need to register/login

### First-Time Setup

1. Click on "Get Started" or "Login" from the navigation bar
2. Choose between "Register" or "Login"
3. For registration, select your role: **Farmer** or **Buyer**
4. Complete the registration form
5. You'll be redirected to your role-specific dashboard

---

## User Roles

### Farmer
- Lists produce for sale
- Sets prices and quantities
- Provides UPI payment details
- Manages listings (edit, delete, mark as sold)
- Confirms completed transactions
- Receives buyer feedback

### Buyer
- Browses available produce
- Views product details and farmer information
- Creates deals with farmers
- Confirms completed transactions
- Provides feedback to farmers

### Admin
- Verifies farmer accounts
- Manages platform integrity
- Access restricted to admin email only

---

## Authentication

### Registration

1. Navigate to `/auth`
2. Select "Register" tab
3. Fill in the registration form:
   - **Name**: Your full name
   - **Email**: Valid email address
   - **Password**: Secure password
   - **Role**: Choose "Farmer" or "Buyer"
4. Click "Register"
5. You'll be redirected based on your role:
   - Farmers → Farmer Dashboard (`/farmer`)
   - Buyers → Browse Page (`/browse`)

### Login

1. Navigate to `/auth`
2. Select "Login" tab
3. Enter your email and password
4. Click "Login"
5. You'll be redirected to your role-specific page

### Logout

1. Click on your profile icon/name in the navigation bar
2. Select "Logout"
3. You'll be logged out and redirected to the homepage

---

## Buyer Features & Usage

### 1. Browse Products

**Location**: `/browse`

**How to Use**:
1. Navigate to "Browse" in the navigation menu
2. View all available products in a grid layout
3. Each product card shows:
   - Product image
   - Crop name
   - Price per unit
   - Quantity available
   - Farmer verification badge (if verified)
   - "Sold" badge (if no longer available)

### 2. Search and Filter

**Available Filters**:
- **Search by Name**: Enter crop name in the search bar
- **Price Range**: Set minimum and maximum price
- **Sort Options**:
  - Newest First (default)
  - Price: Low to High
  - Price: High to Low

**How to Use**:
1. Enter search criteria in the filter section
2. Products automatically update based on filters
3. Use pagination to navigate through results (6 products per page)

### 3. View Product Details

**Location**: `/product/[id]`

**What You'll See**:
- Full product information
- High-quality product image
- Crop name, price, quantity
- Farmer's name and verification status
- Farmer's UPI ID for direct payment
- Link to farmer's profile
- "Interested? Make a Deal" button

**How to Use**:
1. Click on any product card from the browse page
2. Review all product and farmer details
3. Click "Interested? Make a Deal" to initiate a transaction
4. This creates a deal record linking you with the farmer

### 4. View Farmer Profile

**Location**: `/farmer-profile/[id]`

**What You'll See**:
- Farmer's name and verification status
- All products listed by this farmer
- Product grid showing available and sold items
- Back button to return to browsing

**How to Use**:
1. Click "View Farmer Profile" from any product page
2. Browse all products from this specific farmer
3. Click on any product to view details

### 5. My Deals

**Location**: `/my-deals`

**What You'll See**:
- All deals you've initiated with farmers
- Deal status (Pending, Buyer Confirmed, Completed)
- Product details and farmer information
- Confirmation and feedback options

**How to Use**:

#### Confirm a Deal
1. Navigate to "My Deals" from the navigation menu
2. Find the deal you want to confirm
3. Click "Confirm Purchase" when you've received the product
4. Deal status updates to "Buyer Confirmed"

#### Leave Feedback (After Both Parties Confirm)
1. Wait for both you and the farmer to confirm the deal
2. Once completed, a "Leave Feedback" button appears
3. Click "Leave Feedback"
4. Fill in the feedback form:
   - **Rating**: 1-5 stars (default: 5)
   - **Comment**: Your experience with the farmer
5. Submit feedback
6. Feedback is permanently associated with the farmer

**Deal Statuses Explained**:
- **Pending**: Deal created, waiting for confirmation
- **Buyer Confirmed**: You confirmed, waiting for farmer
- **Farmer Confirmed**: Farmer confirmed, waiting for you
- **Completed**: Both parties confirmed (eligible for feedback)

### 6. View Your Profile

**Location**: `/profile`

**What You'll See**:
- Your account information
- Number of deals completed
- Recent deals history
- Link to "My Deals" page

---

## Farmer Features & Usage

### 1. Farmer Dashboard

**Location**: `/farmer`

**What You'll See**:
- Welcome message with your name
- "Add New Product" button
- List of all your products (available and sold)
- Deals section showing active deals
- Edit and delete options for each product

### 2. Add New Product

**Location**: `/add-product`

**How to Use**:
1. Click "Add New Product" from your farmer dashboard
2. Fill in the product form:
   - **Crop Name**: Name of the produce (e.g., "Organic Tomatoes")
   - **Price**: Price per unit (₹)
   - **Quantity**: Amount available (with unit, e.g., "10 kg")
   - **UPI ID**: Your UPI ID for receiving payments
   - **Product Image**: Upload image (max 500KB)
3. Click "Add Product"
4. Product is immediately listed and visible to all buyers

**Important Notes**:
- Image must be under 500KB (compress if needed)
- All fields are required
- UPI ID is shared with interested buyers
- Products default to "available" status

### 3. Edit Product

**Location**: `/edit-product/[id]`

**How to Use**:
1. From your farmer dashboard, click "Edit" on any product
2. Update any of the following fields:
   - Crop name
   - Price
   - Quantity
   - UPI ID
   - Product image
3. Click "Update Product"
4. Changes are immediately reflected

**When to Edit**:
- Update quantity after partial sales
- Adjust pricing
- Change UPI details
- Update product image

### 4. Manage Product Status

**Available Actions**:
- **Mark as Sold**: When all quantity is sold
- **Mark as Available**: When restocking a sold item

**How to Use**:
1. From your farmer dashboard, find the product
2. Click the status toggle button:
   - "Mark as Sold" for available products
   - "Mark as Available" for sold products
3. Status updates immediately
4. Sold products are hidden from buyer browse page

### 5. Delete Product

**How to Use**:
1. From your farmer dashboard, click "Delete" on any product
2. Confirm the deletion
3. Product is permanently removed from the platform

**When to Delete**:
- Discontinued products
- Seasonal items no longer available
- Incorrect listings

### 6. Manage Deals

**What You'll See**:
- All deals created by buyers for your products
- Buyer information and contact details
- Deal status and confirmation options
- Product details for each deal

**How to Use**:

#### Confirm a Deal
1. Check the deals section on your farmer dashboard
2. Find the deal you've completed
3. Click "Confirm as Farmer"
4. This marks the deal as confirmed from your side

**Deal Confirmation Process**:
- Buyer initiates deal by clicking "Make a Deal"
- You receive the product offline/arrange delivery
- Buyer confirms receipt
- You confirm completion
- Both confirmations = Completed deal
- Both parties can now leave feedback

### 7. View Your Products

**Location**: Your farmer dashboard lists all products

**What You'll See**:
- Product image, name, price, quantity
- Current status (Available/Sold)
- Edit and Delete buttons
- Quick actions for status changes

---

## Admin Features & Usage

### Access Requirements

- Only accessible to the admin email: `admin@farmtotable.com`
- Unauthorized users are redirected to homepage

### Farmer Verification

**Location**: `/admin/verify`

**How to Use**:
1. Login with admin email
2. Navigate to `/admin/verify`
3. View list of all registered farmers
4. Each farmer shows:
   - Name
   - Email
   - Current verification status
   - Toggle verification button

**Verification Actions**:
- **Verify Farmer**: Click "Verify" on unverified accounts
- **Unverify Farmer**: Click "Unverify" on verified accounts
- Verification status is immediately updated
- Verified badge appears on farmer profiles and products

**Why Verification Matters**:
- Builds trust with buyers
- Indicates farmer authenticity
- Highlighted with green badge on listings
- Improves farmer visibility

### Admin Responsibilities

1. **Review Farmer Accounts**: Regularly check new farmer registrations
2. **Verify Legitimate Farmers**: Verify farmers based on criteria (manual process)
3. **Monitor Platform Activity**: Keep track of active users and listings
4. **Handle Disputes**: Act as mediator if issues arise (currently manual)

---

## Deal Management

### Deal Lifecycle

```
1. Deal Created (Buyer clicks "Make a Deal")
   ↓
2. Pending Status
   ↓
3. Off-platform transaction (UPI payment, delivery arrangement)
   ↓
4. Buyer confirms receipt
   ↓
5. Farmer confirms completion
   ↓
6. Deal Completed (Both confirmed)
   ↓
7. Feedback eligible (optional)
```

### Deal Confirmation Rules

- **Buyer Side**: Can confirm once product is received
- **Farmer Side**: Can confirm once transaction is complete
- **Completion**: Requires BOTH confirmations
- **Feedback**: Only available after completion
- **One-time Action**: Confirmations cannot be undone

### Feedback System

**Who Can Leave Feedback**:
- Only buyers who completed deals
- One feedback per deal
- Cannot edit after submission

**Feedback Components**:
- **Rating**: 1-5 stars
- **Comment**: Written review of experience
- **Timestamp**: When feedback was submitted
- **Public Visibility**: Feedback is associated with farmer profiles

**Best Practices**:
- Be honest and constructive
- Mention product quality, communication, delivery
- Focus on the transaction experience
- Avoid personal attacks

---

## Profile Management

### View Your Profile

**Location**: `/profile`

**Buyer Profile Shows**:
- Name and email
- Total deals completed
- Recent deal history
- Link to all deals

**Farmer Profile Shows**:
- Name and email
- Verification status
- Total products listed
- Total deals completed
- Recent products and deals

### Public Farmer Profiles

**Location**: `/farmer-profile/[id]`

**Visible to All Users**:
- Farmer name
- Verification badge (if verified)
- All farmer's products (available and sold)
- Product grid for easy browsing

**What's NOT Visible**:
- Email address
- Personal information
- UPI ID (only shown in product details to interested buyers)

---

## Best Practices

### For Farmers

1. **Product Listings**:
   - Use clear, high-quality images
   - Compress images to under 500KB
   - Provide accurate crop names
   - Set competitive prices
   - Specify quantity with units (kg, liters, etc.)

2. **UPI Details**:
   - Double-check UPI ID accuracy
   - Keep UPI ID updated
   - Ensure UPI account is active

3. **Product Management**:
   - Update quantities after sales
   - Mark products as sold when unavailable
   - Delete outdated listings
   - Keep product information current

4. **Deal Handling**:
   - Respond to buyers promptly (outside platform)
   - Confirm deals after completion
   - Maintain quality standards
   - Build positive reputation through good service

5. **Getting Verified**:
   - Ensure accurate profile information
   - List genuine products
   - Build transaction history
   - Admin will review and verify

### For Buyers

1. **Browsing**:
   - Use filters to narrow down options
   - Check farmer verification badges
   - Compare prices across listings
   - View farmer profiles for history

2. **Making Deals**:
   - Only create deals for products you intend to buy
   - Contact farmers using provided UPI/details
   - Arrange delivery or pickup directly
   - Confirm deals after receiving products

3. **Payments**:
   - Use UPI details from product page
   - Complete payment outside the platform
   - Keep transaction records
   - Confirm deals only after receiving products

4. **Feedback**:
   - Leave honest feedback after completion
   - Help other buyers make informed decisions
   - Focus on product quality and farmer service
   - Be respectful and constructive

### For Everyone

1. **Security**:
   - Keep login credentials secure
   - Don't share passwords
   - Use strong passwords
   - Log out from shared devices

2. **Communication**:
   - Conduct transactions outside the platform
   - Use provided contact details (UPI, etc.)
   - Be professional and respectful
   - Maintain clear communication

3. **Platform Usage**:
   - Only create accounts for genuine use
   - Don't spam or create duplicate accounts
   - Report issues if they arise
   - Respect platform guidelines

---

## Troubleshooting

### Common Issues and Solutions

#### Cannot Login
- Verify email and password are correct
- Check if you're registered
- Ensure internet connection is stable
- Try resetting password (if feature available)

#### Cannot See Products
- Check internet connection
- Verify Firebase/Firestore is configured
- Ensure you're on the Browse page
- Try refreshing the page

#### Image Upload Fails
- Check file size (must be under 500KB)
- Use supported formats (JPEG, PNG)
- Compress image if too large
- Ensure internet connection is stable

#### Product Not Showing to Buyers
- Check product status (must be "available")
- Verify product was successfully created
- Refresh the browse page
- Ensure product isn't marked as sold

#### Cannot Confirm Deal
- Verify you're logged in
- Check if you're the correct party (buyer/farmer)
- Ensure deal isn't already confirmed by you
- Try refreshing the page

#### Feedback Button Not Showing
- Verify deal is completed (both parties confirmed)
- Check if you haven't already given feedback
- Ensure you're the buyer (only buyers give feedback)
- Refresh the page

#### Admin Page Access Denied
- Verify you're using the admin email
- Admin email must be exactly: `admin@farmtotable.com`
- Ensure you're logged in
- Contact system administrator if you should have access

### Technical Issues

#### Firebase Connection Errors
- Check internet connection
- Verify Firebase configuration in `/lib/firebase.js`
- Ensure Firestore database is enabled
- Check Firebase console for service status

#### Page Not Loading
- Clear browser cache
- Try different browser
- Check internet connection
- Verify URL is correct

#### Session Expired
- Login again
- Session timeout is normal
- Keep credentials saved (securely)

---

## Platform Limitations

### Current Scope

The platform is intentionally minimal and focused. The following are NOT supported:

1. **No In-App Payments**: All payments handled via UPI outside platform
2. **No Messaging System**: Contact farmers using provided details
3. **No Delivery Tracking**: Arrange delivery directly with farmer
4. **No Shopping Cart**: One deal at a time
5. **No Order History**: Deals section shows transaction history
6. **No Refunds/Returns**: Handle directly with farmer
7. **No Advanced Search**: Basic filters only
8. **No Mobile App**: Web-only platform
9. **No Email Notifications**: Check platform regularly
10. **No Identity Verification**: Admin verification is manual

### Design Decisions

These limitations are intentional to:
- Keep platform simple and free
- Avoid legal complexities of payment processing
- Minimize development and maintenance
- Focus on core connection functionality
- Avoid platform liability
- Reduce complexity for users

---

## Contact and Support

For platform issues, technical problems, or general inquiries:
- Contact admin at: `admin@farmtotable.com`
- Platform is community-driven and fee-free
- Support is best-effort based on availability

---

## Summary

**Farm To Table** is a simple, direct connection platform between farmers and buyers. It eliminates intermediaries while keeping the platform minimal, transparent, and free.

**Key Principles**:
- Direct farmer-buyer connection
- No platform fees or commissions
- Off-platform transactions
- Trust through transparency
- Simple, focused functionality

**Success Factors**:
- Farmers: List quality products, maintain accurate info, confirm deals
- Buyers: Browse responsibly, complete transactions, leave feedback
- Admin: Verify farmers, maintain platform integrity
- Everyone: Follow best practices, communicate clearly, use platform ethically

For detailed technical documentation, see other files in the `/docs` folder.
