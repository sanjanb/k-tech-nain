# Event-Based Notifications Implementation Guide

**Version**: 10.0  
**Status**: Implemented - Awaiting Email Service Integration  
**Last Updated**: December 23, 2025

---

## Overview

This guide documents the implementation of event-based email notifications for deal confirmation events in the Farm To Table platform. The system is designed to notify both farmers and buyers when deals are confirmed, using Firebase Cloud Functions as the backend trigger mechanism.

---

## Architecture

### High-Level Flow

```
User Action (Confirm Deal)
    ↓
Frontend Update (buyerConfirmed/farmerConfirmed = true)
    ↓
Firebase Firestore (deals collection updated)
    ↓
Cloud Function Trigger (onDealConfirmation)
    ↓
Notification Logs Created (notification_logs collection)
    ↓
Cloud Function Trigger (processNotification)
    ↓
Email Service (SendGrid/AWS SES/etc.)
    ↓
User Receives Email
```

### System Components

1. **Client-Side Libraries** (`/lib`)

   - `notificationEvents.js` - Event types, constants, helpers
   - `notificationTemplates.js` - Email subject/body templates
   - `notificationService.js` - Client-side notification queue management

2. **Firebase Cloud Functions** (`/functions`)

   - `onDealConfirmation` - Monitors deal updates, creates notification logs
   - `processNotification` - Sends emails based on notification logs

3. **Frontend Integration** (`/app`)

   - Updated deal confirmation feedback messages
   - User notification status display

4. **Database Collections**
   - `notification_logs` - Tracks all notification attempts
   - `deals` - Existing collection with confirmation flags

---

## Implementation Phases

### Phase 0: Foundation (Completed)

**Objective**: Establish data structures and event definitions

**Deliverables**:

- Event type constants (`DEAL_CONFIRMED`, `DEAL_COMPLETED`)
- Deal status lifecycle defined
- Notification log schema created
- Helper functions for event detection

**Files Created**:

- [lib/notificationEvents.js](../lib/notificationEvents.js)

**Key Functions**:

- `getDealStateTransitionEvent()` - Detects state changes
- `isDealConfirmed()` - Validates deal confirmation status
- `createNotificationLogEntry()` - Generates log metadata
- `isDuplicateNotification()` - Prevents duplicate sends

---

### Phase 1: Backend Event Triggers (Completed)

**Objective**: Create Firebase Functions to detect and respond to deal confirmations

**Deliverables**:

- Cloud Function to monitor deal updates
- Automatic notification log creation
- Idempotency checks to prevent duplicates

**Files Created**:

- [functions/index.js](../functions/index.js)
- [functions/package.json](../functions/package.json)
- [firebase.json](../firebase.json)

**Key Functions**:

```javascript
exports.onDealConfirmation = functions.firestore
  .document("deals/{dealId}")
  .onUpdate(async (change, context) => {
    // Detects when both buyerConfirmed and farmerConfirmed become true
    // Creates notification logs for both parties
  });
```

**Trigger Logic**:

```javascript
const wasConfirmed =
  previousDeal.buyerConfirmed && previousDeal.farmerConfirmed;
const isNowConfirmed =
  currentDeal.buyerConfirmed && currentDeal.farmerConfirmed;

if (!wasConfirmed && isNowConfirmed) {
  // Create notification logs
}
```

---

### Phase 2: Email Notifications (Completed - Awaiting Integration)

**Objective**: Send transactional emails for confirmed deals

**Deliverables**:

- Email templates (plain text + HTML)
- Email sending function (placeholder)
- Notification processing function
- Status tracking (SENT/FAILED)

**Files Created**:

- [lib/notificationTemplates.js](../lib/notificationTemplates.js)

**Email Template Structure**:

```javascript
{
  to: 'user@example.com',
  subject: 'Deal Confirmed - Buyer is Ready to Proceed',
  text: '...',  // Plain text version
  html: '...'   // HTML version with styling
}
```

**Email Content Includes**:

- Recipient name
- Product name
- Other party name (farmer/buyer)
- Deal ID
- Next steps instructions
- Platform disclaimer

**Integration Required**:

To enable actual email sending, integrate one of these services in `functions/index.js`:

**Option 1: SendGrid**

```javascript
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(functions.config().sendgrid.key);

await sgMail.send({
  to: emailData.to,
  from: "notifications@farmtotable.app",
  subject: emailData.subject,
  text: emailData.text,
  html: emailData.html,
});
```

**Option 2: AWS SES**

```javascript
const AWS = require("aws-sdk");
const ses = new AWS.SES({ region: "us-east-1" });

await ses
  .sendEmail({
    Source: "notifications@farmtotable.app",
    Destination: { ToAddresses: [emailData.to] },
    Message: {
      Subject: { Data: emailData.subject },
      Body: {
        Text: { Data: emailData.text },
        Html: { Data: emailData.html },
      },
    },
  })
  .promise();
```

