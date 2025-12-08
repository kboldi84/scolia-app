package com.example.websocket_demo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.socket.*;
import org.springframework.web.socket.handler.TextWebSocketHandler;

public class CommandWebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        System.out.println("Új kliens csatlakozott: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        SessionRegistry.getAllSessions().forEach(s -> {
            if (s.getId().equals(session.getId())) {
                SessionRegistry.removeSession(session.getId());
            }
        });
        System.out.println("Kliens bontotta: " + session.getId());
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        var payload = message.getPayload();
        var cmd = mapper.readTree(payload);

        String type = cmd.get("type").asText();

        if (type.equals("REGISTER")) {
            String clientId = cmd.get("clientId").asText();
            SessionRegistry.addSession(clientId, session);
            System.out.println("Regisztrált kliens: " + clientId);
            session.sendMessage(new TextMessage("{\"status\":\"registered\"}"));
            return;
        }

        // Itt jönnek a parancsok kezelése
        System.out.println("Kliens üzenet: " + payload);
    }
}
