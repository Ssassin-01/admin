package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.dto.SubscriptionDTO;
import com.ExQuizMe.admin.entity.Subscription;
import com.ExQuizMe.admin.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

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

    public List<Map<String, Object>> getMonthlySubscribers(int year) {
        List<Object[]> results = subscriptionRepository.findMonthlySubscribers(year);
        List<Map<String, Object>> monthlyData = new ArrayList<>();

        for (Object[] row : results) {
            Map<String, Object> data = new HashMap<>();
            data.put("month", row[0]); // 월
            data.put("subscriberCount", row[1]); // 구독자 수
            monthlyData.add(data);
        }

        return monthlyData;
    }
}
