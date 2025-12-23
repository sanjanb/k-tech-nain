# Optional QR Code Payment for Farmers

## AI IMPLEMENTATION PROMPT

You are working on a farmer-to-buyer marketplace (see repository context).
Implement an **optional QR-based payment feature** for farmers.

Farmers may choose to add UPI payment details (UPI ID and/or QR code image).
This must be completely optional and must NOT block farmer onboarding,
product listing, or buyer checkout.

The platform does not process or verify payments.
Payments are made directly from buyer to farmer.

Ensure clean data modeling, conditional UI rendering,
clear user messaging, and no added platform liability.

---

## TODO

### Backend

- [ ] Extend Farmer model with optional fields:
  - `upi_id` (nullable string)
  - `qr_code_url` (nullable string)
- [ ] Validate UPI ID format before saving
- [ ] Allow QR image upload (png/jpg/jpeg only)
- [ ] Store QR images in cloud storage and save URL reference
- [ ] Ensure existing farmers are unaffected by schema changes
- [ ] Do not add payment status, transactions, or order linkage

---

### Farmer UI

- [ ] Add section: **Payment Details (Optional)** in Farmer Profile
- [ ] Do NOT include this in mandatory onboarding flow
- [ ] Add toggle or checkbox: “Enable QR Payment”
- [ ] Show inputs only when enabled:
  - [ ] UPI ID input field
  - [ ] QR image upload field
- [ ] Display helper text explaining QR usage
- [ ] Display disclaimer: platform does not handle payments

---

### Buyer UI

- [ ] Check if farmer has UPI ID or QR code
- [ ] Show “Pay via QR” option only when data exists
- [ ] Display:
  - [ ] QR image
  - [ ] UPI ID (copyable)
  - [ ] Farmer name below QR
- [ ] Show disclaimer: payment goes directly to farmer

---

### UX & Safety

- [ ] Never block checkout if QR payment is missing
- [ ] Avoid language that implies platform-managed payment
- [ ] Clearly indicate direct buyer-to-farmer payment
- [ ] Handle missing or broken QR images gracefully

---

### Testing

- [ ] Farmer saves profile without payment info
- [ ] Farmer adds and later removes QR payment
- [ ] Invalid UPI ID is rejected with message
- [ ] Buyer views farmer with and without QR
- [ ] Checkout flow works in all cases

---

## Definition of Done

- QR payment is fully optional
- No onboarding or checkout regression
- No payment liability introduced
- Feature works end-to-end without special configuration
