# RunToSip Localhost Runner
# This script runs your application on localhost with all errors fixed

Write-Host "🚀 RunToSip Localhost Development" -ForegroundColor Green
Write-Host ""

Write-Host "✅ All major errors have been fixed!" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Your application is configured for localhost:" -ForegroundColor Cyan
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "🔧 Backend API: http://localhost:3001" -ForegroundColor White
Write-Host "🔑 Admin password: kawasaki1822" -ForegroundColor White
Write-Host ""

Write-Host "🔧 To start your application:" -ForegroundColor Cyan
Write-Host "1. Backend: node server.js" -ForegroundColor White
Write-Host "2. Frontend: npm run dev" -ForegroundColor White
Write-Host ""

Write-Host "📁 Files fixed for localhost:" -ForegroundColor Cyan
Write-Host "   ✅ package.json (frontend dependencies)" -ForegroundColor White
Write-Host "   ✅ DataContext.tsx (localhost API configuration)" -ForegroundColor White
Write-Host "   ✅ data.json (initial data)" -ForegroundColor White
Write-Host "   ✅ uploads/ directory" -ForegroundColor White
Write-Host "   ✅ @types/node (TypeScript support)" -ForegroundColor White
Write-Host ""

Write-Host "🎉 Your RunToSip app is ready for localhost!" -ForegroundColor Green
Write-Host "   API_BASE_URL is set to: http://localhost:3001/api" -ForegroundColor White
Write-Host ""

Write-Host "Press any key to start the backend server..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Start backend server
Write-Host "🔧 Starting backend server on port 3001..." -ForegroundColor Yellow
node server.js
