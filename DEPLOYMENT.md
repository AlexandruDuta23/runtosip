# RunToSip Deployment Guide

## 🚀 Complete Backend + Frontend Deployment

This guide will help you deploy the RunToSip website with a complete backend API that automatically saves all changes made through the admin panel.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)
- A server with SSH access
- Domain name (optional but recommended)

## 🏗️ Project Structure

```
runtosip2-main/
├── src/                    # Frontend React code
├── server.js              # Backend API server
├── package.json           # Frontend dependencies
├── package-server.json    # Backend dependencies
├── data.json             # Database file (auto-created)
├── uploads/              # Uploaded images directory
├── dist/                 # Built frontend (after build)
└── ecosystem.config.js   # PM2 configuration
```

## 🔧 Backend Features

### ✅ Complete API Endpoints
- **Events**: CRUD operations + join functionality
- **Articles**: Full content management
- **Photos**: Gallery management with image uploads
- **Crew**: Team member management
- **File Uploads**: Automatic image resizing and storage

### ✅ Data Persistence
- All data automatically saved to `data.json`
- File uploads stored in `uploads/` directory
- Automatic data initialization on first run

### ✅ Image Processing
- Automatic resizing for different content types
- Optimized file sizes
- Proper aspect ratio maintenance

## 🚀 Deployment Steps

### 1. Local Preparation

```bash
# Clone or download your project
cd runtosip2-main

# Run the deployment script
chmod +x deploy.sh
./deploy.sh
```

### 2. Server Setup

#### Install Node.js on your server:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs
```

#### Install PM2 (Process Manager):
```bash
sudo npm install -g pm2
```

### 3. Upload Files

Upload all project files to your server:
```bash
# Using SCP
scp -r runtosip2-main/* user@your-server:/var/www/runtosip/

# Or using SFTP/File Manager
# Upload the entire project folder
```

### 4. Server Configuration

#### Navigate to your project directory:
```bash
cd /var/www/runtosip
```

#### Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cp package-server.json package.json
npm install
```

#### Set up PM2:
```bash
# Start the server
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### 5. Nginx Configuration

Create an Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/runtosip
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Frontend static files
    location / {
        root /var/www/runtosip/dist;
        try_files $uri $uri/ /index.html;
    }

    # API endpoints
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploaded files
    location /uploads {
        alias /var/www/runtosip/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/runtosip /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 6. SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## 🔧 Management Commands

### PM2 Commands:
```bash
pm2 start ecosystem.config.js    # Start server
pm2 stop runtosip-server        # Stop server
pm2 restart runtosip-server     # Restart server
pm2 logs runtosip-server        # View logs
pm2 monit                       # Monitor processes
pm2 delete runtosip-server      # Remove from PM2
```

### File Management:
```bash
# Backup data
cp data.json data.json.backup

# Restore data
cp data.json.backup data.json

# View logs
tail -f ~/.pm2/logs/runtosip-server-out.log
tail -f ~/.pm2/logs/runtosip-server-error.log
```

## 📊 API Endpoints

### Test the API:
```bash
curl http://your-domain.com/api/test
```

### Available Endpoints:
- `GET /api/data` - Get all data
- `GET /api/events` - Get events
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/join` - Join event
- `GET /api/articles` - Get articles
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- `GET /api/photos` - Get photos
- `POST /api/photos` - Create photo
- `PUT /api/photos/:id` - Update photo
- `DELETE /api/photos/:id` - Delete photo
- `GET /api/crew` - Get crew members
- `POST /api/crew` - Create crew member
- `PUT /api/crew/:id` - Update crew member
- `DELETE /api/crew/:id` - Delete crew member
- `POST /api/upload` - Upload image

## 🔐 Admin Access

- **URL**: `http://your-domain.com`
- **Admin Password**: `kawasaki1822`
- **Access**: Click "Admin" button in footer

## 🛠️ Troubleshooting

### Common Issues:

1. **Port 3001 not accessible**:
   ```bash
   sudo ufw allow 3001
   ```

2. **PM2 not starting**:
   ```bash
   pm2 delete runtosip-server
   pm2 start ecosystem.config.js
   ```

3. **Nginx 502 error**:
   ```bash
   sudo systemctl status nginx
   sudo tail -f /var/log/nginx/error.log
   ```

4. **File permissions**:
   ```bash
   sudo chown -R www-data:www-data /var/www/runtosip
   sudo chmod -R 755 /var/www/runtosip
   ```

5. **Data not persisting**:
   ```bash
   # Check if data.json exists and is writable
   ls -la data.json
   # Ensure proper permissions
   chmod 644 data.json
   ```

## 📈 Monitoring

### Check server status:
```bash
pm2 status
pm2 monit
```

### View logs:
```bash
pm2 logs runtosip-server
```

### Monitor system resources:
```bash
htop
df -h
free -h
```

## 🔄 Updates

To update your deployment:

1. **Upload new files** to your server
2. **Restart the application**:
   ```bash
   pm2 restart runtosip-server
   ```
3. **Check logs** for any errors:
   ```bash
   pm2 logs runtosip-server
   ```

## 🎉 Success!

Your RunToSip website is now fully deployed with:
- ✅ Complete backend API
- ✅ Automatic data persistence
- ✅ Image upload and resizing
- ✅ Admin panel functionality
- ✅ Production-ready setup

**Your website**: `http://your-domain.com`
**Your API**: `http://your-domain.com/api`

All changes made through the admin panel will be automatically saved and persisted on the server! 🚀 