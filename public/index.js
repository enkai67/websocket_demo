const WebSocketManager = (function () {
    let ws;
    const url = `ws://${window.location.host}`;

    const connect = () => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
            ws = new WebSocket(url);

            ws.onopen = () => {
                console.log("[open connection]");
            };

            ws.onclose = () => {
                console.log("[close connection]");
            };

            ws.onmessage = (event) => {
                console.log(`[Message from server]: ${event.data}`);
                updateDisplay(event.data);
            };

            ws.onerror = (error) => {
                console.error("WebSocket error: ", error);
            };
        } else {
            console.log("WebSocket is already connected.");
        }
    };

    const disconnect = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.close();
        } else {
            console.log("WebSocket is not initialized or already closed.");
        }
    };

    const send = (message) => {
        if (!message) {
            console.log("empty message");
            return;
        } 
        
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        } else {
            console.log("WebSocket is not connected.");
        }
    };

    const updateDisplay = (message) => {
        const showDom = document.querySelector("#txtShow");
        console.log(showDom);
        if (!showDom.value) showDom.value = message;
        else showDom.value += "\n" + message;
        showDom.scrollTop = showDom.scrollHeight;
        document.querySelector("#txtInput").value = "";
    };

    return {
        connect,
        disconnect,
        send
    };
})();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btnSend").addEventListener("click", () => {
        const txt = document.querySelector("#txtInput").value;
        WebSocketManager.send(txt);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const txt = document.querySelector("#txtInput").value;
            WebSocketManager.send(txt);
        }
    });

    document.querySelector("#connect")?.addEventListener("click", () => {
        WebSocketManager.connect();
    });

    document.querySelector("#disconnect")?.addEventListener("click", () => {
        WebSocketManager.disconnect();
    });

    WebSocketManager.connect();
});
