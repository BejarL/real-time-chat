// server.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Initialize a new Express application
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Broadcast to all clients
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

// Handle WebSocket connections
wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // Ensure message is sent as text
        wss.broadcast(message.toString());
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
