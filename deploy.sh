#!/bin/bash

# RunToSip Deployment Script
# This script builds and deploys both frontend and backend

echo "🚀 Starting RunToSip deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are available"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Build the frontend
echo "🔨 Building frontend..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Frontend build failed. dist folder not found."
    exit 1
fi

echo "✅ Frontend built successfully"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
if [ -f "package-server.json" ]; then
    cp package-server.json package.json
    npm install
    cp package.json package-frontend.json
    mv package-server.json package.json
    mv package-frontend.json package-frontend.json
else
    echo "❌ package-server.json not found"
    exit 1
fi

# Create production data.json if it doesn't exist
if [ ! -f "data.json" ]; then
    echo "📝 Creating initial data.json..."
    cat > data.json << 'EOF'
{
  "events": [
    {
      "id": 1,
      "title": "Herastrau Park Morning Run",
      "date": "2024-12-15",
      "time": "09:00",
      "location": "Herastrau Park",
      "distance": "5K - 8K",
      "difficulty": "All Levels",
      "coffeeStop": "Origo Coffee Shop",
      "description": "Beautiful lakeside run through Bucharest's largest park",
      "image": "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=800",
      "runnerCount": 15
    }
  ],
  "articles": [
    {
      "id": 1,
      "title": "The Perfect Pre-Run Breakfast",
      "titleRo": "Micul dejun perfect înainte de alergare",
      "excerpt": "Discover what to eat before your morning run to maximize performance and avoid digestive issues.",
      "excerptRo": "Descoperă ce să mănânci înainte de alergarea de dimineață pentru a maximiza performanța și a evita problemele digestive.",
      "author": "Maria Popescu",
      "date": "2024-12-10",
      "image": "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      "category": "Nutrition",
      "categoryRo": "Nutriție"
    }
  ],
  "photos": [
    {
      "id": 1,
      "url": "https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=400",
      "caption": "Sunday morning run through Herastrau Park"
    }
  ],
  "crewMembers": [
    {
      "id": 1,
      "name": "Alexandra",
      "role": "Founder",
      "roleRo": "Fondator",
      "description": "The visionary behind Run To Sip, passionate about building community through running.",
      "descriptionRo": "Vizionara din spatele Run To Sip, pasionată de construirea comunității prin alergare.",
      "image": "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      "instagram": "@alexandra_runtosip"
    }
  ]
}
EOF
fi

# Create uploads directory
mkdir -p uploads

# Create PM2 ecosystem file for production
echo "📝 Creating PM2 ecosystem file..."
cat > ecosystem.config.js << 'EOF'
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
EOF

echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Upload all files to your server"
echo "2. Install PM2: npm install -g pm2"
echo "3. Start the server: pm2 start ecosystem.config.js"
echo "4. Set up nginx to proxy to port 3001"
echo ""
echo "🌐 Your API will be available at: http://your-domain.com/api"
echo "📱 Your website will be available at: http://your-domain.com"
echo ""
echo "🔧 Server management commands:"
echo "   pm2 start ecosystem.config.js    # Start server"
echo "   pm2 stop runtosip-server        # Stop server"
echo "   pm2 restart runtosip-server     # Restart server"
echo "   pm2 logs runtosip-server        # View logs"
echo "   pm2 monit                       # Monitor processes" 