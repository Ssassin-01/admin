package com.ExQuizMe.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class SubscriptionDTO {
    private String email;
    private String subscriptionPlan;
    private LocalDate purchaseDate;
    private LocalDate expirationDate;
}
