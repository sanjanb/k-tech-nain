# Farm To Table – User Profile Page

This document contains **task-based TODOs** and **Copilot-ready prompts** for adding a minimal, functional profile page for all users.

Scope: Private profiles only, minimal UI, supports both farmers and buyers.

---

## Phase 1: Profile Page Data Model

### TODO

- Ensure each user has a profile object storing:

  - Name
  - Role (Farmer / Buyer)
  - Email / phone
  - isVerified (for farmers)

- Link user authentication to profile access

### Copilot Prompt

```
Ensure each user has a profile object with fields: name, role (farmer/buyer), contact (email/phone), and isVerified (boolean).
Link this profile to the user authentication system so that only logged-in users can access their own profile.
Do not create public profiles or add extra fields.
```

---

## Phase 2: Profile Icon in Header

### TODO

- Add a profile avatar icon in the top-right header
- Clicking opens a dropdown with:

  - Profile link
  - Logout button

- Keep icon simple, no photos required

### Copilot Prompt

```
Add a profile avatar icon in the top-right corner of the header.
Clicking the icon should open a dropdown with two options: Profile and Logout.
Do not add photos, settings, or extra links.
```

---

## Phase 3: Farmer Profile Sections

### TODO

- Display:

  - Name
  - Verification status (badge: Verified / Not Verified)
  - Quick link to their listings
  - Deals summary (count of completed / pending deals)

- No bio, photos, or social links

### Copilot Prompt

```
Create the farmer profile page displaying the following:
- Name
- Verified badge based on isVerified field
- Link to farmer's listings
- Count of completed and pending deals
Keep layout minimal and mobile-first.
Do not add bio, photos, or social links.
```

---

## Phase 4: Buyer Profile Sections

### TODO

- Display:

  - Name
  - Deals summary (count of completed / pending deals)

- No verification badge
- No listings section

### Copilot Prompt

```
Create the buyer profile page displaying:
- Name
- Count of completed and pending deals
Keep layout minimal and mobile-first.
Do not show verification badge, listings, or social elements.
```

---

## Phase 5: Access Control

### TODO

- Only allow a user to see their own profile
- Restrict URL access to other users' profiles
- Redirect unauthenticated users to login page

### Copilot Prompt

```
Implement access control for the profile page:
- Only the logged-in user can access their profile
- Any attempt to access another user's profile should be blocked or redirected
- Unauthenticated users should be redirected to the login page
Do not implement public profiles.
```

---

## Phase 6: Navigation & Routing

### TODO

- Route profile link from header dropdown to profile page
- Ensure back button and browser navigation work correctly

### Copilot Prompt

```
Link the Profile option in the header dropdown to the user's profile page using standard routing.
Ensure navigation works with back/forward browser actions.
Do not add modals or overlay routes.
```

---

## Phase 7: UI Consistency Pass

### TODO

- Match spacing, typography, and colors with existing site theme
- Keep design responsive and minimal

### Copilot Prompt

```
Review the profile page UI for spacing, typography, and colors.
Ensure it matches the existing theme and is mobile-responsive.
Do not add animations or extra components.
```

---

## Completion Checklist

- Profile icon in header with dropdown exists
- Logged-in users see their own profile only
- Farmer profile shows verification, listings link, deal summary
- Buyer profile shows deal summary only
- Navigation and routing work correctly
- UI is consistent and mobile-friendly

Stop here. Do not add public profiles, social features, or messaging.