**Option 3: Nodemailer (SMTP)**

```javascript
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransporter({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: functions.config().smtp.user,
    pass: functions.config().smtp.password,
  },
});

await transporter.sendMail({
  from: "notifications@farmtotable.app",
  to: emailData.to,
  subject: emailData.subject,
  text: emailData.text,
  html: emailData.html,
});
```

---

### Phase 3: Frontend Feedback (Completed)

**Objective**: Inform users when notifications are sent

**Deliverables**:

- Updated confirmation success messages
- Client-side notification service utilities
- Notification history retrieval functions

**Files Modified**:

- [app/my-deals/page.jsx](../app/my-deals/page.jsx)
- [app/farmer/page.jsx](../app/farmer/page.jsx)

**Files Created**:

- [lib/notificationService.js](../lib/notificationService.js)

**User Feedback**:

When a user confirms a deal, they now see:

> "Deal confirmed successfully! A confirmation notification has been sent to your registered email."

**Additional UI Features Available**:

- `queueNotification()` - Manually queue notifications
- `getDealNotificationHistory()` - View notification history for a deal
- `getUserNotificationHistory()` - View user's notification history
- `hasReceivedNotification()` - Check if notification was sent

---

### Phase 4: Reliability & Safety (Completed)

**Objective**: Ensure notifications are reliable and prevent abuse

**Deliverables**:

- Idempotency checks (prevent duplicate emails)
- Error handling and retry logic
- Notification attempt tracking
- Clear email disclaimers

**Reliability Features**:

1. **Duplicate Prevention**:

   - `isDuplicateNotification()` checks existing logs before queuing
   - Firebase Function checks deal state transition (not just update)

2. **Error Handling**:

   ```javascript
   try {
     // Send email
     status = SENT;
   } catch (error) {
     status = FAILED;
     errorMessage = error.message;
   }
   ```

3. **Attempt Tracking**:

   - Each notification log tracks `attempts`, `lastAttemptAt`, `sentAt`
   - Failed notifications can be manually retried

4. **Email Disclaimers**:
   > "This is an automated transactional message. Please do not reply to this email."

**Security Considerations**:

- No sensitive data in emails (no passwords, payment details)
- Only registered email addresses receive notifications
- Platform provides connection only (not payment processing)

---

### Phase 5: Future Phone Notifications (Prepared)

**Objective**: Allow SMS/WhatsApp notifications without current implementation

**Deliverables**:

- Phone number field in user profile (already exists)
- Channel support in notification logs (`EMAIL` / `SMS`)
- Documentation for SMS integration

**Implementation Path**:

When ready to add SMS notifications:

1. **Update User Profile** - Ensure phone numbers are validated and stored
2. **Add SMS Provider** - Integrate Twilio, AWS SNS, or similar
3. **Update Cloud Functions** - Add SMS sending logic:

```javascript
if (notification.channel === "SMS") {
  await sendSMS({
    to: recipient.phoneNumber,
    message: getSMSTemplate(notification.eventType, data),
  });
}
```

4. **User Consent** - Add opt-in checkbox for SMS notifications
5. **Rate Limiting** - Prevent SMS abuse (more expensive than email)

**SMS Template Example**:

```
Farm To Table: Your deal for [Product Name] has been confirmed.
Log in to view details. Deal ID: [DealID]
```

---

## Database Schema

### notification_logs Collection

```javascript
{
  id: string,                    // Auto-generated document ID
  eventType: string,             // 'DEAL_CONFIRMED' | 'DEAL_COMPLETED'
  dealId: string,                // Reference to deals collection
  recipientId: string,           // User ID receiving notification
  channel: string,               // 'EMAIL' | 'SMS'
  status: string,                // 'PENDING' | 'SENT' | 'FAILED'
  createdAt: timestamp,          // When queued
  attempts: number,              // Send attempt count
  lastAttemptAt: timestamp,      // Last send attempt
  sentAt: timestamp,             // Successful send time
  errorMessage: string | null,   // Error details if failed
}
```

**Firestore Indexes**:

```
Collection: notification_logs
- eventType (ASC) + dealId (ASC) + recipientId (ASC)
- recipientId (ASC) + createdAt (DESC)
- dealId (ASC) + createdAt (DESC)
```

---

## Deployment Steps

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### Step 2: Initialize Firebase Functions

```bash
cd functions
npm install
```

### Step 3: Configure Email Service

Choose and configure one email provider:

**SendGrid**:

```bash
firebase functions:config:set sendgrid.key="YOUR_SENDGRID_API_KEY"
```

**AWS SES**:

```bash
firebase functions:config:set aws.access_key="YOUR_ACCESS_KEY"
firebase functions:config:set aws.secret_key="YOUR_SECRET_KEY"
```

**SMTP**:

```bash
firebase functions:config:set smtp.user="your_email@gmail.com"
firebase functions:config:set smtp.password="your_app_password"
```

