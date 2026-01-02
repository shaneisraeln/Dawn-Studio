# 🔐 Dawn HD Studio - Admin Portal Setup

## 📋 Overview
The admin portal provides two main features:
1. **Photo Management** - Upload and replace photos across all website sections
2. **Enquiry Management** - Receive and manage customer enquiries via email

## 🚀 Quick Start

### Access Admin Portal
1. Navigate to: `http://localhost:3000/admin`
2. **Demo Credentials:**
   - Username: `admin`
   - Password: `dawnhd2025`

## 📧 Email Integration Setup

### Option 1: EmailJS (Recommended for Frontend)
1. Create account at [EmailJS.com](https://www.emailjs.com/)
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template
4. Update `lib/emailConfig.js` with your credentials:
   ```javascript
   export const emailConfig = {
     publicKey: 'your_public_key_here',
     serviceId: 'your_service_id_here', 
     templateId: 'your_template_id_here',
     adminEmail: 'your-email@domain.com'
   }
   ```

### Option 2: Server-Side Email (Production)
For production, consider server-side email services:
- **Nodemailer** with Gmail/SMTP
- **SendGrid** API
- **AWS SES**
- **Resend** (modern alternative)

## 📷 Photo Management

### Current Structure
```
public/images/
├── slideshow/     (3 photos - Hero section)
├── prewedding/    (6 photos - Pre-wedding gallery)
├── wedding/       (6 photos - Wedding gallery)
├── school/        (4 photos - School functions)
├── family/        (6 photos - Family gallery)
└── idcards/       (2 photos - ID card samples)
```

### How It Works
1. **View Photos**: Select a section to see current photos
2. **Replace Photos**: Click "Replace Photo" to upload new images
3. **Supported Formats**: JPG, PNG, WebP
4. **Recommended Size**: 1920x1080 for best quality

### Production Setup
For production, integrate with cloud storage:
- **AWS S3** + CloudFront
- **Cloudinary** (image optimization)
- **Vercel Blob** (if using Vercel)

## 🔒 Security Considerations

### Current Demo Security
- Simple username/password authentication
- Client-side token storage
- **NOT suitable for production**

### Production Security
Implement proper authentication:
```bash
npm install next-auth
# or
npm install @clerk/nextjs
# or
npm install @supabase/auth-helpers-nextjs
```

## 🛠️ Development

### File Structure
```
app/
├── admin/
│   └── page.jsx           # Admin portal entry
├── api/
│   └── enquiry/
│       └── route.js       # API endpoint for enquiries
components/
├── admin/
│   ├── AdminLogin.jsx     # Login component
│   ├── AdminDashboard.jsx # Main dashboard
│   ├── PhotoManager.jsx   # Photo management
│   └── EnquiryManager.jsx # Enquiry management
lib/
└── emailConfig.js         # Email configuration
```

### Adding New Features
1. **Database Integration**: Add MongoDB/PostgreSQL for enquiry storage
2. **File Upload**: Integrate with cloud storage for photo uploads
3. **Analytics**: Add visitor tracking and enquiry analytics
4. **Backup**: Implement photo backup system

## 📝 Email Template Setup

### EmailJS Template Example
```
Subject: New Enquiry - Dawn HD Studio

Dear Admin,

You have received a new enquiry:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
City: {{city}}

Message:
{{message}}

Please respond promptly.

Best regards,
Dawn HD Studio Website
```

## 🚨 Important Notes

1. **Demo Mode**: Current setup is for demonstration
2. **Email Setup Required**: Configure EmailJS for working email
3. **Photo Uploads**: Currently client-side only (temporary)
4. **Security**: Implement proper auth for production
5. **Database**: Add database for persistent enquiry storage

## 🎯 Production Checklist

- [ ] Set up proper authentication (NextAuth, Clerk, etc.)
- [ ] Configure email service (EmailJS, SendGrid, etc.)
- [ ] Add database for enquiry storage
- [ ] Implement cloud storage for photos
- [ ] Add input validation and sanitization
- [ ] Set up backup systems
- [ ] Add logging and monitoring
- [ ] Implement rate limiting
- [ ] Add HTTPS and security headers

## 📞 Support

For technical support or customization:
- Email: support@porygonsol.com
- Website: https://porygonsol.com

---
Made with ❤️ by [Porygon](https://porygonsol.com)