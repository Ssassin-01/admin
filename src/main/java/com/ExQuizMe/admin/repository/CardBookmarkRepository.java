package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.CardBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CardBookmarkRepository extends JpaRepository<CardBookmark, Long> {

    @Modifying
    @Query("DELETE FROM CardBookmark cb WHERE cb.user.email = :email")
    void deleteByUserEmail(String email);
}
