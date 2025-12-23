# Notification System - Feature Overview

**Version**: 10.0  
**Status**: Implemented (Email Service Integration Pending)  
**Feature Category**: Communication  
**Last Updated**: December 23, 2025

---

## Summary

The Notification System enables automated email notifications when deals are confirmed between farmers and buyers. This feature improves user engagement and provides timely updates without requiring users to constantly check the platform.

---

## Key Features

### Current Implementation

1. **Email Notifications**

   - Sent when both parties confirm a deal
   - Personalized templates for farmers and buyers
   - Plain text and HTML versions
   - Transactional messaging only

2. **Event Tracking**

   - All notifications logged in Firestore
   - Success/failure status tracked
   - Attempt count and timestamps recorded
   - Idempotency to prevent duplicates

3. **User Feedback**

   - Confirmation messages in UI
   - Notification status visible to users
   - No intrusive popups or interruptions

4. **Backend Automation**
   - Firebase Cloud Functions handle sending
   - Triggered by Firestore document changes
   - Automatic retry on temporary failures
   - Error logging for debugging

### Planned Features (Future)

- **SMS Notifications** (v10.1)
- **WhatsApp Integration** (v11.0)
- **In-app Notification Center** (v10.2)
- **User Preferences** (v10.1)
- **Push Notifications** (v11.0)

---

## User Benefits

### For Farmers

- Instant notification when buyer confirms deal
- No need to check dashboard constantly
- Clear next steps in email
- Deal ID for reference

### For Buyers

- Immediate confirmation when farmer accepts
- Payment information reminder
- Direct link to deal details
- Peace of mind that transaction is progressing

---

## How It Works

### Step-by-Step Flow

1. **Buyer Interest**

   - Buyer expresses interest in product
   - Deal record created in Firestore
   - Status: Pending

2. **Buyer Confirmation**

   - Buyer clicks "Confirm Deal"
   - Updates `buyerConfirmed = true`
   - No notification yet (waiting for farmer)

3. **Farmer Confirmation**

   - Farmer reviews deal in dashboard
   - Clicks "Confirm Deal"
   - Updates `farmerConfirmed = true`
   - **Triggers notification system**

4. **Notification Processing**

   - Cloud Function detects both confirmations
   - Creates two notification logs (buyer + farmer)
   - Second Cloud Function sends emails
   - Updates logs with send status

5. **User Receives Email**
   - Both parties receive email
   - Subject: "Deal Confirmed - ..."
   - Body contains:
     - Product name
     - Other party name
     - Deal ID
     - Next steps

---

## Technical Architecture

### Components

**Client-Side** (`/lib`):

- `notificationEvents.js` - Constants and helpers
- `notificationTemplates.js` - Email templates
- `notificationService.js` - Client utilities

**Server-Side** (`/functions`):

- `onDealConfirmation` - Monitors deal updates
- `processNotification` - Sends emails

**Database**:

- `notification_logs` collection
- Indexed for quick queries

**Frontend** (`/app`):

- Updated confirmation messages
- Future: Notification center UI

### Data Flow

```
User Action → Firestore Update → Cloud Function Trigger
→ Email Service → Update Status → User Receives Email
```

---

## Email Templates

### Deal Confirmation (Farmer)

**Subject**: Deal Confirmed - Buyer is Ready to Proceed

**Body**:

> Hello [Farmer Name],
>
> Great news! Your deal has been confirmed.
>
> Product: [Crop Name]  
> Buyer: [Buyer Name]  
> Deal ID: [ABC123]
>
> Both you and the buyer have confirmed this deal. You can now coordinate with the buyer for payment and delivery arrangements.
>
> [View Deal Details Button]

### Deal Confirmation (Buyer)

**Subject**: Deal Confirmed - Farmer Accepted Your Request

**Body**:

> Hello [Buyer Name],
>
> Great news! Your deal has been confirmed.
>
> Product: [Crop Name]  
> Farmer: [Farmer Name]  
> Deal ID: [ABC123]
>
> Both you and the farmer have confirmed this deal. You can now proceed with payment and coordinate delivery with the farmer.
>
> [View Deal Details Button]

---

## Configuration

### Required Setup

1. **Firebase Functions**

   - Billing enabled
   - Functions deployed
   - Environment configured

2. **Email Service**

   - Provider account (SendGrid/AWS SES/SMTP)
   - API key configured
   - Sender email verified

3. **Firestore Indexes**
   - Composite index on notification_logs
   - Required for deduplication queries

### Environment Variables

