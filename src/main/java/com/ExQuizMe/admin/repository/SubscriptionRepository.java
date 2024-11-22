package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {
    Optional<Subscription> findByUser_Email(String email);

    @Query("SELECT MONTH(s.purchaseDate) AS month, COUNT(s) AS subscriberCount " +
            "FROM Subscription s WHERE YEAR(s.purchaseDate) = :year " +
            "GROUP BY MONTH(s.purchaseDate) " +
            "ORDER BY MONTH(s.purchaseDate)")
    List<Object[]> findMonthlySubscribers(@Param("year") int year);
}
