package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.dto.SubscriptionDTO;
import com.ExQuizMe.admin.entity.Subscription;
import com.ExQuizMe.admin.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionDTO getSubscriptionByEmail(String email) {
        Optional<Subscription> subscription = subscriptionRepository.findByUser_Email(email);
        if (subscription.isPresent()) {
            Subscription sub = subscription.get();
            return new SubscriptionDTO(
                sub.getUser().getEmail(),
                sub.getSubscriptionPlan(),
                sub.getPurchaseDate(),
                sub.getExpirationDate()
            );
        }
        return null;  // 또는 Optional로 반환하거나 예외 처리
    }

    public void updateSubscriptionPlan(String email, String newPlan) {
        Optional<Subscription> subscription = subscriptionRepository.findByUser_Email(email);
        subscription.ifPresent(sub -> {
            sub.setSubscriptionPlan(newPlan);
            subscriptionRepository.save(sub);
        });
    }
}
