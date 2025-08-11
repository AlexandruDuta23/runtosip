# RunToSip Local Development - Start Both Servers
# This script starts both frontend and backend on localhost

Write-Host "🚀 Starting RunToSip on localhost..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Create uploads directory if it doesn't exist
if (-not (Test-Path "uploads")) {
    New-Item -ItemType Directory -Path "uploads"
    Write-Host "📁 Created uploads directory" -ForegroundColor Green
}

# Create data.json if it doesn't exist
if (-not (Test-Path "data.json")) {
    Write-Host "📝 Creating initial data.json..." -ForegroundColor Yellow
    $initialData = @"
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
  "articles": [],
  "photos": [],
  "crewMembers": []
}
"@
    $initialData | Out-File -FilePath "data.json" -Encoding UTF8
}

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""

Write-Host "🔧 Starting backend server..." -ForegroundColor Yellow
Write-Host "   Backend will run on: http://localhost:3001" -ForegroundColor White

# Start backend server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; node server.js"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

Write-Host "🌐 Starting frontend server..." -ForegroundColor Yellow
Write-Host "   Frontend will run on: http://localhost:5173" -ForegroundColor White

# Start frontend server in current window
npm run dev
