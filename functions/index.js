/**
 * Firebase Cloud Functions for Notifications
 * Triggers email notifications on deal status changes
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();

/**
 * Notification Event Types
 */
const NOTIFICATION_EVENTS = {
  DEAL_CONFIRMED: 'DEAL_CONFIRMED',
  DEAL_COMPLETED: 'DEAL_COMPLETED',
};

const NOTIFICATION_STATUS = {
  PENDING: 'PENDING',
  SENT: 'SENT',
  FAILED: 'FAILED',
};

/**
 * Cloud Function: Listen to notification_logs collection
 * When a new notification is queued (by client), process it
 */
exports.processNotification = functions.firestore
  .document('notification_logs/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    const notificationId = context.params.notificationId;
    
    console.log('Processing notification:', notificationId, notification);
    
    try {
      // Get deal details
      const dealDoc = await db.collection('deals').doc(notification.dealId).get();
      if (!dealDoc.exists) {
        throw new Error('Deal not found');
      }
      const deal = { id: dealDoc.id, ...dealDoc.data() };
      
      // Get product details
      const productDoc = await db.collection('products').doc(deal.productId).get();
      if (!productDoc.exists) {
        throw new Error('Product not found');
      }
      const product = productDoc.data();
      
      // Get recipient details
      const recipientDoc = await db.collection('users').doc(notification.recipientId).get();
      if (!recipientDoc.exists) {
        throw new Error('Recipient not found');
      }
      const recipient = recipientDoc.data();
      
      // Get other party details (farmer or buyer)
      const otherPartyId = recipient.role === 'farmer' ? deal.buyerId : deal.farmerId;
      const otherPartyDoc = await db.collection('users').doc(otherPartyId).get();
      const otherParty = otherPartyDoc.exists ? otherPartyDoc.data() : { name: 'Unknown' };
      
      // Validate recipient has email
      if (!recipient.email) {
        throw new Error('Recipient has no email address');
      }
      
      // Prepare email data
      const emailData = {
        to: recipient.email,
        recipientName: recipient.name,
        recipientRole: recipient.role,
        productName: product.cropName,
        dealId: deal.id,
        otherPartyName: otherParty.name,
        eventType: notification.eventType,
      };
      
      // TODO: Integrate with actual email service (SendGrid, AWS SES, etc.)
      // For now, we'll just log the email that would be sent
      console.log('Would send email:', emailData);
      
      // In production, uncomment this and implement your email service:
      // await sendEmail(emailData);
      
      // Update notification log as sent
      await snap.ref.update({
        status: NOTIFICATION_STATUS.SENT,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        attempts: (notification.attempts || 0) + 1,
        lastAttemptAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      
      console.log('Notification processed successfully:', notificationId);
      
    } catch (error) {
      console.error('Error processing notification:', error);
      
      // Update notification log as failed
      await snap.ref.update({
        status: NOTIFICATION_STATUS.FAILED,
        attempts: (notification.attempts || 0) + 1,
        lastAttemptAt: admin.firestore.FieldValue.serverTimestamp(),
        errorMessage: error.message,
      });
      
      // Don't throw error to prevent infinite retries
      // Firebase will retry failed functions automatically
    }
  });

/**
 * Cloud Function: Monitor deal confirmations
 * Trigger when both parties confirm a deal
 */
exports.onDealConfirmation = functions.firestore
  .document('deals/{dealId}')
  .onUpdate(async (change, context) => {
    const previousDeal = change.before.data();
    const currentDeal = change.after.data();
    const dealId = context.params.dealId;
    
    // Check if deal just became fully confirmed
    const wasConfirmed = previousDeal.buyerConfirmed && previousDeal.farmerConfirmed;
    const isNowConfirmed = currentDeal.buyerConfirmed && currentDeal.farmerConfirmed;
    
    if (!wasConfirmed && isNowConfirmed) {
      console.log('Deal confirmed, queuing notifications:', dealId);
      
      try {
        // Create notification logs for both parties
        // These will trigger the processNotification function above
        const batch = db.batch();
        
        // Buyer notification
        const buyerNotificationRef = db.collection('notification_logs').doc();
        batch.set(buyerNotificationRef, {
          eventType: NOTIFICATION_EVENTS.DEAL_CONFIRMED,
          dealId: dealId,
          recipientId: currentDeal.buyerId,
          channel: 'EMAIL',
          status: NOTIFICATION_STATUS.PENDING,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          attempts: 0,
        });
        
        // Farmer notification
        const farmerNotificationRef = db.collection('notification_logs').doc();
        batch.set(farmerNotificationRef, {
          eventType: NOTIFICATION_EVENTS.DEAL_CONFIRMED,
          dealId: dealId,
          recipientId: currentDeal.farmerId,
          channel: 'EMAIL',
          status: NOTIFICATION_STATUS.PENDING,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          attempts: 0,
        });
        
        await batch.commit();
        
        console.log('Notification logs created for deal:', dealId);
        
      } catch (error) {
        console.error('Error creating notification logs:', error);
      }
    }
  });

/**
 * Helper function to send email (placeholder)
 * TODO: Implement with your email service provider
 */
async function sendEmail(emailData) {
  // Example with SendGrid:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(functions.config().sendgrid.key);
  // await sgMail.send({
  //   to: emailData.to,
  //   from: 'notifications@farmtotable.app',
  //   subject: getEmailSubject(emailData.eventType, emailData.recipientRole),
  //   text: getEmailBody(emailData),
  //   html: getEmailBodyHTML(emailData),
  // });
  
  // For now, just log
  console.log('Sending email to:', emailData.to);
  return Promise.resolve();
}
