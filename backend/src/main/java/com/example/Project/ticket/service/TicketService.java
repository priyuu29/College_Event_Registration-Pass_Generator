package com.example.Project.ticket.service;

import com.example.Project.ticket.model.Ticket;
import com.example.Project.ticket.repository.TicketRepository;
import com.example.Project.ticket.util.QRGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private JavaMailSender mailSender;

    public Ticket createTicket(String email, String event) {

        String token = UUID.randomUUID().toString();

        Ticket ticket = new Ticket();
        ticket.setUserEmail(email);
        ticket.setEventName(event);
        ticket.setQrToken(token);

        ticketRepository.save(ticket);

        byte[] qr = QRGenerator.generateQRCode(token);

        sendEmail(email, qr);

        return ticket;
    }

    private void sendEmail(String to, byte[] qr) {
        System.out.println("Email sent to: " + to);
    }
}