### Step 4: Deploy Functions

```bash
firebase deploy --only functions
```

### Step 5: Verify Deployment

```bash
firebase functions:log
```

### Step 6: Test Notifications

1. Create a deal between two test accounts
2. Confirm deal as buyer
3. Confirm deal as farmer
4. Check Firebase logs for email sending
5. Verify notification_logs collection populated

---

## Testing

### Local Testing with Firebase Emulator

```bash
cd functions
npm run serve
```

This starts:

- Functions emulator on http://localhost:5001
- Firestore emulator on http://localhost:8080

**Test Workflow**:

1. Update a deal document to trigger `onDealConfirmation`
2. Check emulator logs for notification log creation
3. Verify `processNotification` is triggered
4. Inspect notification_logs for status updates

### Manual Testing Checklist

- [ ] User confirms deal (buyer side)
- [ ] User confirms deal (farmer side)
- [ ] Both confirmations trigger single notification pair
- [ ] Emails sent to both parties
- [ ] Email content is correct (names, product, deal ID)
- [ ] Notification logs show SENT status
- [ ] Duplicate confirmation doesn't resend emails
- [ ] Failed email shows FAILED status with error message

---

## Monitoring & Maintenance

### Firebase Console Monitoring

1. **Functions Dashboard**: `https://console.firebase.google.com/project/YOUR_PROJECT/functions`

   - View function execution count
   - Monitor errors and crashes
   - Check execution time

2. **Firestore Database**: Check `notification_logs` collection

   - Filter by status (FAILED) to see errors
   - Monitor growth rate
   - Set up cleanup for old logs (>30 days)

3. **Functions Logs**: `firebase functions:log`
   - Real-time error tracking
   - Debug notification issues

### Recommended Alerts

- Email send failures > 5% of attempts
- Function execution errors
- Firestore read/write quota approaching limit
- Email service API quota warnings

---

## Cost Considerations

### Firebase Functions Pricing

- **Free Tier**: 2M invocations/month, 400K GB-seconds
- **Estimated Usage**:
  - 2 function calls per deal confirmation
  - Average 100 deals/day = 6,000 calls/month
  - Well within free tier

### Email Service Pricing

**SendGrid**:

- Free: 100 emails/day
- Essentials: $15/month for 50K emails

**AWS SES**:

- $0.10 per 1,000 emails
- 100 deals/day = 200 emails/day = $0.60/month

**Recommendation**: Start with SendGrid free tier, migrate to AWS SES if volume grows

---

## Limitations & Future Enhancements

### Current Limitations

1. **Email Only**: No SMS or push notifications
2. **Deal Confirmation Only**: No other event types
3. **No User Preferences**: Can't disable notifications
4. **No Notification Center**: No in-app notification UI
5. **Basic Templates**: Simple email formatting

### Planned Enhancements

**Version 10.1**:

- [ ] Add notification preferences to user profile
- [ ] Support notification muting
- [ ] Add unsubscribe link to emails

**Version 10.2**:

- [ ] In-app notification center
- [ ] Real-time notification badge
- [ ] Mark notifications as read

**Version 11.0**:

- [ ] SMS notifications (opt-in)
- [ ] WhatsApp Business integration
- [ ] Advanced email templates with branding

---

## Troubleshooting

### Email Not Sending

**Check**:

1. Firebase Functions deployed: `firebase deploy --only functions`
2. Email service configured: `firebase functions:config:get`
3. Recipient has email in profile
4. Check `notification_logs` for error messages
5. Review Firebase Functions logs: `firebase functions:log`

**Common Issues**:

- Email service API key invalid
- Sender email not verified (AWS SES)
- Recipient email bounced/blocked
- Functions quota exceeded

### Duplicate Notifications

**Check**:

1. `onDealConfirmation` logic validates state transition
2. `isDuplicateNotification` is working correctly
3. No manual notification log creation bypassing checks

**Fix**: Add composite index on `notification_logs`:

```javascript
eventType + dealId + recipientId + status;
```

### Function Not Triggering

**Check**:

1. Functions deployed successfully
2. Firestore collection name matches (`deals`, `notification_logs`)
3. Document path matches trigger pattern
4. Firebase project has billing enabled (required for external APIs)

---

## References

- [Firebase Cloud Functions Documentation](https://firebase.google.com/docs/functions)
- [Firestore Triggers](https://firebase.google.com/docs/functions/firestore-events)
- [SendGrid Node.js Library](https://github.com/sendgrid/sendgrid-nodejs)
- [AWS SES SDK](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/ses-examples.html)
- [Nodemailer Documentation](https://nodemailer.com/about/)

---

## Support

For questions or issues with notification implementation:

- Check Firebase Functions logs first
- Review `notification_logs` collection for error details
- Consult email service provider documentation
- Reference this implementation guide

---

**Document Status**: Complete  
**Next Review**: Post-deployment after email service integration
