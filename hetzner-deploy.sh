#!/bin/bash

echo "🚀 Setting up RunToSip on Hetzner Ubuntu Server..."

# Update system
apt update

# Install nginx
apt install -y nginx

# Create web directory
mkdir -p /var/www/runtosip
cd /var/www/runtosip

# Create a test page
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RunToSip - Server Ready</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            max-width: 600px; 
            background: white; 
            padding: 40px; 
            border-radius: 15px; 
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
        }
        h1 { 
            color: #333; 
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        .success { 
            background: #d4edda; 
            color: #155724; 
            padding: 15px; 
            border-radius: 8px; 
            margin: 20px 0;
            font-size: 1.2em;
        }
        .info {
            background: #d1ecf1;
            color: #0c5460;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .server-info {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏃‍♂️ RunToSip</h1>
        <div class="success">✅ Server is running successfully!</div>
        <div class="info">
            📁 Ready for React app deployment<br>
            Upload your 'dist/' folder contents to this directory
        </div>
        <div class="server-info">
            <strong>Server Details:</strong><br>
            🌐 IP: 95.217.153.74<br>
            🖥️ OS: Ubuntu 24.04 LTS<br>
            🚀 Web Server: Nginx<br>
            📍 Location: Helsinki, Finland
        </div>
    </div>
</body>
</html>
EOF

# Configure nginx
cat > /etc/nginx/sites-available/runtosip << 'EOF'
server {
    listen 80;
    server_name 95.217.153.74;
    root /var/www/runtosip;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
}
EOF

# Enable the site
ln -sf /etc/nginx/sites-available/runtosip /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# Restart nginx
systemctl restart nginx

# Enable nginx to start on boot
systemctl enable nginx

# Check status
systemctl status nginx

echo "✅ Setup complete!"
echo "🌐 Your site is now accessible at: http://95.217.153.74/"
echo ""
echo "📁 Upload your React app files to: /var/www/runtosip/"
echo ""
echo "🔧 Next steps:"
echo "1. Upload your 'dist/' folder contents to /var/www/runtosip/"
echo "2. Your React app will be live at http://95.217.153.74/" 