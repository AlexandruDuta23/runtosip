#!/bin/bash

echo "🚀 Setting up RunToSip on Ubuntu server..."

# Update system
sudo apt update

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install nginx
sudo apt install -y nginx

# Create web directory
mkdir -p /home/alexandruduta588/public_html
cd /home/alexandruduta588/public_html

# Create a simple React app structure
cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RunToSip</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f0f0f0; }
        .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { color: #333; text-align: center; }
        .status { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .upload-info { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏃‍♂️ RunToSip</h1>
        <div class="status">
            ✅ Server is running successfully!
        </div>
        <div class="upload-info">
            📁 Ready for your React app files
            <br>Upload the contents of your 'dist/' folder to this directory
        </div>
        <p>Server: Ubuntu on Hetzner Cloud</p>
        <p>IP: 95.217.153.74</p>
    </div>
</body>
</html>
EOF

# Configure nginx
sudo tee /etc/nginx/sites-available/runtosip << 'EOF'
server {
    listen 80;
    server_name 95.217.153.74;
    root /home/alexandruduta588/public_html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/runtosip /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

echo "✅ Setup complete!"
echo "🌐 Your site should be accessible at: http://95.217.153.74/"
echo ""
echo "📁 Upload your React app files to: /home/alexandruduta588/public_html/" 