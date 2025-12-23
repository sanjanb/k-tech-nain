# Future Phone Notifications - Design Document

**Version**: 10.0 (Future Feature)  
**Status**: Design Only - Not Implemented  
**Last Updated**: December 23, 2025

---

## Overview

This document outlines the design and implementation path for adding SMS and WhatsApp notifications to the Farm To Table platform. This feature is **not currently implemented** but the system is designed to support it in the future.

---

## Current State

### What's Ready

1. **User Profile Schema**:
   - `phoneNumber` field already exists in user documents
   - Currently optional, no validation

2. **Notification Log Schema**:
   - `channel` field supports `'EMAIL'` and `'SMS'`
   - Infrastructure ready for multi-channel notifications

3. **Template System**:
   - Email templates in place
   - SMS template structure can follow same pattern

### What's Missing

1. **Phone number validation** - No format checks
2. **SMS service integration** - No provider configured
3. **User consent mechanism** - No opt-in for SMS
4. **Rate limiting** - SMS more expensive than email
5. **SMS templates** - Need concise message formats
6. **Cost monitoring** - SMS charges per message

---

## Design Goals

1. **Opt-in Only**: Users must explicitly enable SMS notifications
2. **Cost Awareness**: Clear pricing displayed to users
3. **Fallback to Email**: SMS failures don't block notifications
4. **Rate Limited**: Prevent abuse and cost overruns
5. **Multi-Provider**: Support multiple SMS providers

---

## User Flow

### 1. Enable SMS Notifications

```
User Profile Page
    ↓
"Enable SMS Notifications" toggle
    ↓
Phone number input + validation
    ↓
Send verification code via SMS
    ↓
User enters code
    ↓
Phone number verified and saved
    ↓
SMS notifications enabled
```

### 2. Receive SMS Notification

```
Deal Confirmed
    ↓
Check user preferences
    ↓
User has SMS enabled? → Send SMS
User has email only? → Send Email
Both enabled? → Send both
    ↓
Log notification attempt
    ↓
Update notification status
```

---

## Technical Implementation

### Phase 1: Phone Number Validation

**File**: `lib/phoneValidation.js`

```javascript
export function validatePhoneNumber(phone) {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Indian mobile number
  // Format: +91 followed by 10 digits
  const regex = /^(?:\+91|91)?[6-9]\d{9}$/;
  
  return regex.test(cleaned);
}

export function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  
  // Add +91 prefix if not present
  if (!cleaned.startsWith('91') && cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  
  if (cleaned.startsWith('91') && cleaned.length === 12) {
    return `+${cleaned}`;
  }
  
  return `+${cleaned}`;
}
```

**Usage in Profile Page**:
```javascript
const handlePhoneNumberChange = (value) => {
  setEditPhone(value);
  
  if (validatePhoneNumber(value)) {
    setPhoneError('');
  } else {
    setPhoneError('Please enter a valid Indian mobile number');
  }
};
```

---

### Phase 2: SMS Provider Integration

#### Option A: Twilio (Recommended)

**Cost**: $0.0079 per SMS in India

**Setup**:
```bash
cd functions
npm install twilio
```

**Configuration**:
```bash
firebase functions:config:set twilio.account_sid="YOUR_ACCOUNT_SID"
firebase functions:config:set twilio.auth_token="YOUR_AUTH_TOKEN"
firebase functions:config:set twilio.phone_number="+1234567890"
```

**Code** (`functions/smsService.js`):
```javascript
const twilio = require('twilio');

const client = twilio(
  functions.config().twilio.account_sid,
  functions.config().twilio.auth_token
);

async function sendSMS(phoneNumber, message) {
  try {
    const result = await client.messages.create({
      body: message,
      from: functions.config().twilio.phone_number,
      to: phoneNumber,
    });
    
    return { success: true, messageId: result.sid };
  } catch (error) {
    console.error('SMS send error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = { sendSMS };
```

#### Option B: AWS SNS

**Cost**: $0.00645 per SMS in India

**Setup**:
```bash
cd functions
npm install aws-sdk
```

