package com.example.Project.ticket.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Project.ticket.service.TicketService;

@RestController
@RequestMapping("/api/ticket")
public class TicketController {

    private final TicketService ticketService;

    public TicketController() {
        this.ticketService = new TicketService();
    }

    @PostMapping("/create")
    public String create(@RequestParam String name, @RequestParam String email) {
        return ticketService.generateTicket(name, email);
    }

    @PostMapping("/verify")
    public String verify(@RequestParam String token) {
        return ticketService.verify(token);
    }
}