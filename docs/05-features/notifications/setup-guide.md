# Notification System - Setup Instructions

## Quick Start

This document provides step-by-step instructions to enable email notifications in the Farm To Table platform.

---

## Prerequisites

- Firebase project set up with Firestore and Functions enabled
- Billing enabled on Firebase (required for external API calls)
- Email service provider account (SendGrid, AWS SES, or SMTP credentials)
- Firebase CLI installed: `npm install -g firebase-tools`

---

## Step 1: Install Dependencies

```bash
cd functions
npm install
```

This installs:
- `firebase-admin` - Firebase Admin SDK
- `firebase-functions` - Cloud Functions SDK

---

## Step 2: Choose Email Provider

### Option A: SendGrid (Recommended for Beginners)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Get free API key (100 emails/day)
3. Verify sender email address
4. Install SendGrid SDK:
   ```bash
   cd functions
   npm install @sendgrid/mail
   ```

5. Configure Firebase:
   ```bash
   firebase functions:config:set sendgrid.key="YOUR_API_KEY"
   ```

6. Update `functions/index.js`:
   ```javascript
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(functions.config().sendgrid.key);
   
   async function sendEmail(emailData) {
     await sgMail.send({
       to: emailData.to,
       from: 'your-verified-email@example.com',
       subject: emailData.subject,
       text: emailData.text,
       html: emailData.html,
     });
   }
   ```

### Option B: AWS SES (Best for Production)

1. Set up AWS account
2. Verify domain or email in SES console
3. Get AWS access keys
4. Install AWS SDK:
   ```bash
   cd functions
   npm install aws-sdk
   ```

5. Configure Firebase:
   ```bash
   firebase functions:config:set aws.access_key="YOUR_ACCESS_KEY"
   firebase functions:config:set aws.secret_key="YOUR_SECRET_KEY"
   firebase functions:config:set aws.region="us-east-1"
   ```

6. Update `functions/index.js`:
   ```javascript
   const AWS = require('aws-sdk');
   const ses = new AWS.SES({
     region: functions.config().aws.region,
     accessKeyId: functions.config().aws.access_key,
     secretAccessKey: functions.config().aws.secret_key,
   });
   
   async function sendEmail(emailData) {
     await ses.sendEmail({
       Source: 'notifications@yourdomain.com',
       Destination: { ToAddresses: [emailData.to] },
       Message: {
         Subject: { Data: emailData.subject },
         Body: {
           Text: { Data: emailData.text },
           Html: { Data: emailData.html }
         }
       }
     }).promise();
   }
   ```

### Option C: Gmail/SMTP (Simple Testing)

1. Enable 2-factor auth on Gmail
2. Generate app password
3. Install Nodemailer:
   ```bash
   cd functions
   npm install nodemailer
   ```

4. Configure Firebase:
   ```bash
   firebase functions:config:set smtp.user="your-email@gmail.com"
   firebase functions:config:set smtp.password="your-app-password"
   ```

5. Update `functions/index.js`:
   ```javascript
   const nodemailer = require('nodemailer');
   const transporter = nodemailer.createTransporter({
     service: 'gmail',
     auth: {
       user: functions.config().smtp.user,
       pass: functions.config().smtp.password,
     }
   });
   
   async function sendEmail(emailData) {
     await transporter.sendMail({
       from: functions.config().smtp.user,
       to: emailData.to,
       subject: emailData.subject,
       text: emailData.text,
       html: emailData.html,
     });
   }
   ```

---

## Step 3: Deploy Firebase Functions

```bash
# Make sure you're in project root
cd d:\Projects\k-tech-nain

# Login to Firebase
firebase login

# Initialize Firebase (if not done)
firebase init functions

# Deploy functions
firebase deploy --only functions
```

Expected output:
```
✔ functions[onDealConfirmation(us-central1)] Successful update operation.
✔ functions[processNotification(us-central1)] Successful create operation.
```

---

## Step 4: Create Firestore Index

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Navigate to Firestore Database
3. Click "Indexes" tab
4. Add composite index:
   - Collection: `notification_logs`
   - Fields:
     - `eventType` (Ascending)
     - `dealId` (Ascending)
     - `recipientId` (Ascending)
   - Query Scope: Collection

