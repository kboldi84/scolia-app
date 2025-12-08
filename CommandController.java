package com.example.websocket_demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@RestController
@RequestMapping("/api/command")
public class CommandController {

    @PostMapping("/broadcast")
    public String broadcast(@RequestBody String msg) {
        System.out.println(msg);
        SessionRegistry.getAllSessions().forEach(session -> {
            try {
                session.sendMessage(new TextMessage(msg));
            } catch (Exception ignored) {}
        });
        return "Broadcast OK";
    }


    @PostMapping("/send/{clientId}")
    public String sendToClient(@PathVariable String clientId, @RequestBody String msg) {
        WebSocketSession session = SessionRegistry.getSession(clientId);

        if (session == null) {
            return "Client not found";
        }

        try {
            session.sendMessage(new TextMessage(msg));
            return "OK";
        } catch (Exception e) {
            return "Error";
        }
    }


}
