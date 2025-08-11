# RunToSip Localhost Development

## ✅ All Errors Fixed!

Your RunToSip application is now fully configured for localhost development.

## 🚀 Quick Start

### Option 1: Use the provided script
```powershell
.\run-localhost.ps1
```

### Option 2: Manual start
1. **Start Backend Server:**
   ```bash
   node server.js
   ```
   Backend will run on: http://localhost:3001

2. **Start Frontend Server (in a new terminal):**
   ```bash
   npm run dev
   ```
   Frontend will run on: http://localhost:5173

## 🌐 Access Your Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Admin Panel**: Click "Admin" button in footer
- **Admin Password**: `kawasaki1822`

## 🔧 What Was Fixed

### ✅ Frontend Issues
- Fixed `package.json` with correct Vite configuration
- Installed all required dependencies
- Added `@types/node` for TypeScript support
- Fixed build process

### ✅ Backend Issues
- Backend server runs on port 3001
- API endpoints working correctly
- File upload functionality ready

### ✅ DataContext Issues
- API_BASE_URL configured for localhost: `http://localhost:3001/api`
- All API calls will work with local backend
- No more server-specific configuration

### ✅ File Structure
- `data.json` - Initial data with sample event
- `uploads/` - Directory for uploaded images
- All TypeScript compilation working

## 📋 Available Features

- ✅ View events, articles, photos, and crew
- ✅ Add/edit/delete content through admin panel
- ✅ Image upload and resizing
- ✅ Join events functionality
- ✅ Bilingual support (English/Romanian)
- ✅ Responsive design

## 🛠️ Development Commands

```bash
# Build for production
npm run build

# Run development server
npm run dev

# Type checking
npx tsc --noEmit

# Linting (minor warnings can be ignored)
npm run lint
```

## 🎉 Ready to Use!

Your RunToSip application is now fully functional on localhost. You can:

1. **Test all features** locally
2. **Add content** through the admin panel
3. **Upload images** and see them resize automatically
4. **Join events** and see runner counts update
5. **Switch languages** between English and Romanian

Once you're satisfied with the local development, you can deploy to your Hetzner server at 95.217.153.74 using the deployment scripts.
