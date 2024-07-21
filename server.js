import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Start the HTTP server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Set up WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.send("Welcome to the WebSocket server!");

    ws.on("message", (data) => {
        console.log("[Message from client] data: ", data);
        let clients = wss.clients;
        clients.forEach((client) => {
            client.send(`${ws.id}: ` + data);
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
