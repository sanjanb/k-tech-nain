# Farm To Table – Accessibility & Reach Enhancements

This document defines **TODOs and Copilot-ready prompts** for improving usability, accessibility, and reach of the platform.

Scope:

- Mobile-first usability polish
- Full keyboard accessibility
- Basic multi-language support for regional users

All changes should remain lightweight and avoid over-engineering.

---

## 1. Mobile Responsiveness Check

### Goal

Ensure the entire platform works smoothly on mobile devices, as many farmers and buyers will primarily use phones.

---

### TODO

- Review all pages on mobile screen sizes (360px–768px)
- Ensure buttons and links meet minimum touch target size
- Ensure forms are easy to use on mobile keyboards
- Verify navigation menu works reliably on touch
- Ensure modals and dropdowns are scrollable on small screens

---

### UI Guidelines

- Minimum touch target: ~44px height
- Avoid hover-only interactions
- Ensure text is readable without zooming

---

### Copilot Prompt

```
Audit all pages for mobile responsiveness.
Ensure buttons, links, and form inputs are touch-friendly.
Adjust spacing, font sizes, and layouts to prevent accidental taps.
Remove any hover-dependent interactions.
Ensure navigation and forms work smoothly on mobile devices.
```

---

## 2. Keyboard Navigation & Accessibility

### Goal

Allow full platform usage without a mouse, improving accessibility and overall UX quality.

---

### TODO

- Ensure all interactive elements are reachable via Tab key
- Add visible focus states for buttons, links, and inputs
- Ensure logical tab order across pages
- Allow form submission using Enter key
- Ensure modals can be closed via keyboard

---

### Accessibility Guidelines

- Do not remove default focus outlines unless replaced
- Ensure focus indicators are clearly visible
- Avoid keyboard traps

---

### Copilot Prompt

```
Ensure all interactive elements are accessible via keyboard navigation.
Add visible focus styles for buttons, links, and inputs.
Verify logical tab order across pages.
Ensure forms can be submitted using the Enter key.
Avoid keyboard traps and ensure modals can be closed via keyboard.
```

---

## 3. Language Support (Multi-language)

### Goal

Make the platform usable for regional farmers by supporting multiple Indian languages.

---

### Initial Languages

- English (default)
- Hindi
- Tamil
- Telugu

Language support should be extendable later.

---

### TODO

- Introduce a language selector (dropdown)
- Store selected language in local storage
- Externalize all user-facing text into language files
- Provide translations for key UI text
- Default to English if translation is missing

---

### Implementation Notes

- No auto-translation
- No language detection by IP
- Manual, static translations only

---

### Copilot Prompt

```
Implement basic multi-language support with English as default.
Add a language selector allowing users to switch languages manually.
Externalize all user-facing text into language configuration files.
Provide translations for Hindi, Tamil, and Telugu for core UI text.
Persist the selected language using local storage.
Fallback to English if a translation is missing.
```

---

## Completion Checklist

- All pages usable on mobile without layout issues
- Buttons and inputs are touch-friendly
- Full keyboard navigation works across the site
- Visible focus indicators are present
- Language selector works and persists selection
- Core UI text is translated and readable

Stop here. Do not add analytics, auto-translation APIs, or heavy accessibility frameworks.
