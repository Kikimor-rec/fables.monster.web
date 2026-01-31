# Newsletter Integration Setup Guide

This guide explains how to configure and use the Listmonk newsletter integration for Fables Monster Studio website.

## Table of Contents

1. [Overview](#overview)
2. [Environment Configuration](#environment-configuration)
3. [Listmonk Setup](#listmonk-setup)
4. [Custom Styling](#custom-styling)
5. [Pages & Features](#pages--features)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

## Overview

The website is integrated with [Listmonk](https://listmonk.app/), a self-hosted newsletter and mailing list manager. The integration includes:

- **Newsletter subscription form** in the footer (compact version)
- **Dedicated subscription page** with full form
- **Unsubscribe page** for managing subscriptions
- **Confirmation page** for post-subscription information
- **API routes** for handling subscriptions
- **Custom styling** matching the website's sci-fi neon theme

## Environment Configuration

### 1. Copy Environment Variables

```bash
cp .env.example .env.local
```

### 2. Configure Listmonk Variables

Edit `.env.local` and update the following variables:

```env
# Listmonk API base URL
LISTMONK_API_URL=https://news.fables.monster

# Listmonk API credentials
LISTMONK_API_USER=api_fables_site
LISTMONK_API_PASSWORD=RuV0UsHczmBDPDe7pWmUjbUPDpA7w6Sf

# Default mailing list ID (get from Listmonk admin)
LISTMONK_LIST_ID=1
```

### 3. Get Your List ID

1. Log in to Listmonk admin: `https://newsletter.fables.monster`
2. Go to **Lists** in the sidebar
3. Note the ID of your main mailing list (usually `1` for the first list)
4. Update `LISTMONK_LIST_ID` in your `.env.local`

## Listmonk Setup

### 1. Create API User

1. Log in to Listmonk admin
2. Go to **Settings** → **Users**
3. Create a new API user with appropriate permissions
4. Copy the username and password to your `.env.local`

### 2. Configure SMTP

In Listmonk admin:

1. Go to **Settings** → **SMTP**
2. Configure your SMTP server for sending emails
3. Test the connection

### 3. Create Mailing List

1. Go to **Lists** in the sidebar
2. Create a new list (e.g., "Main Newsletter")
3. Configure list settings:
   - **Type**: Public
   - **Opt-in**: Double opt-in (recommended)
   - Set a clear description

### 4. Configure Email Templates

1. Go to **Settings** → **Templates**
2. Customize the following templates to match your brand:
   - **Subscription confirmation email**
   - **Welcome email**
   - **Unsubscribe confirmation**

You can use HTML/CSS matching the website's style (see custom CSS files in `public/listmonk/`).

## Custom Styling

### Admin Panel Styling

1. Go to Listmonk admin: `https://newsletter.fables.monster`
2. Navigate to **Settings** → **Appearance**
3. Find the **Admin custom CSS** field
4. Copy the contents of `public/listmonk/admin-custom.css`
5. Paste into the field and save

### Public Pages Styling

1. In the same **Appearance** settings page
2. Find the **Public custom CSS** field
3. Copy the contents of `public/listmonk/public-custom.css`
4. Paste into the field and save

These CSS files provide:
- Dark theme with sci-fi neon aesthetics
- Custom colors (red accents, black backgrounds)
- Neon glow effects
- Custom fonts (Orbitron, Rajdhani, Nunito)
- Responsive design

## Pages & Features

### 1. Newsletter Subscription Page

**URL**: `/[lang]/newsletter/subscribe`

Features:
- Full subscription form
- Email (required) and Name (optional)
- Multi-language support (EN/RU)
- Benefits section explaining what subscribers get
- Server-side validation
- Rate limiting protection

### 2. Footer Subscription Form

**Location**: Every page footer

Features:
- Compact inline form
- Quick email-only subscription
- Success/error messages
- Multi-language support

### 3. Unsubscribe Page

**URL**: `/[lang]/newsletter/unsubscribe`

Features:
- Email-based unsubscribe
- UUID-based unsubscribe (from email links)
- Clear confirmation messages
- Multi-language support

### 4. Confirmation Page

**URL**: `/[lang]/newsletter/confirm`

Features:
- Post-subscription information
- Email verification reminder
- Success and pending states
- Clear call-to-action

## API Routes

### Subscribe Endpoint

**URL**: `/api/newsletter/subscribe`
**Method**: `POST`

**Request Body**:
```json
{
  "email": "user@example.com",
  "name": "John Doe",  // optional
  "lang": "en"         // optional, defaults to "en"
}
```

**Response** (Success):
```json
{
  "message": "Successfully subscribed! Please check your email to confirm.",
  "requiresConfirmation": true
}
```

**Response** (Error):
```json
{
  "error": "Validation failed",
  "details": [/* Zod validation errors */]
}
```

### Unsubscribe Endpoint

**URL**: `/api/newsletter/unsubscribe`
**Method**: `POST` or `GET`

**Request Body** (POST):
```json
{
  "email": "user@example.com"
}
```

Or use GET with UUID:
```
/api/newsletter/unsubscribe?uuid=subscriber-uuid
```

**Response** (Success):
```json
{
  "message": "Successfully unsubscribed from newsletter."
}
```

## Testing

### 1. Test Subscription Flow

1. Visit `/en/newsletter/subscribe`
2. Enter a test email address
3. Submit the form
4. Check for confirmation email
5. Click confirmation link in email
6. Verify subscription in Listmonk admin

### 2. Test Footer Form

1. Visit any page on the website
2. Scroll to footer
3. Enter email in newsletter field
4. Verify success message
5. Check Listmonk admin for new subscriber

### 3. Test Unsubscribe

1. Visit `/en/newsletter/unsubscribe`
2. Enter subscribed email
3. Verify unsubscribe confirmation
4. Check Listmonk admin to confirm status change

### 4. Test API Directly

```bash
# Test subscription
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "lang": "en"
  }'

# Test unsubscribe
curl -X POST http://localhost:3000/api/newsletter/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

## Troubleshooting

### Issue: "Newsletter service not configured"

**Solution**: Check that all Listmonk environment variables are set in `.env.local`:
- `LISTMONK_API_URL`
- `LISTMONK_API_USER`
- `LISTMONK_API_PASSWORD`
- `LISTMONK_LIST_ID`

### Issue: "Failed to subscribe" error

**Possible causes**:
1. **Listmonk service is down**: Check if `https://news.fables.monster` is accessible
2. **Invalid API credentials**: Verify username/password in `.env.local`
3. **Wrong list ID**: Check that the list ID exists in Listmonk
4. **CORS issues**: Ensure Listmonk allows requests from your domain

**Debug steps**:
1. Check server logs: `npm run dev` or production logs
2. Test Listmonk API directly:
   ```bash
   curl -u "username:password" https://news.fables.monster/api/lists
   ```
3. Verify API user has correct permissions in Listmonk admin

### Issue: "Rate limit exceeded"

**Solution**: The API has rate limiting (5 requests per 60 seconds per IP). Wait a minute and try again. For production, consider using Redis for rate limiting.

### Issue: Styling not applied in Listmonk

**Solution**:
1. Verify you copied the CSS correctly to Listmonk settings
2. Clear browser cache
3. Check for CSS conflicts in browser DevTools
4. Ensure custom CSS is enabled in Listmonk settings

### Issue: Emails not sending

**Solution**:
1. Check SMTP configuration in Listmonk admin
2. Test SMTP connection in Listmonk
3. Check spam folder
4. Verify sender domain is not blacklisted
5. Review Listmonk logs for email errors

### Issue: Double opt-in not working

**Solution**:
1. Check that list is configured for double opt-in
2. Verify confirmation email template is configured
3. Test email sending
4. Check Listmonk logs for errors

## Best Practices

1. **Use double opt-in**: Recommended for legal compliance (GDPR, CAN-SPAM)
2. **Regular backups**: Backup Listmonk database regularly
3. **Monitor bounce rates**: Keep an eye on email bounces and clean your list
4. **Test emails**: Always test campaigns before sending to full list
5. **Respect unsubscribes**: Process unsubscribe requests immediately
6. **Privacy policy**: Ensure you have a clear privacy policy explaining data usage
7. **Rate limiting**: Monitor API usage and adjust rate limits as needed
8. **Security**: Keep Listmonk updated and use strong API passwords

## Additional Resources

- [Listmonk Documentation](https://listmonk.app/docs/)
- [Listmonk API Reference](https://listmonk.app/docs/apis/)
- [GDPR Compliance Guide](https://gdpr.eu/)
- [CAN-SPAM Act Compliance](https://www.ftc.gov/tips-advice/business-center/guidance/can-spam-act-compliance-guide-business)

## Support

For issues or questions:
- Check Listmonk logs: `docker logs listmonk` (if using Docker)
- Review website logs for API errors
- Contact: info@fables.monster
- Discord: [Join our Discord](https://discord.gg/eAwK9DfKf4)
