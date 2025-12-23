# V11 Kannada Language Implementation Guide

**Version**: 11.0  
**Feature**: Kannada Language Support (ಕನ್ನಡ)  
**Status**: Production Ready

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Implementation Details](#implementation-details)
4. [Testing Guide](#testing-guide)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Overview

This guide provides technical implementation details for the Kannada language support feature introduced in Version 11.0.

### Goals

- Enable bilingual support (English/Kannada)
- Provide email notifications in user's preferred language
- Create infrastructure for future UI translation
- Maintain backward compatibility

### Key Components

1. **Language Utilities** (`lib/i18n.js`)
2. **Translation Files** (`locales/en.json`, `locales/kn.json`)
3. **Translation Hook** (`lib/useTranslation.js`)
4. **Email Templates** (`lib/notificationTemplatesKannada.js`)
5. **Profile Management** (`app/profile/page.jsx`)

---

## Architecture

### System Design

```
┌─────────────────────────────────────────────────────────┐
│                    User Profile                          │
│                 { language: 'kn' }                       │
└───────────────────┬─────────────────────────────────────┘
                    │
                    ├─────────────────┬──────────────────┐
                    │                 │                  │
                    ▼                 ▼                  ▼
            ┌──────────────┐  ┌─────────────┐  ┌──────────────┐
            │ Email System │  │ UI Components│  │   Utilities  │
            └──────┬───────┘  └──────┬──────┘  └──────┬───────┘
                   │                 │                 │
                   ▼                 ▼                 ▼
        ┌──────────────────┐ ┌──────────────┐ ┌──────────────┐
        │ Kannada Template │ │ Translation  │ │ getUserLanguage│
        │ English Template │ │     Hook     │ │ isValidLanguage│
        └──────────────────┘ └──────────────┘ └──────────────┘
```

### Data Flow

```
User selects language → Saved to Firestore
                         ↓
              ┌──────────────────────┐
              │ User Document Update │
              │ { language: 'kn' }   │
              └──────────┬───────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌────────────────┐            ┌──────────────────┐
│ Email Service  │            │ UI Components    │
│ reads language │            │ read language    │
└────────┬───────┘            └────────┬─────────┘
         │                              │
         ▼                              ▼
┌─────────────────┐          ┌──────────────────┐
│ Select Kannada  │          │ Load kn.json     │
│ email template  │          │ translations     │
└─────────────────┘          └──────────────────┘
```

---

## Implementation Details

### 1. Language Utilities (`lib/i18n.js`)

**Purpose**: Centralized language management and validation

**Constants**:

```javascript
export const SUPPORTED_LANGUAGES = {
  EN: "en",
  KN: "kn",
};

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.EN;
```

**Key Functions**:

#### `isValidLanguage(language)`

Validates if a language code is supported.

```javascript
export const isValidLanguage = (language) => {
  return Object.values(SUPPORTED_LANGUAGES).includes(language);
};
```

**Usage**:

```javascript
isValidLanguage("kn"); // true
isValidLanguage("hi"); // false
```

#### `getUserLanguage(user)`

Safely retrieves user's language with fallback.

```javascript
export const getUserLanguage = (user) => {
  if (!user?.language) {
    return DEFAULT_LANGUAGE;
  }
  return isValidLanguage(user.language) ? user.language : DEFAULT_LANGUAGE;
};
```

**Usage**:

```javascript
const userDoc = await getDoc(doc(db, "users", userId));
const language = getUserLanguage(userDoc.data());
// Returns: 'en' or 'kn' (never invalid)
```

#### `getBrowserLanguage()`

Detects browser language (for future auto-detection).

```javascript
export const getBrowserLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const browserLang = navigator.language?.split("-")[0];
  return isValidLanguage(browserLang) ? browserLang : DEFAULT_LANGUAGE;
};
```

---

### 2. Translation Files

**Structure**:

```
locales/
├── en.json     # English translations
└── kn.json     # Kannada translations
```

**Schema**:

```json
{
  "common": {
    "loading": "string",
    "save": "string",
    "cancel": "string"
  },
  "auth": { ... },
  "profile": { ... },
  "deals": { ... },
  "products": { ... },
  "notifications": { ... },
  "payment": { ... },
  "errors": { ... }
}
```

**Example** (`locales/kn.json`):

```json
{
  "deals": {
    "confirmDeal": "ಒಪ್ಪಂದವನ್ನು ದೃಢೀಕರಿಸಿ",
    "completeDeal": "ಒಪ್ಪಂದವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ",
    "dealConfirmed": "ಒಪ್ಪಂದವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ!",
    "dealCompleted": "ಒಪ್ಪಂದವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಲಾಗಿದೆ!"
  }
}
```

**Adding New Translations**:

1. Update both `en.json` and `kn.json`
2. Maintain same key structure
3. Ensure nested keys match exactly
4. Test with translation hook

---

### 3. Translation Hook (`lib/useTranslation.js`)

**Purpose**: React hook for component translations

**Main Function**:

```javascript
export const useTranslation = (userData) => {
  const language = userData?.language || SUPPORTED_LANGUAGES.EN;

  return (key, params = {}) => {
    // Load appropriate translation file
    const translations =
      language === SUPPORTED_LANGUAGES.KN ? kannada : english;

    // Navigate nested keys (e.g., 'deals.confirmDeal')
    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      value = value?.[k];
      if (!value) return key; // Fallback to key if not found
    }

    // String interpolation (future feature)
    // Replace {param} with actual values
    return value;
  };
};
```

**Usage in Components**:

```javascript
import { useTranslation } from "@/lib/useTranslation";

export default function MyComponent() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      setUserData(userDoc.data());
    };
    fetchUser();
  }, []);

  const t = useTranslation(userData);

  return (
    <div>
      <h1>{t("profile.editProfile")}</h1>
      <button>{t("common.save")}</button>
    </div>
  );
}
```

**Non-React Usage**:

```javascript
import { getTranslationFunction } from "@/lib/useTranslation";

// In a utility function or server-side code
const t = getTranslationFunction("kn");
const message = t("deals.confirmDeal");
// Returns: "ಒಪ್ಪಂದವನ್ನು ದೃಢೀಕರಿಸಿ"
```

---

### 4. Email Templates

**Files**:

- `lib/notificationTemplates.js` - English templates + language detection
- `lib/notificationTemplatesKannada.js` - Kannada templates

**Language Detection** (`lib/notificationTemplates.js`):

```javascript
import { getUserLanguage, SUPPORTED_LANGUAGES } from "./i18n";
import {
  getEmailSubjectKannada,
  getEmailBodyPlainTextKannada,
  getEmailBodyHTMLKannada,
} from "./notificationTemplatesKannada";

export function prepareEmailData(recipient, eventType, deal, product) {
  const language = getUserLanguage(recipient);
  const isKannada = language === SUPPORTED_LANGUAGES.KN;

  const subject = isKannada
    ? getEmailSubjectKannada(eventType, recipient.role)
    : getEmailSubject(eventType, recipient.role);

  const bodyPlain = isKannada
    ? getEmailBodyPlainTextKannada(eventType, recipient, deal, product)
    : getEmailBodyPlainText(eventType, recipient, deal, product);

  const bodyHTML = isKannada
    ? getEmailBodyHTMLKannada(eventType, recipient, deal, product)
    : getEmailBodyHTML(eventType, recipient, deal, product);

  return {
    to: recipient.email,
    subject,
    bodyPlain,
    bodyHTML,
    language, // Include for logging
  };
}
```

**Kannada Template Structure** (`lib/notificationTemplatesKannada.js`):

```javascript
export function getEmailSubjectKannada(eventType, recipientRole) {
  const subjects = {
    DEAL_CONFIRMED: {
      farmer: "ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ - ಖರೀದಿದಾರ ಮುಂದುವರಿಯಲು ಸಿದ್ಧರಾಗಿದ್ದಾರೆ",
      buyer: "ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ - ರೈತರ ಪಾವತಿ ವಿವರಗಳು",
    },
    DEAL_COMPLETED: {
      farmer: "ಒಪ್ಪಂದ ಪೂರ್ಣಗೊಂಡಿದೆ - ವಹಿವಾಟು ಮುಗಿದಿದೆ",
      buyer: "ಒಪ್ಪಂದ ಪೂರ್ಣಗೊಂಡಿದೆ - ಧನ್ಯವಾದಗಳು",
    },
  };

  return subjects[eventType]?.[recipientRole] || "ಅಧಿಸೂಚನೆ";
}
```

**HTML Email with Kannada Font**:

```javascript
export function getEmailBodyHTMLKannada(eventType, recipient, deal, product) {
  return `
    <!DOCTYPE html>
    <html lang="kn">
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Noto Sans Kannada', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>ನಮಸ್ಕಾರ ${recipient.name}!</h1>
      <p>ನಿಮ್ಮ ಉತ್ಪನ್ನಕ್ಕಾಗಿ ಹೊಸ ಒಪ್ಪಂದವನ್ನು ದೃಢೀಕರಿಸಲಾಗಿದೆ.</p>
      <!-- More content -->
    </body>
    </html>
  `;
}
```

---

### 5. Profile Management

**File**: `app/profile/page.jsx`

**State Management**:

```javascript
const [editLanguage, setEditLanguage] = useState("en");

useEffect(() => {
  if (userData?.language) {
    setEditLanguage(userData.language);
  }
}, [userData]);
```

**Save Function**:

```javascript
const handleSavePhone = async () => {
  try {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      phoneNumber: editPhoneNumber,
      language: editLanguage, // Save language preference
    });

    setUserData({
      ...userData,
      phoneNumber: editPhoneNumber,
      language: editLanguage,
    });

    setEditMode(false);
    setEditPhoneNumber("");
    alert("Contact info updated!");
  } catch (error) {
    console.error("Error updating phone:", error);
    alert("Failed to update contact info");
  }
};
```

**UI Integration** (future enhancement):

```javascript
<div className="mb-4">
  <label className="block text-sm font-semibold mb-1">Language / ಭಾಷೆ</label>
  <select
    value={editLanguage}
    onChange={(e) => setEditLanguage(e.target.value)}
    className="w-full px-3 py-2 border rounded"
  >
    <option value="en">English</option>
    <option value="kn">ಕನ್ನಡ (Kannada)</option>
  </select>
</div>
```

---

## Testing Guide

### Unit Tests

**Test Language Validation**:

```javascript
import { isValidLanguage, getUserLanguage } from "@/lib/i18n";

test("validates supported languages", () => {
  expect(isValidLanguage("en")).toBe(true);
  expect(isValidLanguage("kn")).toBe(true);
  expect(isValidLanguage("hi")).toBe(false);
});

test("gets user language with fallback", () => {
  expect(getUserLanguage({ language: "kn" })).toBe("kn");
  expect(getUserLanguage({ language: "invalid" })).toBe("en");
  expect(getUserLanguage({})).toBe("en");
  expect(getUserLanguage(null)).toBe("en");
});
```

**Test Translation Hook**:

```javascript
import { getTranslationFunction } from "@/lib/useTranslation";

test("translates English correctly", () => {
  const t = getTranslationFunction("en");
  expect(t("common.save")).toBe("Save");
  expect(t("deals.confirmDeal")).toBe("Confirm Deal");
});

test("translates Kannada correctly", () => {
  const t = getTranslationFunction("kn");
  expect(t("common.save")).toBe("ಉಳಿಸಿ");
  expect(t("deals.confirmDeal")).toBe("ಒಪ್ಪಂದವನ್ನು ದೃಢೀಕರಿಸಿ");
});

test("returns key when translation not found", () => {
  const t = getTranslationFunction("en");
  expect(t("nonexistent.key")).toBe("nonexistent.key");
});
```

### Integration Tests

**Test Email Template Selection**:

```javascript
import { prepareEmailData } from "@/lib/notificationTemplates";

test("selects Kannada template for Kannada user", () => {
  const recipient = {
    email: "farmer@example.com",
    name: "ರಾಜು",
    role: "farmer",
    language: "kn",
  };

  const emailData = prepareEmailData(
    recipient,
    "DEAL_CONFIRMED",
    mockDeal,
    mockProduct
  );

  expect(emailData.language).toBe("kn");
  expect(emailData.subject).toContain("ದೃಢೀಕರಿಸಲಾಗಿದೆ");
});

test("selects English template for English user", () => {
  const recipient = {
    email: "farmer@example.com",
    name: "John",
    role: "farmer",
    language: "en",
  };

  const emailData = prepareEmailData(
    recipient,
    "DEAL_CONFIRMED",
    mockDeal,
    mockProduct
  );

  expect(emailData.language).toBe("en");
  expect(emailData.subject).toContain("Confirmed");
});
```

### Manual Testing

**Test Email Rendering**:

1. **Gmail**: Send test Kannada email to Gmail

   - Verify font renders correctly
   - Check mobile rendering (Gmail app)
   - Test dark mode

2. **Outlook**: Send to Outlook.com

   - Verify Noto Sans Kannada loads
   - Check desktop client (Outlook 2019+)
   - Test webmail interface

3. **Apple Mail**: Send to iCloud email
   - Verify macOS Mail.app rendering
   - Check iOS Mail app
   - Test iPad interface

**Test Profile Updates**:

1. Login as test user
2. Go to Profile page
3. Click "Edit Contact Info"
4. Change language to Kannada
5. Save and verify:
   - Firestore document updated
   - Language persists after refresh
   - Subsequent emails use Kannada

---

## Deployment

### Pre-Deployment Checklist

- [ ] Translation files reviewed by native speakers
- [ ] Email templates tested in major clients
- [ ] Build successful (`npm run build`)
- [ ] No console errors in development
- [ ] Profile page saves language correctly
- [ ] Firestore security rules allow language field
- [ ] Email service has access to Kannada templates

### Deployment Steps

1. **Deploy Code**:

```bash
npm run build
# Deploy to hosting (Vercel, Firebase, etc.)
```

2. **Verify Firestore Rules**:

```javascript
// Ensure users can update their language
match /users/{userId} {
  allow update: if request.auth.uid == userId
    && request.resource.data.language is string;
}
```

3. **Test in Production**:
   - Create test account
   - Set language to Kannada
   - Trigger notification (confirm deal)
   - Verify email received in Kannada

### Rollback Plan

If issues arise:

1. **UI Rollback**: Remove language selector from profile
2. **Email Rollback**: Force English templates:

```javascript
// Temporary fix in lib/notificationTemplates.js
const isKannada = false; // Force English
```

3. **Database**: No migration needed (language field optional)

---

## Troubleshooting

### Email Not in Kannada

**Symptoms**: User set language to Kannada but receives English emails

**Diagnosis**:

1. Check user document in Firestore:

```javascript
const userDoc = await getDoc(doc(db, "users", userId));
console.log(userDoc.data().language); // Should be 'kn'
```

2. Check email service logs:

```javascript
console.log("Email language:", emailData.language);
```

**Solutions**:

- Verify language saved correctly in Firestore
- Ensure prepareEmailData receives updated user object
- Check Kannada templates imported correctly

### Kannada Text Not Rendering

**Symptoms**: Kannada appears as boxes (□) or question marks (?)

**Diagnosis**:

- HTML email missing font link
- Email client blocking external fonts
- Wrong character encoding

**Solutions**:

1. Verify HTML includes font:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;700&display=swap"
  rel="stylesheet"
/>
```

2. Ensure charset declared:

```html
<meta charset="UTF-8" />
```

3. Provide fallback in CSS:

```css
font-family: "Noto Sans Kannada", Arial, sans-serif;
```

### Translation Key Not Found

**Symptoms**: UI shows key name instead of translation (e.g., "deals.confirmDeal")

**Diagnosis**:

- Key missing in translation file
- Typo in key name
- Translation file not loaded

**Solutions**:

1. Verify key exists in both files:

```javascript
// Check locales/kn.json
{
  "deals": {
    "confirmDeal": "..." // Must exist
  }
}
```

2. Check import path:

```javascript
import kannada from "@/locales/kn.json";
```

3. Add fallback handling:

```javascript
return value || key; // Return key if translation missing
```

### Language Not Persisting

**Symptoms**: Language resets to English after page refresh

**Diagnosis**:

- Language not saved to Firestore
- userData not reloaded after save
- Cache issue

**Solutions**:

1. Verify save operation:

```javascript
await updateDoc(doc(db, "users", user.uid), {
  language: editLanguage,
});
console.log("Saved language:", editLanguage);
```

2. Reload user data:

```javascript
const updatedDoc = await getDoc(doc(db, "users", user.uid));
setUserData(updatedDoc.data());
```

---

## Best Practices

### Translation Quality

1. **Use Professional Translations**: Don't rely solely on auto-translate
2. **Native Speaker Review**: Have Kannada speakers review all translations
3. **Cultural Appropriateness**: Ensure tone matches business context
4. **Consistency**: Use same terms throughout (e.g., "ಒಪ್ಪಂದ" for "deal")

### Code Quality

1. **Always Use Utilities**: Never hardcode language checks

```javascript
// ✓ Good
const language = getUserLanguage(user);

// ✗ Bad
const language = user.language || "en";
```

2. **Fail Gracefully**: Always provide English fallback

```javascript
const text = t("some.key") || "Default English text";
```

3. **Test Edge Cases**: null, undefined, invalid language codes

### Performance

1. **Lazy Load Translations**: Only load needed language
2. **Cache Translation Functions**: Don't recreate on every render
3. **Minimize Bundle Size**: Tree-shake unused translations

---

## Future Enhancements

### Short-Term (V11.1)

- Integrate translation hook in all components
- Add language auto-detection from browser
- Translate more UI elements

### Medium-Term (V11.2)

- Add Hindi, Tamil, Telugu support
- User-contributed translations
- Translation management dashboard

### Long-Term (V12.0)

- RTL language support
- Professional translation service integration
- Crowdsourced translation platform

---

## Additional Resources

- [Kannada Unicode Reference](https://unicode.org/charts/PDF/U0C80.pdf)
- [Noto Sans Kannada Font](https://fonts.google.com/noto/specimen/Noto+Sans+Kannada)
- [React i18n Best Practices](https://react.i18next.com/)
- [Email HTML Kannada Support](https://litmus.com/blog/the-ultimate-guide-to-using-web-fonts-in-email)

---

**Last Updated**: December 23, 2025  
**Version**: 11.0  
**Author**: Farm To Table Engineering Team
