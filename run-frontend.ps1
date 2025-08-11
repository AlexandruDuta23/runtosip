# RunToSip Frontend-Only Runner
# This script runs your frontend application without backend

Write-Host "🚀 RunToSip Frontend-Only Development" -ForegroundColor Green
Write-Host ""

Write-Host "📋 Configuration:" -ForegroundColor Cyan
Write-Host "✅ Frontend: React + Vite + TypeScript" -ForegroundColor White
Write-Host "✅ Styling: Tailwind CSS" -ForegroundColor White
Write-Host "✅ Routing: React Router" -ForegroundColor White
Write-Host "✅ Icons: Lucide React" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Available Features:" -ForegroundColor Cyan
Write-Host "✅ Events: Static events with join functionality" -ForegroundColor White
Write-Host "✅ Home Page: Hero, About, Schedule sections" -ForegroundColor White
Write-Host "✅ Language Toggle: English/Romanian" -ForegroundColor White
Write-Host "✅ Responsive Design: Mobile-friendly" -ForegroundColor White
Write-Host ""

Write-Host "⚠️  Disabled Features:" -ForegroundColor Yellow
Write-Host "❌ Articles: Coming soon placeholder" -ForegroundColor White
Write-Host "❌ Crew Members: Coming soon placeholder" -ForegroundColor White
Write-Host "❌ Gallery: Coming soon placeholder" -ForegroundColor White
Write-Host "❌ Admin Panel: Simplified version" -ForegroundColor White
Write-Host ""

Write-Host "🌐 Your application will be available at:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:5173" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Starting frontend development server..." -ForegroundColor Yellow
Write-Host ""

# Start the frontend development server
npm run dev
