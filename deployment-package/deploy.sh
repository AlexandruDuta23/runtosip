#!/bin/bash

echo "🚀 Deploying RunToSip to server..."

# Create necessary directories
mkdir -p uploads
mkdir -p logs

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create initial data.json if it doesn't exist
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

# Set proper permissions
chmod 644 data.json
chmod 755 uploads

echo "✅ Deployment package ready!"
echo ""
echo "📋 Next steps:"
echo "1. Upload this folder to your server"
echo "2. SSH into your server"
echo "3. Navigate to the uploaded folder"
echo "4. Run: chmod +x deploy.sh && ./deploy.sh"
echo "5. Start with PM2: pm2 start ecosystem.config.js" 