---

## Step 5: Test the System

### Manual Test

1. Create two test accounts:
   - Account A (Farmer): farmer@test.com
   - Account B (Buyer): buyer@test.com

2. Log in as Farmer:
   - Create a product listing
   - Note the product ID

3. Log in as Buyer:
   - Browse products
   - Express interest in farmer's product (creates deal)
   - Confirm the deal (sets `buyerConfirmed = true`)

4. Log in as Farmer:
   - Go to Farmer Dashboard
   - Confirm the deal (sets `farmerConfirmed = true`)

5. Check results:
   - Both accounts should receive email
   - Check Firebase Console > Firestore > `notification_logs`
   - Check Firebase Console > Functions > Logs

### Verify Firestore

Expected `notification_logs` entries:
```javascript
{
  eventType: "DEAL_CONFIRMED",
  dealId: "abc123",
  recipientId: "farmer-uid",
  channel: "EMAIL",
  status: "SENT",
  createdAt: [timestamp],
  sentAt: [timestamp],
  attempts: 1,
}

{
  eventType: "DEAL_CONFIRMED",
  dealId: "abc123",
  recipientId: "buyer-uid",
  channel: "EMAIL",
  status: "SENT",
  createdAt: [timestamp],
  sentAt: [timestamp],
  attempts: 1,
}
```

### Check Function Logs

```bash
firebase functions:log
```

Look for:
- "Processing notification: [notification-id]"
- "Would send email: [email-data]" (if email service not integrated)
- "Notification processed successfully"

---

## Step 6: Monitor and Troubleshoot

### View Function Execution

Firebase Console > Functions > Dashboard shows:
- Total invocations
- Execution time
- Error rate

### Common Issues

**Issue**: Functions not deploying
- **Fix**: Enable billing in Firebase Console
- **Fix**: Run `firebase login` again

**Issue**: Email not sending
- **Check**: Email service API key is correct
- **Check**: Sender email is verified
- **Check**: Recipient email is valid
- **Check**: Function logs for errors

**Issue**: Duplicate emails
- **Check**: Idempotency logic in `onDealConfirmation`
- **Check**: Firestore index is created

**Issue**: Functions timing out
- **Check**: Email service is responding
- **Check**: Firestore queries are optimized
- **Increase**: Function timeout in `firebase.json`

---

## Step 7: Production Checklist

Before going live:

- [ ] Email service production credentials configured
- [ ] Sender domain verified (for AWS SES)
- [ ] Firestore indexes created
- [ ] Functions deployed successfully
- [ ] Test emails received by both farmer and buyer
- [ ] Error handling tested (invalid email, service down)
- [ ] Firebase billing limits reviewed
- [ ] Email rate limits understood (SendGrid: 100/day free)
- [ ] Notification logs cleanup scheduled (>30 days old)

---

## Cost Estimates

### Firebase Functions
- Free tier: 2M invocations/month
- Expected: ~6K invocations/month (100 deals/day)
- Cost: $0 (within free tier)

### Email Service

**SendGrid Free**:
- 100 emails/day = 3,000/month
- Sufficient for ~1,500 deals/month
- Cost: $0

**AWS SES**:
- $0.10 per 1,000 emails
- 6,000 emails/month = $0.60/month
- Unlimited volume

**Recommendation**: Start with SendGrid free, migrate to AWS SES when volume exceeds 90 emails/day

---

## Next Steps

After notifications are working:

1. **Add notification preferences** - Let users opt-out
2. **Improve templates** - Better formatting, branding
3. **Add notification center** - In-app notification history
4. **Enable SMS** - For critical updates (optional)

---

## Support Resources

- [Firebase Functions Docs](https://firebase.google.com/docs/functions)
- [SendGrid Node.js Guide](https://github.com/sendgrid/sendgrid-nodejs)
- [AWS SES Developer Guide](https://docs.aws.amazon.com/ses/)
- [Nodemailer Documentation](https://nodemailer.com/)

---

**Last Updated**: December 23, 2025  
**Version**: 10.0
