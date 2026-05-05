package com.example.Project.ticket.controller;

import com.example.Project.ticket.model.Ticket;
import com.example.Project.ticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @PostMapping("/create")
    public Ticket createTicket(@RequestParam String email,
                               @RequestParam String event) {
        return ticketService.createTicket(email, event);
    }
}