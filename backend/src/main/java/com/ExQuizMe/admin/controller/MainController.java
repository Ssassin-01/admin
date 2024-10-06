package com.ExQuizMe.admin.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")  // 모든 API가 /api로 시작
public class MainController {

    @GetMapping("/")
    public String helloPage() {
        return "Hello, axios git test";
    }

    @GetMapping("/admin")
    public String adminPage() {
        return "admin 잘되네";
    }
}
