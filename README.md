# websocket_demo

This project sets up a simple WebSocket server using Node.js, Express, and the `ws` library. It includes a basic HTML client that allows users to connect to the WebSocket server, send messages, and view messages from all connected clients in real-time.

## Features

- **Real-time communication:** Users can see messages from all connected clients in real-time.
- **Unique Client IDs:** Each client is assigned a unique ID based on their WebSocket connection for easy identification.
- **Broadcasting:** Messages sent by any client are broadcast to all connected clients.