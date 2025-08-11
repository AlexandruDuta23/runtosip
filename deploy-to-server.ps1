# RunToSip Deployment Script for Windows
# This script helps deploy your project to the Hetzner server

Write-Host "🚀 RunToSip Deployment Script" -ForegroundColor Green
Write-Host ""

# Build the frontend
Write-Host "📦 Building frontend..." -ForegroundColor Yellow
npm run build

if (-not (Test-Path "dist")) {
    Write-Host "❌ Build failed! dist folder not found." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Frontend built successfully!" -ForegroundColor Green

# Create deployment package
Write-Host "📁 Creating deployment package..." -ForegroundColor Yellow

# Create a temporary deployment directory
$deployDir = "temp-deploy"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir

# Copy built frontend
Copy-Item -Path "dist\*" -Destination $deployDir -Recurse -Force

# Copy server files
Copy-Item -Path "server.js" -Destination $deployDir -Force
Copy-Item -Path "package-server.json" -Destination "$deployDir\package.json" -Force

# Create PM2 ecosystem file
$ecosystemContent = @"
module.exports = {
  apps: [{
    name: 'runtosip-server',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
};
"@

$ecosystemContent | Out-File -FilePath "$deployDir\ecosystem.config.js" -Encoding UTF8

# Create start script
$startScript = @"
#!/bin/bash
echo "🚀 Starting RunToSip server..."

# Install dependencies
npm install

# Create uploads directory
mkdir -p uploads

# Create data.json if it doesn't exist
if [ ! -f "data.json" ]; then
    echo "Creating initial data.json..."
    cat > data.json << 'EOF'
{
  "events": [],
  "articles": [],
  "photos": [],
  "crewMembers": []
}
EOF
fi

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Server started successfully!"
echo "🌐 Your site is available at: http://95.217.153.74/"
echo "🔧 Admin panel: http://95.217.153.74/ (click Admin button)"
echo "🔑 Admin password: kawasaki1822"
"@

$startScript | Out-File -FilePath "$deployDir\start-server.sh" -Encoding UTF8

Write-Host "✅ Deployment package created in: $deployDir" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Upload the '$deployDir' folder contents to your server at 95.217.153.74" -ForegroundColor White
Write-Host "2. SSH into your server: ssh root@95.217.153.74" -ForegroundColor White
Write-Host "3. Navigate to /var/www/runtosip" -ForegroundColor White
Write-Host "4. Run: chmod +x start-server.sh && ./start-server.sh" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Server Commands:" -ForegroundColor Cyan
Write-Host "   pm2 start ecosystem.config.js    # Start server" -ForegroundColor White
Write-Host "   pm2 stop runtosip-server        # Stop server" -ForegroundColor White
Write-Host "   pm2 restart runtosip-server     # Restart server" -ForegroundColor White
Write-Host "   pm2 logs runtosip-server        # View logs" -ForegroundColor White
Write-Host ""

Write-Host "🌐 Your website will be available at: http://95.217.153.74/" -ForegroundColor Green
