package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    // 카드 제목으로 검색
    List<Card> findByTitleContaining(String title);

    // 작성자 이메일로 카드 검색
    List<Card> findByUser_Email(String email);

    // 조회수가 높은 순으로 카드 정렬
    @Query("SELECT c FROM Card c ORDER BY c.countView DESC")
    List<Card> findPopularCards();

    // 특정 단어장이 특정 작성자의 것인지 확인
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END " +
            "FROM Card c WHERE c.cardNumber = :cardNumber AND c.user.email = :email")
    boolean existsByCardNumberAndUserEmail(Long cardNumber, String email);


}