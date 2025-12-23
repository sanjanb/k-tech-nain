/**
 * Email Templates for Notifications - Kannada Version
 * Kannada (ಕನ್ನಡ) email templates for deal events
 */

import { NOTIFICATION_EVENTS } from "./notificationEvents";

/**
 * Get email subject in Kannada
 * @param {string} eventType - Notification event type
 * @param {string} recipientRole - 'farmer' or 'buyer'
 * @returns {string} - Email subject line in Kannada
 */
export function getEmailSubjectKannada(eventType, recipientRole) {
  switch (eventType) {
    case NOTIFICATION_EVENTS.DEAL_CONFIRMED:
      return recipientRole === "farmer"
        ? "ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ - ಖರೀದಿದಾರ ಮುಂದುವರಿಯಲು ಸಿದ್ಧರಾಗಿದ್ದಾರೆ"
        : "ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ - ರೈತ ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಸ್ವೀಕರಿಸಿದ್ದಾರೆ";

    case NOTIFICATION_EVENTS.DEAL_COMPLETED:
      return "ಒಪ್ಪಂದ ಪೂರ್ಣಗೊಂಡಿದೆ - ವಹಿವಾಟು ಯಶಸ್ವಿಯಾಗಿದೆ";

    default:
      return "ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ - ಒಪ್ಪಂದ ನವೀಕರಣ";
  }
}

/**
 * Generate plain text email body in Kannada
 * @param {string} eventType - Notification event type
 * @param {object} data - Email template data
 * @returns {string} - Plain text email body in Kannada
 */
