/**
 * UPI ID Validation Utility
 * Validates UPI ID format according to NPCI standards
 */

/**
 * Validates a UPI ID format
 * Valid formats:
 * - username@bankname (e.g., farmer123@paytm, john@okaxis)
 * - mobile@bankname (e.g., 9876543210@ybl)
 * 
 * @param {string} upiId - The UPI ID to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function validateUpiId(upiId) {
  if (!upiId || typeof upiId !== 'string') {
    return false;
  }

  // Trim whitespace
  const trimmed = upiId.trim();

  // Basic UPI format: username@bankname
  // Username can be alphanumeric, dots, hyphens, underscores
  // Bank handle is typically alphabetic
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;

  if (!upiRegex.test(trimmed)) {
    return false;
  }

  // Check length constraints
  if (trimmed.length < 5 || trimmed.length > 50) {
    return false;
  }

  // Ensure there's exactly one @ symbol
  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const [username, bank] = parts;

  // Username must be at least 3 characters
  if (username.length < 3) {
    return false;
  }

  // Bank handle must be at least 2 characters
  if (bank.length < 2) {
    return false;
  }

  return true;
}

/**
 * Formats a UPI ID by trimming and converting to lowercase
 * @param {string} upiId - The UPI ID to format
 * @returns {string} - Formatted UPI ID
 */
export function formatUpiId(upiId) {
  if (!upiId || typeof upiId !== 'string') {
    return '';
  }
  return upiId.trim().toLowerCase();
}

/**
 * Returns a user-friendly error message for invalid UPI IDs
 * @param {string} upiId - The UPI ID that failed validation
 * @returns {string} - Error message
 */
export function getUpiValidationError(upiId) {
  if (!upiId || upiId.trim() === '') {
    return 'UPI ID cannot be empty';
  }

  const trimmed = upiId.trim();

  if (!trimmed.includes('@')) {
    return 'UPI ID must contain @ symbol (e.g., farmer@paytm)';
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return 'UPI ID must have exactly one @ symbol';
  }

  const [username, bank] = parts;

  if (username.length < 3) {
    return 'Username part must be at least 3 characters';
  }

  if (bank.length < 2) {
    return 'Bank handle must be at least 2 characters';
  }

  if (trimmed.length > 50) {
    return 'UPI ID is too long (max 50 characters)';
  }

  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(trimmed)) {
    return 'UPI ID contains invalid characters. Use only letters, numbers, dots, hyphens, and underscores';
  }

  return 'Invalid UPI ID format';
}
