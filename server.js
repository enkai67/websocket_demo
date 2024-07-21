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

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4();
};

wss.on("connection", (ws) => {
    console.log("New client connected");
    ws.send("Welcome to the WebSocket server!");
    ws.id = wss.getUniqueID();

    ws.on("message", (data) => {
        console.log("[Message from client] data: ", data);
        wss.clients.forEach((client) => {
            client.send(`${ws.id}: ` + data);
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected");
    });
});
