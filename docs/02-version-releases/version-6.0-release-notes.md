# Farm To Table – Essential Enhancements

This document defines **clear TODOs and Copilot-ready prompts** for three production-readiness improvements:

1. Optional phone number for profiles
2. Product categories for better browsing
3. Terms of Service and Privacy Policy pages

Scope: Keep everything minimal, transparent, and aligned with the platform’s non-transactional philosophy.

---

## 1. Phone Number Field (Optional)

### Goal

Allow buyers and farmers to contact each other directly without relying only on UPI IDs.

---

### TODO

- Add optional phone number field to user profile schema
- Allow farmers to enter phone number during profile setup or edit
- Display phone number on public farmer profile (only if provided)
- Clearly label phone number as optional
- Do NOT make phone number mandatory for login or listing

---

### Data Model Update

- `phoneNumber: string | null`

---

### Copilot Prompt

```
Extend the user profile schema to include an optional phoneNumber field.
Ensure the field is not required during registration.
Allow users to add or edit their phone number from their profile page.
Display the phone number on the public farmer profile only if it exists.
Do not add phone number verification or OTP flows.
```

---

## 2. Product Categories

### Goal

Improve browsing and discovery when listings grow in number.

---

### Category Set (Initial)

- Vegetables
- Fruits
- Grains
- Dairy
- Spices
- Others

Categories should be fixed for now (no custom categories).

---

### TODO

- Add category field to product listing schema
- Make category selection mandatory when adding a product
- Add category dropdown in add/edit product forms
- Display category badge on product cards and detail pages
- Add category filter to browse page

---

### Data Model Update

- `category: string`

---

### Copilot Prompt

```
Add a category field to product listings with predefined options:
Vegetables, Fruits, Grains, Dairy, Spices, Others.
Make category selection mandatory when creating or editing a product.
Display the selected category on product cards and detail pages.
Add a category filter to the browse page without changing existing search behavior.
```

---

## 3. Terms of Service & Privacy Policy

### Goal

Provide legal clarity and increase trust for users interacting on the platform.

---

### Pages to Add

- `/terms`
- `/privacy`

These pages should be static and informational.

---

### TODO

- Create Terms of Service page
- Create Privacy Policy page
- Link both pages in the footer
- Use clear, simple language (non-legal-heavy)
- Explicitly state platform limitations

---

### Terms of Service – Key Points

- Platform only connects buyers and farmers
- No responsibility for payments, quality, or delivery
- Users are responsible for their interactions
- Platform can remove listings if needed

---

### Privacy Policy – Key Points

- What data is collected (email, role, optional phone, listings)
- How data is used (platform functionality only)
- No data selling or advertising
- Firebase used as backend infrastructure

---

### Copilot Prompt (Terms Page)

```
Create a static Terms of Service page.
Use clear and simple language.
State that the platform only connects buyers and farmers.
Clarify that payments, deliveries, and disputes are handled directly by users.
Do not include any payment processing obligations.
```

---

### Copilot Prompt (Privacy Page)

```
Create a static Privacy Policy page.
Clearly explain what user data is collected and why.
State that data is not sold or shared for advertising.
Mention Firebase as the backend service provider.
Keep the tone transparent and non-legalistic.
```

---

## Completion Checklist

- Phone number is optional and visible only when provided
- Categories are required and filterable
- Browse experience improves with category filtering
- Terms and Privacy pages are accessible from footer
- Language across pages matches platform transparency goals

Stop here. Do not add tracking scripts, cookies banners, or analytics.
