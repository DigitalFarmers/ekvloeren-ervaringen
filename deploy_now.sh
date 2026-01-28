#!/bin/bash

echo "🚀 Starting Deployment..."

# 1. Add all changes (just in case)
git add .

# 2. Commit any remaining changes
git commit -m "Final polish for deployment" 2>/dev/null

# 3. Push to GitHub
echo "📡 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
  echo "✅ SUCCES! Je code staat live."
  echo "Ga naar Vercel om de build te checken."
else
  echo "❌ FOUT: Er ging iets mis met pushen."
  echo "Check of je internet werkt en probeer 'git push origin main' zelf."
fi
