#!/bin/bash

# EK Vloeren App - Server Startup Script for DirectAdmin

echo "🚀 Starting EK Vloeren Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to 18+"
    exit 1
fi

echo "✅ Node.js version $NODE_VERSION detected"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --production
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create it with your database credentials."
    echo "Copy env-example.txt to .env and update the values."
    exit 1
fi

# Create logs directory if it doesn't exist
mkdir -p logs

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 process manager..."
    npm install -g pm2
fi

# Start the application with PM2
echo "🔄 Starting application with PM2..."
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup

echo "✅ Application started successfully!"
echo "📊 Monitor with: pm2 monit"
echo "📋 View logs with: pm2 logs ekvloeren-app"
echo "🔄 Restart with: pm2 restart ekvloeren-app"