export function getEmailBodyPlainTextKannada(eventType, data) {
  const { recipientName, productName, dealId, otherPartyName } = data;

  switch (eventType) {
    case NOTIFICATION_EVENTS.DEAL_CONFIRMED:
      return data.recipientRole === "farmer"
        ? `ನಮಸ್ಕಾರ ${recipientName},

ಅದ್ಭುತ ಸುದ್ದಿ! ನಿಮ್ಮ ಒಪ್ಪಂದವನ್ನು ದೃಢೀಕರಿಸಲಾಗಿದೆ.

ಉತ್ಪನ್ನ: ${productName}
ಖರೀದಿದಾರ: ${otherPartyName}
ಒಪ್ಪಂದ ಐಡಿ: ${dealId}

ನೀವು ಮತ್ತು ಖರೀದಿದಾರರು ಈ ಒಪ್ಪಂದವನ್ನು ದೃಢೀಕರಿಸಿದ್ದೀರಿ. ನೀವು ಈಗ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನಲ್ಲಿ ಒದಗಿಸಲಾದ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಬಳಸಿಕೊಂಡು ವಹಿವಾಟಿಗೆ ಮುಂದುವರಿಯಬಹುದು.

ಸಂಪೂರ್ಣ ಒಪ್ಪಂದ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಮತ್ತು ವಿತರಣೆಯನ್ನು ಸಂಯೋಜಿಸಲು ದಯವಿಟ್ಟು ಫಾರ್ಮ್ ಟು ಟೇಬಲ್‌ಗೆ ಲಾಗಿನ್ ಆಗಿ.

ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ ಬಳಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!

---
ಇದು ಸ್ವಯಂಚಾಲಿತ ವ್ಯವಹಾರ ಸಂದೇಶವಾಗಿದೆ. ದಯವಿಟ್ಟು ಈ ಇಮೇಲ್‌ಗೆ ಉತ್ತರಿಸಬೇಡಿ.
ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ - ರೈತರನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು`
        : `ನಮಸ್ಕಾರ ${recipientName},

ಅದ್ಭುತ ಸುದ್ದಿ! ನಿಮ್ಮ ಒಪ್ಪಂದವನ್ನು ದೃಢೀಕರಿಸಲಾಗಿದೆ.

ಉತ್ಪನ್ನ: ${productName}
ರೈತ: ${otherPartyName}
ಒಪ್ಪಂದ ಐಡಿ: ${dealId}

ನೀವು ಮತ್ತು ರೈತರು ಈ ಒಪ್ಪಂದವನ್ನು ದೃಢೀಕರಿಸಿದ್ದೀರಿ. ನೀವು ಈಗ ಪಾವತಿಗೆ ಮುಂದುವರಿಯಬಹುದು ಮತ್ತು ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ನಲ್ಲಿನ ಸಂಪರ್ಕ ವಿವರಗಳನ್ನು ಬಳಸಿಕೊಂಡು ವಿತರಣೆಯನ್ನು ಸಂಯೋಜಿಸಬಹುದು.

ಪಾವತಿ ಮಾಹಿತಿ ಮತ್ತು ವಿತರಣಾ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ದಯವಿಟ್ಟು ಫಾರ್ಮ್ ಟು ಟೇಬಲ್‌ಗೆ ಲಾಗಿನ್ ಆಗಿ.

ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ ಬಳಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!

---
ಇದು ಸ್ವಯಂಚಾಲಿತ ವ್ಯವಹಾರ ಸಂದೇಶವಾಗಿದೆ. ದಯವಿಟ್ಟು ಈ ಇಮೇಲ್‌ಗೆ ಉತ್ತರಿಸಬೇಡಿ.
ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ - ರೈತರನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು`;

    case NOTIFICATION_EVENTS.DEAL_COMPLETED:
      return `ನಮಸ್ಕಾರ ${recipientName},

ನಿಮ್ಮ ಒಪ್ಪಂದವನ್ನು ಪೂರ್ಣಗೊಂಡಂತೆ ಗುರುತಿಸಲಾಗಿದೆ.

ಉತ್ಪನ್ನ: ${productName}
ಒಪ್ಪಂದ ಐಡಿ: ${dealId}

ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ ಬಳಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ಈ ವಹಿವಾಟು ಯಶಸ್ವಿಯಾಗಿದೆ ಎಂದು ನಾವು ಭಾವಿಸುತ್ತೇವೆ.

ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಭೇಟಿ ನೀಡುವ ಮೂಲಕ ಈ ಒಪ್ಪಂದಕ್ಕಾಗಿ ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಬಹುದು.

ನಮ್ಮ ಸಮುದಾಯದ ಭಾಗವಾಗಿರುವುದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು!

---
ಇದು ಸ್ವಯಂಚಾಲಿತ ವ್ಯವಹಾರ ಸಂದೇಶವಾಗಿದೆ. ದಯವಿಟ್ಟು ಈ ಇಮೇಲ್‌ಗೆ ಉತ್ತರಿಸಬೇಡಿ.
ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ - ರೈತರನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು`;

    default:
      return `ನಮಸ್ಕಾರ ${recipientName},

ನಿಮ್ಮ ಒಪ್ಪಂದಕ್ಕೆ (ಐಡಿ: ${dealId}) ನವೀಕರಣವಿದೆ.

ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ದಯವಿಟ್ಟು ಫಾರ್ಮ್ ಟು ಟೇಬಲ್‌ಗೆ ಲಾಗಿನ್ ಆಗಿ.

ಧನ್ಯವಾದಗಳು!

---
ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ - ರೈತರನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು`;
  }
}

/**
 * Generate HTML email body in Kannada
 * @param {string} eventType - Notification event type
 * @param {object} data - Email template data
 * @returns {string} - HTML email body in Kannada
 */
