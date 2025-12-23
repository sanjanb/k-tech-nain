/**
 * Notification Service - Client Side
 * Handles UI feedback and notification state management
 * Does NOT send actual notifications (done server-side via Firebase Functions)
 */

import { db } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {
  NOTIFICATION_EVENTS,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_STATUS,
  createNotificationLogEntry,
  isDuplicateNotification,
} from "./notificationEvents";

/**
 * Queue a notification to be sent
 * This creates a log entry that will be picked up by Firebase Functions
 * @param {string} eventType - Type of notification event
 * @param {string} dealId - Deal ID
 * @param {string} recipientId - User ID to receive notification
 * @param {string} channel - Notification channel (default: EMAIL)
 * @returns {Promise<object>} - Created notification log entry
 */
export async function queueNotification(
  eventType,
  dealId,
  recipientId,
  channel = NOTIFICATION_CHANNELS.EMAIL
) {
  try {
    // Check for duplicates to prevent spam
    const existingLogsQuery = query(
      collection(db, "notification_logs"),
      where("eventType", "==", eventType),
      where("dealId", "==", dealId),
      where("recipientId", "==", recipientId)
    );

    const existingLogsSnapshot = await getDocs(existingLogsQuery);
    const existingLogs = existingLogsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Prevent duplicate notifications
    if (isDuplicateNotification(existingLogs, eventType, dealId, recipientId)) {
      console.log("Duplicate notification prevented:", {
        eventType,
        dealId,
        recipientId,
      });
      return { isDuplicate: true };
    }

    // Create notification log entry
    const logEntry = createNotificationLogEntry(
      eventType,
      dealId,
      recipientId,
      channel
    );

    // Convert Date to Firestore Timestamp
    const firestoreEntry = {
      ...logEntry,
      createdAt: Timestamp.fromDate(logEntry.createdAt),
    };

    // Add to Firestore (this will trigger Firebase Function)
    const docRef = await addDoc(
      collection(db, "notification_logs"),
      firestoreEntry
    );

    console.log("Notification queued:", { id: docRef.id, eventType, dealId });

    return {
      id: docRef.id,
      ...logEntry,
      isDuplicate: false,
    };
  } catch (error) {
    console.error("Error queueing notification:", error);
    throw error;
  }
}

/**
 * Queue notifications for both parties in a deal
 * @param {string} eventType - Type of notification event
 * @param {string} dealId - Deal ID
 * @param {string} buyerId - Buyer user ID
 * @param {string} farmerId - Farmer user ID
 * @returns {Promise<array>} - Array of queued notifications
 */
export async function queueDealNotifications(
  eventType,
  dealId,
  buyerId,
  farmerId
) {
  try {
    const results = await Promise.allSettled([
      queueNotification(eventType, dealId, buyerId),
      queueNotification(eventType, dealId, farmerId),
    ]);

    return results.map((result, index) => ({
      recipientId: index === 0 ? buyerId : farmerId,
      status: result.status,
      value: result.status === "fulfilled" ? result.value : null,
      error: result.status === "rejected" ? result.reason : null,
    }));
  } catch (error) {
    console.error("Error queueing deal notifications:", error);
    throw error;
  }
}

/**
 * Get notification history for a specific deal
 * @param {string} dealId - Deal ID
 * @returns {Promise<array>} - Array of notification logs
 */
export async function getDealNotificationHistory(dealId) {
  try {
    const logsQuery = query(
      collection(db, "notification_logs"),
      where("dealId", "==", dealId)
    );

    const logsSnapshot = await getDocs(logsQuery);
    const logs = logsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      lastAttemptAt: doc.data().lastAttemptAt?.toDate(),
      sentAt: doc.data().sentAt?.toDate(),
    }));

    // Sort by creation date descending
    logs.sort((a, b) => b.createdAt - a.createdAt);

    return logs;
  } catch (error) {
    console.error("Error fetching notification history:", error);
    return [];
  }
}

/**
 * Get user's notification history
 * @param {string} userId - User ID
 * @param {number} limit - Maximum number of logs to fetch
 * @returns {Promise<array>} - Array of notification logs
 */
export async function getUserNotificationHistory(userId, limit = 50) {
  try {
    const logsQuery = query(
      collection(db, "notification_logs"),
      where("recipientId", "==", userId)
    );

    const logsSnapshot = await getDocs(logsQuery);
    let logs = logsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      lastAttemptAt: doc.data().lastAttemptAt?.toDate(),
      sentAt: doc.data().sentAt?.toDate(),
    }));

    // Sort by creation date descending
    logs.sort((a, b) => b.createdAt - a.createdAt);

    // Apply limit
    if (limit) {
      logs = logs.slice(0, limit);
    }

    return logs;
  } catch (error) {
    console.error("Error fetching user notification history:", error);
    return [];
  }
}

/**
 * Check if user has received notification for a specific event
 * @param {string} userId - User ID
 * @param {string} eventType - Event type
 * @param {string} dealId - Deal ID
 * @returns {Promise<boolean>} - True if notification was sent
 */
export async function hasReceivedNotification(userId, eventType, dealId) {
  try {
    const logsQuery = query(
      collection(db, "notification_logs"),
      where("recipientId", "==", userId),
      where("eventType", "==", eventType),
      where("dealId", "==", dealId),
      where("status", "==", NOTIFICATION_STATUS.SENT)
    );

    const logsSnapshot = await getDocs(logsQuery);
    return !logsSnapshot.empty;
  } catch (error) {
    console.error("Error checking notification status:", error);
    return false;
  }
}

/**
 * UI Helper: Show notification feedback toast/banner
 * @param {string} message - Message to display
 * @param {string} type - 'success' | 'error' | 'info'
 */
export function showNotificationFeedback(message, type = "info") {
  // This is a simple implementation
  // In production, integrate with your toast/notification UI library
  console.log(`[Notification ${type.toUpperCase()}]:`, message);

  // For now, use browser alert
  // TODO: Replace with proper toast notification UI
  if (type === "success") {
    alert(`✓ ${message}`);
  } else if (type === "error") {
    alert(`✗ ${message}`);
  } else {
    alert(message);
  }
}