```bash
# SendGrid
firebase functions:config:set sendgrid.key="YOUR_API_KEY"

# AWS SES
firebase functions:config:set aws.access_key="YOUR_KEY"
firebase functions:config:set aws.secret_key="YOUR_SECRET"

# SMTP
firebase functions:config:set smtp.user="your_email"
firebase functions:config:set smtp.password="your_password"
```

---

## Usage Examples

### For Developers

**Queue a manual notification**:

```javascript
import { queueNotification } from "@/lib/notificationService";

await queueNotification("DEAL_CONFIRMED", dealId, userId, "EMAIL");
```

**Check notification history**:

```javascript
import { getDealNotificationHistory } from "@/lib/notificationService";

const history = await getDealNotificationHistory(dealId);
console.log(history); // Array of notification logs
```

**Verify notification sent**:

```javascript
import { hasReceivedNotification } from "@/lib/notificationService";

const sent = await hasReceivedNotification(userId, "DEAL_CONFIRMED", dealId);
```

---

## Monitoring

### Firebase Console

**Functions Dashboard**:

- Total invocations
- Error rate
- Execution time
- Cost tracking

**Firestore Database**:

- View `notification_logs` collection
- Filter by status: `FAILED`
- Check error messages

**Functions Logs**:

```bash
firebase functions:log
```

### Key Metrics

- Notification success rate: >95%
- Average send time: <2 seconds
- Duplicate rate: <1%
- User engagement: Email open rate

---

## Troubleshooting

### Common Issues

**Emails not sending**:

1. Check Firebase Functions deployed
2. Verify email service credentials
3. Confirm sender email verified
4. Review function logs for errors

**Duplicate emails**:

1. Check idempotency logic
2. Verify Firestore index created
3. Review notification_logs for duplicates

**Delayed notifications**:

1. Check Firebase billing enabled
2. Monitor function execution time
3. Verify email service response time

---

## Best Practices

### For Users

- Keep email address up to date
- Check spam folder if not received
- Note deal ID for reference
- Don't rely solely on notifications

### For Developers

- Always check notification logs
- Monitor error rates
- Set up alerts for failures
- Test with multiple email providers
- Implement graceful degradation

---

## Limitations

### Current Constraints

1. **Email Only**: No SMS or push notifications yet
2. **Deal Confirmation Only**: No other event types
3. **No User Preferences**: Can't disable notifications
4. **Single Language**: English only
5. **Basic Templates**: Limited formatting options

### By Design

- **No Real-time Chat**: Platform is connection-only
- **No Marketing Emails**: Transactional only
- **No Third-party Access**: User data stays private
- **No Spam**: One email per event maximum

---

## Future Roadmap

### Version 10.1

- [ ] SMS notifications (opt-in)
- [ ] User notification preferences
- [ ] Unsubscribe link in emails
- [ ] Multi-language support

### Version 10.2

- [ ] In-app notification center
- [ ] Real-time notification badges
- [ ] Mark as read/unread
- [ ] Notification history UI

### Version 11.0

- [ ] WhatsApp Business API
- [ ] Push notifications (mobile)
- [ ] Advanced email templates
- [ ] Notification analytics dashboard

---

## Cost Estimates

### Email Services

**SendGrid Free Tier**:

- 100 emails/day
- Cost: $0
- Good for: 50 deals/day

**AWS SES**:

- $0.10 per 1,000 emails
- Example: 200 emails/day = $0.60/month
- Good for: Unlimited scale

**Recommendation**: Start free, upgrade as needed

### Firebase Functions

- Free tier: 2M invocations/month
- Expected: ~6K invocations/month
- Cost: $0 (well within limits)

---

## Security & Privacy

### Data Protection

- No sensitive data in emails
- User consent for email notifications
- Secure email transmission (TLS)
- No third-party tracking

### Compliance

- Transactional emails (no opt-in required)
- Unsubscribe option in footer
- Privacy policy linked
- GDPR-friendly design

---

## Support

### Documentation

- [Setup Guide](./setup-guide.md)
- [Implementation Guide](../../03-implementation-guides/version-10.0-implementation-guide.md)
- [Phone Notifications Design](./phone-notifications-design.md)

### Getting Help

1. Check Firebase Functions logs
2. Review `notification_logs` collection
3. Test with emulator locally
4. Consult email provider docs

---

## Changelog

### Version 10.0 (December 23, 2025)

- Initial notification system implementation
- Email templates for deal confirmation
- Firebase Cloud Functions integration
- Notification logging and tracking
- Frontend feedback messages

---

**Feature Status**: Production-ready (pending email service integration)  
**Last Tested**: December 23, 2025  
**Maintainer**: Development Team
