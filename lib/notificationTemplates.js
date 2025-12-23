/**
 * Email Templates for Notifications
 * Simple, transactional email templates for deal events
 */

import { NOTIFICATION_EVENTS } from "./notificationEvents";
import {
  getEmailSubjectKannada,
  getEmailBodyPlainTextKannada,
  getEmailBodyHTMLKannada,
} from "./notificationTemplatesKannada";
import { SUPPORTED_LANGUAGES } from "./i18n";

/**
 * Get email subject based on event type and recipient role
 * @param {string} eventType - Notification event type
 * @param {string} recipientRole - 'farmer' or 'buyer'
 * @returns {string} - Email subject line
 */
export function getEmailSubject(eventType, recipientRole) {
  switch (eventType) {
    case NOTIFICATION_EVENTS.DEAL_CONFIRMED:
      return recipientRole === "farmer"
        ? "Deal Confirmed - Buyer is Ready to Proceed"
        : "Deal Confirmed - Farmer Accepted Your Request";

    case NOTIFICATION_EVENTS.DEAL_COMPLETED:
      return "Deal Completed - Transaction Successful";

    default:
      return "Farm To Table - Deal Update";
  }
}

/**
 * Generate plain text email body
 * @param {string} eventType - Notification event type
 * @param {object} data - Email template data
 * @returns {string} - Plain text email body
 */
export function getEmailBodyPlainText(eventType, data) {
  const { recipientName, productName, dealId, otherPartyName } = data;

  switch (eventType) {
    case NOTIFICATION_EVENTS.DEAL_CONFIRMED:
      return data.recipientRole === "farmer"
        ? `Hello ${recipientName},

Great news! Your deal has been confirmed.

Product: ${productName}
Buyer: ${otherPartyName}
Deal ID: ${dealId}

Both you and the buyer have confirmed this deal. You can now proceed with the transaction using the contact details provided on the platform.

Please log in to Farm To Table to view full deal details and coordinate delivery.

Thank you for using Farm To Table!

---
This is an automated transactional message. Please do not reply to this email.
Farm To Table - Connecting Farmers Directly to Buyers`
        : `Hello ${recipientName},

Great news! Your deal has been confirmed.

Product: ${productName}
Farmer: ${otherPartyName}
Deal ID: ${dealId}

Both you and the farmer have confirmed this deal. You can now proceed with payment and coordinate delivery using the contact details on the platform.

Please log in to Farm To Table to view payment information and delivery details.

Thank you for using Farm To Table!

---
This is an automated transactional message. Please do not reply to this email.
Farm To Table - Connecting Farmers Directly to Buyers`;

    case NOTIFICATION_EVENTS.DEAL_COMPLETED:
      return `Hello ${recipientName},

Your deal has been marked as completed.

Product: ${productName}
Deal ID: ${dealId}

Thank you for using Farm To Table. We hope this transaction was successful.

You can leave feedback for this deal by visiting your dashboard.

Thank you for being part of our community!

---
This is an automated transactional message. Please do not reply to this email.
Farm To Table - Connecting Farmers Directly to Buyers`;

    default:
      return `Hello ${recipientName},

There has been an update to your deal (ID: ${dealId}).

Please log in to Farm To Table to view details.

Thank you!

---
Farm To Table - Connecting Farmers Directly to Buyers`;
  }
}

/**
 * Generate HTML email body (optional, for better formatting)
 * @param {string} eventType - Notification event type
 * @param {object} data - Email template data
 * @returns {string} - HTML email body
 */
