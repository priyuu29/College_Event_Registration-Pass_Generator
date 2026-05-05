package com.example.Project.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendMail(String to, byte[] qr) {

        // Mock email for practical
        System.out.println("==================================");
        System.out.println("Email Sent to: " + to);
        System.out.println("QR Code attached (simulated)");
        System.out.println("==================================");
    }
}