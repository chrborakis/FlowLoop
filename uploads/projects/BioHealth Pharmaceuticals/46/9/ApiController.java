package com.tp4815.api.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class ApiController {
    @GetMapping(value = "/")
    public String getPage() {
        return "API OPTIONS"+
                "<br/> /users"+
                "<br/> /trips";
    }
}