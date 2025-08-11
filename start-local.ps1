# RunToSip Local Development Script
# This script starts both frontend and backend on localhost

Write-Host "🚀 Starting RunToSip locally..." -ForegroundColor Green
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
Write-Host "📋 To start your application:" -ForegroundColor Cyan
Write-Host "1. Open a new terminal and run: node server.js" -ForegroundColor White
Write-Host "2. Open another terminal and run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Your app will be available at:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "   Backend API: http://localhost:3001" -ForegroundColor White
Write-Host "🔑 Admin password: kawasaki1822" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to start the backend server..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Start backend server
Write-Host "🔧 Starting backend server on port 3001..." -ForegroundColor Yellow
node server.js
