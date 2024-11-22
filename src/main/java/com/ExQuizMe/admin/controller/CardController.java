package com.ExQuizMe.admin.controller;

import com.ExQuizMe.admin.dto.CardResponseDTO;
import com.ExQuizMe.admin.service.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
public class CardController {

    @Autowired
    private CardService cardService;

    // 단어장 삭제
    @DeleteMapping("/{cardNumber}")
    public ResponseEntity<String> deleteCard(@PathVariable Long cardNumber) {
        try {
            cardService.deleteCard(cardNumber);
            return ResponseEntity.ok("단어장이 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("단어장을 찾을 수 없습니다.");
        }
    }

    // 특정 유저의 카드 목록 조회
    @GetMapping("/user/{email}")
    public ResponseEntity<List<CardResponseDTO>> getUserCards(@PathVariable String email) {
        return ResponseEntity.ok(cardService.getUserCards(email));
    }
}
