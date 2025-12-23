/**
 * Notification Event Types and Constants
 * Defines the event-based notification system for deal lifecycle
 */

// Event Types
export const NOTIFICATION_EVENTS = {
  DEAL_CONFIRMED: "DEAL_CONFIRMED",
  DEAL_COMPLETED: "DEAL_COMPLETED",
};

// Deal Status Lifecycle
export const DEAL_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  COMPLETED: "COMPLETED",
};

// Notification Channels
export const NOTIFICATION_CHANNELS = {
  EMAIL: "EMAIL",
  SMS: "SMS", // Future implementation
};

// Notification Log Status
export const NOTIFICATION_STATUS = {
  PENDING: "PENDING",
  SENT: "SENT",
  FAILED: "FAILED",
  RETRYING: "RETRYING",
};

/**
 * Helper function to determine notification event based on deal state transition
 * @param {object} previousDeal - Previous deal state
 * @param {object} currentDeal - Current deal state
 * @returns {string|null} - Event type or null if no notification needed
 */
export function getDealStateTransitionEvent(previousDeal, currentDeal) {
  // Check for deal confirmation (both parties confirmed)
  const wasConfirmed =
    previousDeal?.buyerConfirmed && previousDeal?.farmerConfirmed;
  const isNowConfirmed =
    currentDeal?.buyerConfirmed && currentDeal?.farmerConfirmed;

  if (!wasConfirmed && isNowConfirmed) {
    return NOTIFICATION_EVENTS.DEAL_CONFIRMED;
  }

  // Future: Check for deal completion events
  // Currently completion is same as confirmation

  return null;
}

/**
 * Helper function to check if a deal is fully confirmed
 * @param {object} deal - Deal object
 * @returns {boolean}
 */
export function isDealConfirmed(deal) {
  return deal?.buyerConfirmed === true && deal?.farmerConfirmed === true;
}

/**
 * Create notification log entry metadata
 * @param {string} eventType - Type of notification event
 * @param {string} dealId - Deal ID
 * @param {string} recipientId - User ID receiving notification
 * @param {string} channel - Notification channel (EMAIL/SMS)
 * @returns {object} - Notification log entry
 */
export function createNotificationLogEntry(
  eventType,
  dealId,
  recipientId,
  channel = NOTIFICATION_CHANNELS.EMAIL
) {
  return {
    eventType,
    dealId,
    recipientId,
    channel,
    status: NOTIFICATION_STATUS.PENDING,
    createdAt: new Date(),
    attempts: 0,
    lastAttemptAt: null,
    sentAt: null,
    errorMessage: null,
  };
}

/**
 * Validate notification log entry for idempotency
 * Check if notification for this event+deal+recipient already exists
 * @param {array} existingLogs - Array of existing notification logs
 * @param {string} eventType - Event type to check
 * @param {string} dealId - Deal ID
 * @param {string} recipientId - Recipient user ID
 * @returns {boolean} - True if duplicate, false if unique
 */
export function isDuplicateNotification(
  existingLogs,
  eventType,
  dealId,
  recipientId
) {
  return existingLogs.some(
    (log) =>
      log.eventType === eventType &&
      log.dealId === dealId &&
      log.recipientId === recipientId &&
      log.status === NOTIFICATION_STATUS.SENT
  );
}
