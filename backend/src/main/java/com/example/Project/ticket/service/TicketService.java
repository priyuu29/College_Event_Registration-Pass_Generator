package com.example.Project.ticket.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class TicketService {

    private Map<String, Boolean> db = new HashMap<>();

    public String generateTicket(String name, String email) {
        String token = UUID.randomUUID().toString();
        db.put(token, false);
        return token;
    }

    public String verify(String token) {
        if (!db.containsKey(token)) return "Invalid";
        if (db.get(token)) return "Already Used";

        db.put(token, true);
        return "Entry Allowed";
    }
}