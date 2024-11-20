package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.CardAccessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CardAccessLogRepository extends JpaRepository<CardAccessLog, Long> {

    @Modifying
    @Query("DELETE FROM CardAccessLog cal WHERE cal.user.email = :email")
    void deleteByUserEmail(String email);
}
