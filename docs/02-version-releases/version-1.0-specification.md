# Farm To Table – Option 2 & 3

This document contains **task-based TODOs** and **Copilot-ready prompts** for:

- **Option 2: Farmer Control Upgrade**
- **Option 3: Portfolio & Demo Preparation**

Follow the phases in order. Do not skip steps.

---

## OPTION 2 – FARMER CONTROL UPGRADE

### Goal

Give farmers basic control over their listings after posting, without adding complexity.

### Scope (strict)

- Edit listing
- Mark as sold / unavailable
- Delete listing

No analytics, no approval flow, no notifications.

---

## Phase 1: Data Model Update

### TODO

- Add `status` field to product model (`available | sold`)
- Ensure only the listing owner can modify their product

### Copilot Prompt

```
Update the existing product schema to include a status field with values `available` and `sold`.
Default status should be `available`.
Ensure existing listings remain backward compatible.
Do not introduce new fields beyond status.
```

---

## Phase 2: Farmer Listings Page

### TODO

- Create a page where a logged-in farmer sees only their listings
- Display product name, price, status

### Copilot Prompt

```
Create a farmer dashboard page that lists only the products created by the logged-in farmer.
Show product name, price, and status.
Do not add charts or analytics.
Keep the layout minimal and consistent with existing UI.
```

---

## Phase 3: Edit Listing

### TODO

- Allow farmer to edit price, quantity, and description
- Pre-fill form with existing data

### Copilot Prompt

```
Add an edit listing feature for farmers.
Allow editing price, quantity, and description only.
Pre-fill the form with existing product data.
Ensure only the owner can access this edit action.
Do not change routing structure unnecessarily.
```

---

## Phase 4: Mark as Sold / Available

### TODO

- Toggle product status
- Hide sold products from buyer listings

### Copilot Prompt

```
Add a toggle action that allows farmers to mark a product as sold or available.
Sold products should not appear in buyer-facing listings.
Do not delete sold products from the database.
```

---

## Phase 5: Delete Listing

### TODO

- Allow permanent deletion
- Add a simple confirmation

### Copilot Prompt

```
Add a delete listing action for farmers.
Require a simple confirmation before deletion.
Ensure only the listing owner can delete the product.
Do not add undo or trash functionality.
```

---

## OPTION 3 – PORTFOLIO & DEMO PREPARATION

### Goal

Make the project easy to understand, demo, and explain in interviews.

---

## Phase 6: README Refinement

### TODO

- Add problem statement
- Add solution overview
- Add feature list
- Add limitations section

### Copilot Prompt

```
Refine the README.md to clearly explain:
1. The problem Farm To Table solves
2. How the solution works
3. Key features
4. Current limitations
Keep language simple and honest.
Do not exaggerate scale or impact.
```

---

## Phase 7: Screenshots & Demo Flow

### TODO

- Capture 5–6 screenshots
- Define demo flow

### Copilot Prompt

```
Add a section to the README describing a demo flow.
Explain step-by-step how to demo the application in under 3 minutes.
Reference screenshots without embedding large images.
```

---

## Phase 8: Project Story (for interviews)

### TODO

- Add a short "Why I built this" section
- Add design decisions

### Copilot Prompt

```
Add a section explaining why Farm To Table was built and key design decisions.
Focus on simplicity, trust, and removing middlemen.
Avoid buzzwords and marketing language.
```

---

## Completion Checklist

- Farmers can fully manage their listings
- Buyers never see sold products
- README clearly explains intent and scope
- Project is demo-ready

Stop after this. Do not add new features without user feedback.
