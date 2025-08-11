# RunToSip Server Deployment

## 🚀 Quick Start

1. **Upload this folder** to your server at `/var/www/runtosip/`
2. **SSH into your server**:
   ```bash
   ssh root@95.217.153.74
   ```
3. **Navigate to the project**:
   ```bash
   cd /var/www/runtosip
   ```
4. **Run the deployment script**:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```
5. **Install PM2** (if not already installed):
   ```bash
   npm install -g pm2
   ```
6. **Start the server**:
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

## 📁 Files Included

- `dist/` - Built React frontend
- `server.js` - Express backend API
- `package.json` - Backend dependencies
- `ecosystem.config.js` - PM2 configuration
- `deploy.sh` - Deployment script

## 🔧 Server Management

### Start/Stop/Restart:
```bash
pm2 start runtosip-server    # Start
pm2 stop runtosip-server     # Stop
pm2 restart runtosip-server  # Restart
```

### View logs:
```bash
pm2 logs runtosip-server
```

### Monitor:
```bash
pm2 monit
```

## 🌐 Access

- **Website**: http://95.217.153.74
- **API**: http://95.217.153.74/api
- **Admin Password**: `kawasaki1822`

## 📊 API Endpoints

- `GET /api/test` - Server status
- `GET /api/data` - All data
- `GET /api/events` - Events list
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/events/:id/join` - Join event
- `GET /api/articles` - Articles list
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- `GET /api/photos` - Photos list
- `POST /api/photos` - Create photo
- `PUT /api/photos/:id` - Update photo
- `DELETE /api/photos/:id` - Delete photo
- `GET /api/crew` - Crew list
- `POST /api/crew` - Create crew member
- `PUT /api/crew/:id` - Update crew member
- `DELETE /api/crew/:id` - Delete crew member
- `POST /api/upload` - Upload image

## 🔐 Admin Access

1. Go to http://95.217.153.74
2. Click "Admin" button in footer
3. Enter password: `kawasaki1822`
4. Manage events, articles, photos, and crew

## 🛠️ Troubleshooting

### If server won't start:
```bash
pm2 delete runtosip-server
pm2 start ecosystem.config.js
```

### Check logs:
```bash
pm2 logs runtosip-server
```

### Check if port 3001 is in use:
```bash
netstat -tlnp | grep :3001
```

### Restart everything:
```bash
pm2 restart all
```

## 📈 Monitoring

```bash
pm2 status
pm2 monit
htop
```

## 🔄 Updates

To update the deployment:
1. Upload new files
2. Restart: `pm2 restart runtosip-server`
3. Check logs: `pm2 logs runtosip-server` 