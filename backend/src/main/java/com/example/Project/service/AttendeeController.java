package com.example.Project.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Project.dto.AttendeeDTO;
import com.example.Project.service.AttendeeService;

@RestController
@RequestMapping("/api/attendee")
public class AttendeeController {

    private final AttendeeService service;

    public AttendeeController(AttendeeService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public String register(@RequestBody AttendeeDTO dto) {
        return service.register(dto);
    }

    @PostMapping("/scan")
    public String scan(@RequestParam String token) {
        return service.scan(token);
    }
}