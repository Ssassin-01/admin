package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.WordBookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WordBookmarkRepository extends JpaRepository<WordBookmark, Long> {

    @Modifying
    @Query("DELETE FROM WordBookmark wb WHERE wb.user.email = :email")
    void deleteByUserEmail(String email);
}