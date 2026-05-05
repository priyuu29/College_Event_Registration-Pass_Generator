package com.example.Project.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class AttendeeService {

    private final Map<String, Boolean> db = new HashMap<>();
    private final QRService qrService;
    private final EmailService emailService;

    public AttendeeService(QRService qrService, EmailService emailService) {
        this.qrService = qrService;
        this.emailService = emailService;
    }

    public String register(com.example.Project.dto.AttendeeDTO dto) {
        String token = UUID.randomUUID().toString();
        db.put(token, false);

        try {
            byte[] qr = qrService.generateQR(token);
            emailService.sendMail(dto.email, qr);
        } catch (Exception e) {}

        return token;
    }

    public String scan(String token) {
        if (!db.containsKey(token)) return "Invalid QR";
        if (db.get(token)) return "Already Used";

        db.put(token, true);
        return "Entry Allowed";
    }
}