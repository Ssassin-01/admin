package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    // 단어장 삭제
    public void deleteCard(Long cardNumber) {
        if (!cardRepository.existsById(cardNumber)) {
            throw new IllegalArgumentException("단어장을 찾을 수 없습니다.");
        }
        cardRepository.deleteById(cardNumber);
    }
}