export function getEmailBodyHTML(eventType, data) {
  const {
    recipientName,
    productName,
    dealId,
    otherPartyName,
    platformUrl = "https://farmtotable.app",
  } = data;

  const baseStyles = `
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #10B981; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 5px; margin: 20px 0; }
    .detail { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #10B981; }
    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
    .button { display: inline-block; background: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
  `;

  switch (eventType) {
    case NOTIFICATION_EVENTS.DEAL_CONFIRMED:
      return `
<!DOCTYPE html>
<html>
<head><style>${baseStyles}</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>Deal Confirmed!</h1>
    </div>
    <div class="content">
      <p>Hello ${recipientName},</p>
      <p><strong>Great news!</strong> Your deal has been confirmed by both parties.</p>
      
      <div class="detail">
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>${
          data.recipientRole === "farmer" ? "Buyer" : "Farmer"
        }:</strong> ${otherPartyName}</p>
        <p><strong>Deal ID:</strong> ${dealId}</p>
      </div>
      
      <p>${
        data.recipientRole === "farmer"
          ? "You can now coordinate with the buyer for payment and delivery arrangements."
          : "You can now proceed with payment and coordinate delivery with the farmer."
      }</p>
      
      <a href="${platformUrl}/my-deals" class="button">View Deal Details</a>
    </div>
    
    <div class="footer">
      <p>This is an automated transactional message. Please do not reply to this email.</p>
      <p>Farm To Table - Connecting Farmers Directly to Buyers</p>
    </div>
  </div>
</body>
</html>`;

    case NOTIFICATION_EVENTS.DEAL_COMPLETED:
      return `
<!DOCTYPE html>
<html>
<head><style>${baseStyles}</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>Deal Completed</h1>
    </div>
    <div class="content">
      <p>Hello ${recipientName},</p>
      <p>Your deal has been marked as completed.</p>
      
      <div class="detail">
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Deal ID:</strong> ${dealId}</p>
      </div>
      
      <p>Thank you for using Farm To Table. We hope this transaction was successful!</p>
      
      <a href="${platformUrl}/my-deals" class="button">Leave Feedback</a>
    </div>
    
    <div class="footer">
      <p>This is an automated transactional message. Please do not reply to this email.</p>
      <p>Farm To Table - Connecting Farmers Directly to Buyers</p>
    </div>
  </div>
</body>
</html>`;

    default:
      return `
<!DOCTYPE html>
<html>
<head><style>${baseStyles}</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>Deal Update</h1>
    </div>
    <div class="content">
      <p>Hello ${recipientName},</p>
      <p>There has been an update to your deal (ID: ${dealId}).</p>
      <p>Please log in to view details.</p>
      
      <a href="${platformUrl}/my-deals" class="button">View Details</a>
    </div>
    
    <div class="footer">
      <p>Farm To Table - Connecting Farmers Directly to Buyers</p>
    </div>
  </div>
</body>
</html>`;
  }
}

/**
 * Prepare email data for sending with language support
 * @param {string} eventType - Notification event type
 * @param {object} deal - Deal object
 * @param {object} product - Product object
 * @param {object} recipient - Recipient user object
 * @param {object} otherParty - Other party user object (farmer/buyer)
 * @returns {object} - Complete email data
 */
export function prepareEmailData(
  eventType,
  deal,
  product,
  recipient,
  otherParty
) {
  // Determine recipient's language (default to English)
  const language = recipient.language || SUPPORTED_LANGUAGES.EN;
  const isKannada = language === SUPPORTED_LANGUAGES.KN;
  
  // Prepare template data
  const templateData = {
    recipientName: recipient.name,
    recipientRole: recipient.role,
    productName: product.cropName,
    dealId: deal.id,
    otherPartyName: otherParty.name,
  };
  
  return {
    to: recipient.email,
    subject: isKannada 
      ? getEmailSubjectKannada(eventType, recipient.role)
      : getEmailSubject(eventType, recipient.role),
    text: isKannada
      ? getEmailBodyPlainTextKannada(eventType, templateData)
      : getEmailBodyPlainText(eventType, templateData),
    html: isKannada
      ? getEmailBodyHTMLKannada(eventType, templateData)
      : getEmailBodyHTML(eventType, templateData),
    language, // Include language for logging
  };
}
