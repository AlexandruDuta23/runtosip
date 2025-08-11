#!/bin/bash

echo "🚀 Starting RunToSip Server..."

# Check if server is already running
if pm2 list | grep -q "runtosip-server"; then
    echo "🛑 Stopping existing server..."
    pm2 delete runtosip-server
fi

# Start the server directly
echo "📡 Starting server on port 3001..."
pm2 start server.js --name "runtosip-server" --env production

# Save PM2 configuration
pm2 save

echo "✅ Server started successfully!"
echo "🌐 Website: http://95.217.153.74"
echo "📊 API: http://95.217.153.74/api/test"
echo "🔐 Admin password: kawasaki1822"

# Show status
pm2 status 