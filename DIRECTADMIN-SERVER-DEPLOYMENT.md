# DirectAdmin Server Deployment Guide

This guide covers deploying your Next.js application with Server Actions on DirectAdmin using Node.js.

## 🚀 Server-Side Deployment (Required for Server Actions)

Since your application uses Server Actions, you need Node.js hosting instead of static export.

### Prerequisites

Your DirectAdmin hosting must support:
- ✅ Node.js (version 18+)
- ✅ Process Manager (PM2 recommended)
- ✅ PostgreSQL connection (Neon works remotely)

### Step 1: Build the Application

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

### Step 2: Upload Files to DirectAdmin

1. Connect to DirectAdmin via SSH or FTP
2. Create a directory for your app: `/home/username/ekvloeren-app`
3. Upload all project files except `node_modules`
4. Upload `.next` folder from your local build

### Step 3: Install Dependencies on Server

```bash
# SSH into your DirectAdmin server
cd /home/username/ekvloeren-app

# Install production dependencies
npm install --production
```

### Step 4: Configure Environment Variables

Create `.env` file on the server:

```env
# Your Neon Database URL
DATABASE_URL=postgresql://neondb_owner:npg_CRlU5J8ipvyT@ep-wispy-lab-ageuxc3j-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# Admin Password
ADMIN_PASSWORD=your_secure_admin_password_here

# Email (optional)
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=noreply@yourdomain.com

# Vercel Blob (for file uploads)
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

### Step 5: Setup Database

1. Your Neon database is already configured
2. Import the SQL scripts via any PostgreSQL client:
   - `scripts/001-create-tables.sql`
   - `scripts/002-update-schema.sql`

### Step 6: Start the Application

#### Option A: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "ekvloeren-app" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Option B: Direct Node.js

```bash
# Start the application
npm start
```

### Step 7: Configure Reverse Proxy

Add this to your domain's `.htaccess` or DirectAdmin proxy configuration:

```apache
# Proxy Node.js app to port 3000
RewriteEngine On
RewriteCond %{HTTP_HOST} ^yourdomain\.com [NC]
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

Or ask DirectAdmin support to set up a proxy from your domain to `localhost:3000`.

### Step 8: Configure PM2 for Auto-Restart

Create `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [{
    name: 'ekvloeren-app',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
```

Start with: `pm2 start ecosystem.config.js`

## 🔧 DirectAdmin Setup Options

### Option 1: Dedicated Node.js App
- Ask your hosting provider to enable Node.js for your account
- Use the steps above

### Option 2: Subdomain Setup
- Create a subdomain like `app.yourdomain.com`
- Point it to your Node.js application

### Option 3: Docker Container (Advanced)
- If DirectAdmin supports Docker
- Containerize your Next.js app

## 📊 Monitoring & Logs

```bash
# View application logs
pm2 logs ekvloeren-app

# Monitor application status
pm2 monit

# Restart application
pm2 restart ekvloeren-app
```

## 🛠️ Troubleshooting

### Application Won't Start
```bash
# Check Node.js version
node --version  # Should be 18+

# Check for missing dependencies
npm install

# Check environment variables
printenv | grep DATABASE_URL
```

### Database Connection Issues
- Verify Neon database is accessible from server
- Check firewall allows PostgreSQL connections
- Test connection: `psql "your_database_url"`

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Use different port in .env
PORT=3001 npm start
```

### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

## 📞 Getting Help

1. **DirectAdmin Support**: Ask about Node.js hosting options
2. **Check Logs**: `pm2 logs` for application errors
3. **Database**: Verify Neon connection from server
4. **Network**: Ensure port 3000 is accessible

---

**Your Next.js app with Server Actions is ready for DirectAdmin!** 🎉
