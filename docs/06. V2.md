# Farm To Table – Trust Layer 1 & 2

This document defines **strict, minimal TODOs** and **Copilot‑ready prompts** to implement:

- **Layer 1: Farmer Verification (platform‑verified)**
- **Layer 2: Deal Confirmation (buyer + farmer confirmation)**

These layers build trust **without ratings, payments, or moderation overhead**.

Follow phases in order. Do not add features outside scope.

---

## LAYER 1 – FARMER VERIFICATION

### Goal

Allow the platform to mark farmers as verified after basic identity checks.

### Scope (strict)

- Manual verification
- Verified badge on farmer and product
- Clear disclaimer

No document OCR, no automation, no public verification data.

---

## Phase 1: Data Model Update (Verification)

### TODO

- Add `isVerified` boolean to farmer profile
- Default value should be `false`

### Copilot Prompt

```
Update the farmer/user schema to include an `isVerified` boolean field.
Default value must be false.
Do not add timestamps or verification metadata.
Ensure existing users remain backward compatible.
```

---

## Phase 2: Verified Badge UI

### TODO

- Show "Verified farmer" badge on farmer listings
- Show badge only if `isVerified === true`

### Copilot Prompt

```
Add a small "Verified farmer" badge to farmer listings and product cards.
Render the badge only when `isVerified` is true.
Keep the design minimal and consistent with existing UI.
Do not add icons or animations.
```

---

## Phase 3: Verification Disclaimer

### TODO

- Add a tooltip or info text explaining verification
- Add a footer disclaimer

### Copilot Prompt

```
Add a short explanation for the Verified farmer badge.
Text should state that identity has been verified by the platform.
Add a footer disclaimer clarifying that transactions happen directly between buyers and farmers.
Keep language factual and non‑promotional.
```

---

## Phase 4: Admin‑Side Verification Toggle (Minimal)

### TODO

- Add a simple way to mark farmer as verified
- Restrict action to admin only

### Copilot Prompt

```
Create a minimal admin-only action to toggle `isVerified` for a farmer profile.
Do not create a full admin dashboard.
This can be a protected route or temporary UI control.
Ensure normal users cannot access this action.
```

---

## LAYER 2 – DEAL CONFIRMATION

### Goal

Ensure feedback eligibility only after both buyer and farmer confirm a deal occurred.

### Scope (strict)

- Buyer confirms deal
- Farmer confirms deal
- No payments, no delivery tracking

---

## Phase 5: Deal Record Model

### TODO

- Create a deal/transaction record
- Store buyer ID, farmer ID, product ID
- Track confirmation status

### Copilot Prompt

```
Create a deal record model that stores buyer ID, farmer ID, and product ID.
Include two boolean fields: `buyerConfirmed` and `farmerConfirmed`.
Default both values to false.
Do not add payment or delivery fields.
```

---

## Phase 6: Buyer Deal Confirmation

### TODO

- Allow buyer to mark "Deal completed"
- Only after contacting farmer

### Copilot Prompt

```
Add a buyer action to mark a deal as completed.
This should update `buyerConfirmed` to true for the relevant deal record.
Ensure a buyer can confirm only once per deal.
Do not expose this action publicly.
```

---

## Phase 7: Farmer Deal Confirmation

### TODO

- Allow farmer to confirm delivery
- Visible only for their own products

### Copilot Prompt

```
Add a farmer action to confirm a completed deal.
This should update `farmerConfirmed` to true.
Ensure farmers can confirm only deals related to their own products.
Do not add notifications or messaging.
```

---

## Phase 8: Confirmation Status Logic

### TODO

- Mark deal as completed only when both confirm
- Prepare for future feedback unlock

### Copilot Prompt

```
Implement logic to mark a deal as fully completed only when both buyerConfirmed and farmerConfirmed are true.
Expose a derived status like `completed` without adding a new database field.
This logic will later be used to unlock feedback.
```

---

## Completion Checklist

- Farmers can be manually verified
- Verified badge appears consistently
- Buyers and farmers can confirm deals
- No ratings or feedback yet
- No payment or delivery logic added

Stop here. Do not implement reviews until this system is stable.
