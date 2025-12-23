/**
 * Translation Hook for React Components
 * Provides translation function based on user's language preference
 */

import { useState, useEffect } from 'react';
import { getUserLanguage, SUPPORTED_LANGUAGES } from './i18n';

// Import translation files
import en from '../locales/en.json';
import kn from '../locales/kn.json';

const translations = {
  [SUPPORTED_LANGUAGES.EN]: en,
  [SUPPORTED_LANGUAGES.KN]: kn,
};

/**
 * Get nested translation value
 * @param {object} obj - Translation object
 * @param {string} path - Dot-separated path (e.g., 'deals.confirmDeal')
 * @returns {string} - Translated string or path if not found
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

/**
 * Custom hook for translations
 * @param {object} userData - User data containing language preference
 * @returns {function} - Translation function
 */
export function useTranslation(userData) {
  const language = getUserLanguage(userData);
  
  /**
   * Translate a key to user's language
   * @param {string} key - Translation key (e.g., 'deals.confirmDeal')
   * @param {object} params - Optional parameters for string interpolation
   * @returns {string} - Translated string
   */
  const t = (key, params = {}) => {
    const translation = getNestedValue(translations[language], key);
    
    // Simple string interpolation
    if (typeof translation === 'string' && Object.keys(params).length > 0) {
      return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }
    
    return translation;
  };
  
  return t;
}

/**
 * Get translation function for a specific language
 * Useful for server-side or non-component contexts
 * @param {string} language - Language code
 * @returns {function} - Translation function
 */
export function getTranslationFunction(language = SUPPORTED_LANGUAGES.EN) {
  const validLanguage = language in translations ? language : SUPPORTED_LANGUAGES.EN;
  
  return (key, params = {}) => {
    const translation = getNestedValue(translations[validLanguage], key);
    
    if (typeof translation === 'string' && Object.keys(params).length > 0) {
      return translation.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? params[paramKey] : match;
      });
    }
    
    return translation;
  };
}
