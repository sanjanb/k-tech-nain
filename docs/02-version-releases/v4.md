Perfect. Since you’ve already laid the groundwork with **Layer 1 (verification)** and **Layer 2 (deal confirmation)**, adding a **feedback system** now is safe and meaningful. Let’s plan it **carefully** to keep it minimal and honest.

Here’s a structured plan with **TODOs + Copilot-ready prompts in MD format**.

---

# Farm To Table – Post-Deal Feedback & Ratings

This document defines **strict, minimal tasks** and Copilot prompts for adding a **post-deal feedback system**, after Layer 1 & 2 are implemented.

Scope: Only unlocked after **both buyer and farmer confirm a deal**. No public social profiles, no gamification.

---

## Phase 1: Feedback Model

### TODO

* Create a feedback record linked to a completed deal
* Store:

  * Deal ID
  * Author (buyer or farmer)
  * Recipient (farmer or buyer)
  * Rating (1–5 stars)
  * Optional text comment (max 200 chars)
* Only allow one feedback per completed deal per user

### Copilot Prompt

```
Create a Feedback model linked to a completed deal.
Fields: dealId, authorId, recipientId, rating (1–5), comment (optional, max 200 chars).
Ensure only one feedback per user per deal.
Do not add timestamps or social features.
```

---

## Phase 2: Feedback Unlock Logic

### TODO

* Only allow feedback creation if `buyerConfirmed` and `farmerConfirmed` are true
* Block feedback otherwise

### Copilot Prompt

```
Implement logic to allow feedback submission only if both buyerConfirmed and farmerConfirmed are true for the deal.
Block submission otherwise.
Do not allow editing of feedback after submission.
```

---

## Phase 3: Feedback Submission UI

### TODO

* Minimal form:

  * Star rating (1–5)
  * Optional comment (text area, max 200 chars)
  * Submit button
* Keep layout consistent with existing site
* Only show form to the relevant user (buyer or farmer)

### Copilot Prompt

```
Create a feedback submission form for completed deals.
Fields: star rating (1–5) and optional comment (max 200 chars).
Form should appear only for the deal's buyer or farmer.
Keep styling minimal and consistent with existing UI.
```

---

## Phase 4: Feedback Display

### TODO

* Display recipient’s feedback on their profile:

  * Average rating
  * List of comments (optional)
* Only show feedback to authenticated users
* Do not display other users’ feedback publicly yet

### Copilot Prompt

```
On the recipient's profile, show feedback received:
- Average rating
- List of comments (optional)
Display only to authenticated users.
Do not make feedback public or show to others.
```

---

## Phase 5: Ratings Aggregation

### TODO

* Calculate and display average rating for each user (farmer or buyer)
* Update dynamically after each new feedback

### Copilot Prompt

```
Implement average rating calculation for each user based on all submitted feedback.
Update average rating automatically when a new feedback is submitted.
Do not display public leaderboards or rankings.
```

---

## Phase 6: Access Control

### TODO

* Only the author and recipient can see/edit feedback
* Prevent tampering with other users’ feedback

### Copilot Prompt

```
Ensure feedback access control:
- Only the feedback author or the recipient can view their feedback.
- Prevent editing or deletion by other users.
Do not implement public display yet.
```

---

## Phase 7: UI/UX Consistency

### TODO

* Match spacing, typography, colors with site theme
* Ensure mobile responsiveness
* Keep minimal and non-distracting

### Copilot Prompt

```
Review feedback UI for spacing, typography, and color.
Ensure it is consistent with existing site theme and fully responsive.
Do not add animations or social gamification.
```

---

## Completion Checklist

* Feedback can only be submitted after both confirmations
* Only one feedback per deal per user
* Displayed on recipient profile privately
* Average rating calculated and shown
* UI consistent and minimal
* Access control enforced

