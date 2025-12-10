# 📧 EmailJS Setup Instructions

## 🚀 Quick Setup (5 minutes)

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for FREE (200 emails/month)
3. Verify your email

### 2. Configure Email Service
1. In EmailJS Dashboard → **Email Services**
2. Click **Add New Service**
3. Choose **Gmail** (recommended) or your email provider
4. Connect your email account
5. Copy the **Service ID** (starts with `service_`)

### 3. Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

```
Subject: {{subject}}

New inquiry from KWForce website:

From: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}

Message:
{{message}}

---
Sent via KWForce Contact Form
```

4. Copy the **Template ID** (starts with `template_`)

### 4. Get Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key**

### 5. Update Configuration
Edit `script.js` and replace these values:

```javascript
const EMAILJS_CONFIG = {
    serviceID: 'your_service_id_here',
    templateID: 'your_template_id_here', 
    publicKey: 'your_public_key_here'
};
```

## ✅ Test the Form
1. Fill out the contact form on your website
2. Check your email for the message
3. If it fails, it will fallback to mailto automatically

## 🔧 Troubleshooting
- **Emails not sending**: Check console for errors
- **Template errors**: Verify template variable names match
- **Service issues**: Ensure email service is connected properly

## 📊 Features Included
- ✅ Real email sending (no client required)
- ✅ Professional loading states
- ✅ Automatic fallback to mailto
- ✅ Success/error feedback
- ✅ Form validation
- ✅ 200 free emails/month

## 🔒 Security
- All credentials are public-safe (EmailJS design)
- Rate limiting built-in
- No server required

