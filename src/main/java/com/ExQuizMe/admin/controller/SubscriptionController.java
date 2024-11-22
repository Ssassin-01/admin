package com.ExQuizMe.admin.controller;

import com.ExQuizMe.admin.dto.SubscriptionDTO;
import com.ExQuizMe.admin.service.SubscriptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/userSub")
@RequiredArgsConstructor
public class SubscriptionController {
    private final SubscriptionService subscriptionService;

    @GetMapping("/getUserSubscription")
    public ResponseEntity<SubscriptionDTO> getUserSubscription(@RequestParam String email) {
        SubscriptionDTO subscription = subscriptionService.getSubscriptionByEmail(email);
        return subscription != null ? ResponseEntity.ok(subscription) : ResponseEntity.notFound().build();
    }

    @PostMapping("/updateSubscription")
    public ResponseEntity<String> updateSubscription(@RequestBody SubscriptionDTO subscriptionDTO) {
        subscriptionService.updateSubscriptionPlan(subscriptionDTO.getEmail(), subscriptionDTO.getSubscriptionPlan());
        return ResponseEntity.ok("Subscription updated successfully");
    }

    @GetMapping("/monthlySubscribers")
    public ResponseEntity<List<Map<String, Object>>> getMonthlySubscribers(@RequestParam int year) {
        return ResponseEntity.ok(subscriptionService.getMonthlySubscribers(year));
    }
}
