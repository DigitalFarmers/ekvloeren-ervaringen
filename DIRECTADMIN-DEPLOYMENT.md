# DirectAdmin Deployment Guide

This guide will help you deploy your Next.js application on DirectAdmin hosting with minimal configuration.

## Quick Setup Steps

### 1. Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Export static files (if using static export)
npm run export
```

### 2. Upload Files to DirectAdmin

1. Connect to your DirectAdmin file manager or FTP
2. Navigate to your public_html directory
3. Upload the contents of the `.next` folder (or `out` folder if using static export)
4. Upload the `public` folder contents

### 3. Configure Environment Variables

Create a `.env` file in your hosting root directory:

```env
# Database (use your hosting's MySQL/MariaDB)
DATABASE_URL=mysql://username:password@localhost:3306/database_name

# Admin Password
ADMIN_PASSWORD=your_secure_admin_password_here

# Email (optional - use your hosting's SMTP)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

### 4. Database Setup

1. Log into DirectAdmin control panel
2. Go to "MySQL Management" or "MariaDB Management"
3. Create a new database and user
4. Import the SQL scripts from the `scripts` folder:
   - `scripts/001-create-tables.sql`
   - `scripts/002-update-schema.sql`

### 5. File Permissions

Set the following permissions via DirectAdmin file manager or FTP:
- All files: 644
- All directories: 755

## Alternative: Static Export (Recommended for DirectAdmin)

For easier deployment, you can export the site as static HTML:

### 1. Update next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
```

### 2. Build and Export

```bash
npm run build
npm run export
```

### 3. Upload Static Files

Upload the contents of the `out` folder to your `public_html` directory.

## Troubleshooting

### 404 Errors
- Ensure `.htaccess` file is properly configured
- Check that all files have correct permissions

### Database Connection Issues
- Verify database credentials in `.env` file
- Ensure database user has proper permissions
- Check if database server is running

### File Upload Issues
- Verify upload directory permissions
- Check file size limits in DirectAdmin

## Required Server Features

Make sure your DirectAdmin hosting supports:
- Node.js (if not using static export)
- MySQL/MariaDB database
- PHP (for .htaccess processing)
- File upload capabilities

## Support

If you encounter issues:
1. Check DirectAdmin error logs
2. Verify all environment variables are set
3. Ensure database tables exist
4. Test with a simple HTML file first