export function getEmailBodyHTMLKannada(eventType, data) {
  const {
    recipientName,
    productName,
    dealId,
    otherPartyName,
    platformUrl = "https://farmtotable.app",
  } = data;

  const baseStyles = `
    body { font-family: 'Noto Sans Kannada', Arial, sans-serif; line-height: 1.6; color: #333; }
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
<head>
  <style>${baseStyles}</style>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ಒಪ್ಪಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ!</h1>
    </div>
    <div class="content">
      <p>ನಮಸ್ಕಾರ ${recipientName},</p>
      <p><strong>ಅದ್ಭುತ ಸುದ್ದಿ!</strong> ನಿಮ್ಮ ಒಪ್ಪಂದವನ್ನು ಎರಡೂ ಪಕ್ಷಗಳು ದೃಢೀಕರಿಸಿದ್ದಾರೆ.</p>
      
      <div class="detail">
        <p><strong>ಉತ್ಪನ್ನ:</strong> ${productName}</p>
        <p><strong>${
          data.recipientRole === "farmer" ? "ಖರೀದಿದಾರ" : "ರೈತ"
        }:</strong> ${otherPartyName}</p>
        <p><strong>ಒಪ್ಪಂದ ಐಡಿ:</strong> ${dealId}</p>
      </div>
      
      <p>${
        data.recipientRole === "farmer"
          ? "ನೀವು ಈಗ ಪಾವತಿ ಮತ್ತು ವಿತರಣಾ ವ್ಯವಸ್ಥೆಗಳಿಗಾಗಿ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಯೋಜನೆ ಮಾಡಬಹುದು."
          : "ನೀವು ಈಗ ಪಾವತಿಗೆ ಮುಂದುವರಿಯಬಹುದು ಮತ್ತು ರೈತರೊಂದಿಗೆ ವಿತರಣೆಯನ್ನು ಸಂಯೋಜಿಸಬಹುದು."
      }</p>
      
      <a href="${platformUrl}/my-deals" class="button">ಒಪ್ಪಂದ ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ</a>
    </div>
    
    <div class="footer">
      <p>ಇದು ಸ್ವಯಂಚಾಲಿತ ವ್ಯವಹಾರ ಸಂದೇಶವಾಗಿದೆ. ದಯವಿಟ್ಟು ಈ ಇಮೇಲ್‌ಗೆ ಉತ್ತರಿಸಬೇಡಿ.</p>
      <p>ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ - ರೈತರನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು</p>
    </div>
  </div>
</body>
</html>`;

    case NOTIFICATION_EVENTS.DEAL_COMPLETED:
      return `
<!DOCTYPE html>
<html>
<head>
  <style>${baseStyles}</style>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ಒಪ್ಪಂದ ಪೂರ್ಣಗೊಂಡಿದೆ</h1>
    </div>
    <div class="content">
      <p>ನಮಸ್ಕಾರ ${recipientName},</p>
      <p>ನಿಮ್ಮ ಒಪ್ಪಂದವನ್ನು ಪೂರ್ಣಗೊಂಡಂತೆ ಗುರುತಿಸಲಾಗಿದೆ.</p>
      
      <div class="detail">
        <p><strong>ಉತ್ಪನ್ನ:</strong> ${productName}</p>
        <p><strong>ಒಪ್ಪಂದ ಐಡಿ:</strong> ${dealId}</p>
      </div>
      
      <p>ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ ಬಳಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ಈ ವಹಿವಾಟು ಯಶಸ್ವಿಯಾಗಿದೆ ಎಂದು ನಾವು ಭಾವಿಸುತ್ತೇವೆ!</p>
      
      <a href="${platformUrl}/my-deals" class="button">ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ</a>
    </div>
    
    <div class="footer">
      <p>ಇದು ಸ್ವಯಂಚಾಲಿತ ವ್ಯವಹಾರ ಸಂದೇಶವಾಗಿದೆ. ದಯವಿಟ್ಟು ಈ ಇಮೇಲ್‌ಗೆ ಉತ್ತರಿಸಬೇಡಿ.</p>
      <p>ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ - ರೈತರನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು</p>
    </div>
  </div>
</body>
</html>`;

    default:
      return `
<!DOCTYPE html>
<html>
<head>
  <style>${baseStyles}</style>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>ಒಪ್ಪಂದ ನವೀಕರಣ</h1>
    </div>
    <div class="content">
      <p>ನಮಸ್ಕಾರ ${recipientName},</p>
      <p>ನಿಮ್ಮ ಒಪ್ಪಂದಕ್ಕೆ (ಐಡಿ: ${dealId}) ನವೀಕರಣವಿದೆ.</p>
      <p>ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಆಗಿ.</p>
      
      <a href="${platformUrl}/my-deals" class="button">ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ</a>
    </div>
    
    <div class="footer">
      <p>ಫಾರ್ಮ್ ಟು ಟೇಬಲ್ - ರೈತರನ್ನು ನೇರವಾಗಿ ಖರೀದಿದಾರರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು</p>
    </div>
  </div>
</body>
</html>`;
  }
}
