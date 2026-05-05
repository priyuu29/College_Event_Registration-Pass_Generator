package com.example.Project.ticket.repository;

import com.example.Project.ticket.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    Optional<Ticket> findByQrToken(String qrToken);
}