**Code**:
```javascript
const AWS = require('aws-sdk');
const sns = new AWS.SNS({region: 'ap-south-1'});

async function sendSMS(phoneNumber, message) {
  const params = {
    Message: message,
    PhoneNumber: phoneNumber,
    MessageAttributes: {
      'AWS.SNS.SMS.SMSType': {
        DataType: 'String',
        StringValue: 'Transactional'
      }
    }
  };
  
  try {
    const result = await sns.publish(params).promise();
    return { success: true, messageId: result.MessageId };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

#### Option C: MSG91 (India-specific)

**Cost**: Starting at ₹0.10 per SMS

**Features**:
- India-focused
- DLT template registration
- OTP support

---

### Phase 3: SMS Templates

**File**: `lib/smsTemplates.js`

```javascript
export function getSMSTemplate(eventType, data) {
  const { productName, dealId, recipientRole } = data;
  
  switch (eventType) {
    case 'DEAL_CONFIRMED':
      return recipientRole === 'farmer'
        ? `Farm2Table: Deal confirmed for ${productName}. Check your dashboard for buyer details. ID: ${dealId}`
        : `Farm2Table: Deal confirmed for ${productName}. Check your dashboard for payment info. ID: ${dealId}`;
    
    case 'DEAL_COMPLETED':
      return `Farm2Table: Deal ${dealId} marked complete. Leave feedback in your dashboard.`;
    
    default:
      return `Farm2Table: Update on deal ${dealId}. Login to view details.`;
  }
}

// Character limit check (SMS limit: 160 chars)
export function validateSMSLength(message) {
  return message.length <= 160;
}
```

**SMS Length Guidelines**:
- Single SMS: 160 characters
- Concatenated SMS: 153 characters per segment
- Unicode (Hindi): 70 characters per SMS

---

### Phase 4: User Preferences UI

**File**: `app/profile/page.jsx` (additions)

```javascript
// Add to state
const [smsEnabled, setSmsEnabled] = useState(false);
const [phoneVerified, setPhoneVerified] = useState(false);
const [verificationCode, setVerificationCode] = useState('');
const [sentVerificationCode, setSentVerificationCode] = useState('');

// Verification flow
const sendVerificationCode = async () => {
  if (!validatePhoneNumber(editPhone)) {
    alert('Please enter a valid phone number');
    return;
  }
  
  // Generate 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  setSentVerificationCode(code);
  
  // Send SMS with verification code
  const message = `Farm To Table verification code: ${code}. Valid for 10 minutes.`;
  
  // TODO: Call SMS service
  console.log('Sending SMS:', message, 'to', editPhone);
  
  alert('Verification code sent!');
};

const verifyPhone = () => {
  if (verificationCode === sentVerificationCode) {
    setPhoneVerified(true);
    alert('Phone number verified!');
  } else {
    alert('Invalid verification code');
  }
};

