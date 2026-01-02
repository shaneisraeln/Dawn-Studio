// Email Configuration
// Replace these with your actual EmailJS credentials

export const emailConfig = {
    // EmailJS Configuration
    publicKey: 'CLUux0PeGPFZApusl',
    serviceId: 'service_xpaj038',
    templateId: 'template_lh2cxpe',

    // Admin Settings
    adminEmail: 'dawnhdstudio@gmail.com',

    // Email Template for EmailJS
    // Create a template in EmailJS with these variables:
    templateVariables: {
        from_name: '{{from_name}}',
        from_email: '{{from_email}}',
        phone: '{{phone}}',
        city: '{{city}}',
        message: '{{message}}',
        to_email: '{{to_email}}'
    }
}

// Sample EmailJS Template:
/*
Subject: New Enquiry from Dawn HD Studio Website

Hello,

You have received a new enquiry from your website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
City: {{city}}

Message:
{{message}}

Please respond to this enquiry as soon as possible.

Best regards,
Dawn HD Studio Website
*/