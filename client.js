const WebSocket = require("ws");

const clientId = "electron-01"; // vagy generáld gépenként

let ws = new WebSocket("ws://localhost:8080/command");

ws.on("open", () => {
    console.log("Kapcsolódva.");

    // Kliens regisztrálja magát
    ws.send(JSON.stringify({
        type: "REGISTER",
        clientId
    }));
});

ws.on("message", msg => {
    const data = JSON.parse(msg);
    console.log("Szerver üzenet:", data);

    switch (data.type) {
        case "ALERT":
            console.log("Érkezett ALERT:", data.payload);
            break;

        case "RUN_TASK":
            runSomeTask(data.payload);
            break;
    }
});