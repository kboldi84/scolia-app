package com.example.websocket_demo;

import org.springframework.web.socket.WebSocketSession;
import java.util.concurrent.ConcurrentHashMap;

public class SessionRegistry {

    // clientId → WebSocketSession
    private static final ConcurrentHashMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    public static void addSession(String clientId, WebSocketSession session) {
        sessions.put(clientId, session);
    }

    public static void removeSession(String clientId) {
        sessions.remove(clientId);
    }

    public static WebSocketSession getSession(String clientId) {
        return sessions.get(clientId);
    }

    public static Iterable<WebSocketSession> getAllSessions() {
        return sessions.values();
    }
}