const saveSMSPreferences = async () => {
  if (!phoneVerified) {
    alert('Please verify your phone number first');
    return;
  }
  
  await updateDoc(doc(db, 'users', user.uid), {
    phoneNumber: formatPhoneNumber(editPhone),
    phoneVerified: true,
    notificationPreferences: {
      email: true,
      sms: smsEnabled,
    }
  });
  
  alert('SMS preferences saved!');
};
```

**UI Component**:
```jsx
{/* SMS Notification Section (Farmer Profile) */}
{userData?.role === 'farmer' && (
  <div style={styles.section}>
    <h3>SMS Notifications (Optional)</h3>
    
    <div style={styles.infoBox}>
      <p>Receive instant SMS when deals are confirmed.</p>
      <p><strong>Cost:</strong> Free for first 100 SMS/month, then ₹0.10/SMS</p>
    </div>
    
    <label style={styles.label}>
      <input
        type="checkbox"
        checked={smsEnabled}
        onChange={(e) => setSmsEnabled(e.target.checked)}
        disabled={!phoneVerified}
      />
      Enable SMS Notifications
    </label>
    
    {!phoneVerified && (
      <div style={styles.verificationSection}>
        <input
          type="tel"
          placeholder="+91 98765 43210"
          value={editPhone}
          onChange={(e) => setEditPhone(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendVerificationCode} style={styles.button}>
          Send Verification Code
        </button>
        
        {sentVerificationCode && (
          <>
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={styles.input}
            />
            <button onClick={verifyPhone} style={styles.button}>
              Verify
            </button>
          </>
        )}
      </div>
    )}
    
    {phoneVerified && (
      <p style={styles.successText}>
        ✓ Phone number verified: {editPhone}
      </p>
    )}
  </div>
)}
```

---

### Phase 5: Cloud Function Updates

**File**: `functions/index.js` (modifications)

```javascript
exports.processNotification = functions.firestore
  .document('notification_logs/{notificationId}')
  .onCreate(async (snap, context) => {
    const notification = snap.data();
    
    // Get recipient preferences
    const recipientDoc = await db.collection('users').doc(notification.recipientId).get();
    const recipient = recipientDoc.data();
    
    // Check if SMS enabled and phone verified
    const shouldSendSMS = 
      notification.channel === 'SMS' &&
      recipient.notificationPreferences?.sms &&
      recipient.phoneVerified &&
      recipient.phoneNumber;
    
    if (shouldSendSMS) {
      // Send SMS
      const smsMessage = getSMSTemplate(notification.eventType, {
        productName: product.cropName,
        dealId: deal.id,
        recipientRole: recipient.role,
      });
      
      const smsResult = await sendSMS(recipient.phoneNumber, smsMessage);
      
      if (smsResult.success) {
        await snap.ref.update({
          status: 'SENT',
          sentAt: admin.firestore.FieldValue.serverTimestamp(),
          messageId: smsResult.messageId,
        });
      } else {
        // Fallback to email if SMS fails
        await sendEmail(emailData);
        
        await snap.ref.update({
          status: 'SENT',
          sentVia: 'EMAIL_FALLBACK',
          smsError: smsResult.error,
        });
      }
    } else {
      // Send email as usual
      await sendEmail(emailData);
    }
  });
```

---

### Phase 6: Rate Limiting

**Prevent SMS abuse and cost overruns**

**File**: `functions/rateLimiter.js`

```javascript
const MAX_SMS_PER_USER_PER_DAY = 10;
const MAX_SMS_GLOBAL_PER_DAY = 500;

async function checkSMSRateLimit(userId) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Check user limit
  const userSMSQuery = await db.collection('notification_logs')
    .where('recipientId', '==', userId)
    .where('channel', '==', 'SMS')
    .where('createdAt', '>=', today)
    .get();
  
  if (userSMSQuery.size >= MAX_SMS_PER_USER_PER_DAY) {
    return { allowed: false, reason: 'User daily limit exceeded' };
  }
  
  // Check global limit
  const globalSMSQuery = await db.collection('notification_logs')
    .where('channel', '==', 'SMS')
    .where('createdAt', '>=', today)
    .get();
  
  if (globalSMSQuery.size >= MAX_SMS_GLOBAL_PER_DAY) {
    return { allowed: false, reason: 'Platform daily limit exceeded' };
  }
  
  return { allowed: true };
}
```

---

## Cost Analysis

### SMS Pricing Comparison

| Provider | Cost per SMS (India) | Free Tier | Notes |
|----------|---------------------|-----------|-------|
| Twilio | $0.0079 (₹0.66) | None | Global, reliable |
| AWS SNS | $0.00645 (₹0.54) | None | AWS ecosystem |
| MSG91 | ₹0.10 | 100 credits | India-specific |
| Firebase Extensions | ₹0.85 | None | Easy setup |

### Monthly Cost Estimates

**Scenario: 100 deals/day = 200 SMS/day**

- Twilio: 200 × ₹0.66 × 30 = ₹3,960/month
- AWS SNS: 200 × ₹0.54 × 30 = ₹3,240/month
- MSG91: 200 × ₹0.10 × 30 = ₹600/month

**Recommendation**: Start with MSG91 for Indian market

---

## Security Considerations

1. **Phone Verification**:
   - Require SMS verification before enabling
   - Store verification timestamp
   - Limit verification attempts (3 per hour)

2. **Rate Limiting**:
   - 10 SMS per user per day
   - 500 SMS global per day
   - Block suspicious patterns

3. **Opt-out**:
   - Easy disable in profile
   - Respect user preferences
   - Include STOP keyword in SMS

4. **Data Privacy**:
   - Encrypt phone numbers at rest
   - Never share with third parties
   - Clear consent language

---

## Compliance

### TRAI DLT Registration (India)

For commercial SMS in India, you must:

1. Register with telecom operator
2. Get sender ID approved
3. Register message templates
4. Obtain DLT credentials

**Cost**: ₹2,500 - ₹5,000 initial setup

**Timeline**: 7-15 days

**Required for**: All commercial SMS in India

---

## Rollout Plan

### Version 10.1: SMS Foundation
- [ ] Add phone validation
- [ ] Create SMS templates
- [ ] Add user preferences UI
- [ ] Test with dummy SMS service

### Version 10.2: SMS Beta
- [ ] Integrate MSG91/Twilio
- [ ] Enable for verified users only
- [ ] Monitor costs and delivery rates
- [ ] Gather user feedback

### Version 11.0: SMS Production
- [ ] Complete DLT registration
- [ ] Add WhatsApp Business API
- [ ] Implement advanced rate limiting
- [ ] Launch to all users

---

## References

- [Twilio SMS API](https://www.twilio.com/docs/sms)
- [AWS SNS Documentation](https://docs.aws.amazon.com/sns/)
- [MSG91 Integration Guide](https://docs.msg91.com/)
- [TRAI DLT Guidelines](https://www.trai.gov.in/blockchain-based-distributed-ledger-technology)

---

**Status**: Design complete, implementation pending user demand  
**Next Action**: Gather user feedback on SMS notification interest
