/**
 * Internationalization (i18n) utilities
 * Supports English (en) and Kannada (kn)
 */

// Supported languages
export const SUPPORTED_LANGUAGES = {
  EN: "en",
  KN: "kn",
};

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.EN;

// Language metadata
export const LANGUAGE_INFO = {
  [SUPPORTED_LANGUAGES.EN]: {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  [SUPPORTED_LANGUAGES.KN]: {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
  },
};

/**
 * Validate if a language code is supported
 * @param {string} language - Language code to validate
 * @returns {boolean}
 */
export function isValidLanguage(language) {
  return Object.values(SUPPORTED_LANGUAGES).includes(language);
}

/**
 * Get language with fallback to default
 * @param {string} language - User's preferred language
 * @returns {string} - Valid language code
 */
export function getValidLanguage(language) {
  return isValidLanguage(language) ? language : DEFAULT_LANGUAGE;
}

/**
 * Get user's language preference from user data
 * @param {object} userData - User document from Firestore
 * @returns {string} - Language code
 */
export function getUserLanguage(userData) {
  return getValidLanguage(userData?.language);
}

/**
 * Get browser language preference
 * @returns {string} - Language code
 */
export function getBrowserLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split("-")[0]; // 'en-US' -> 'en'

  return getValidLanguage(langCode);
}
