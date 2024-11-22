package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.dto.CardResponseDTO;
import com.ExQuizMe.admin.dto.VocabularyItemDTO;
import com.ExQuizMe.admin.entity.Card;
import com.ExQuizMe.admin.repository.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    public List<CardResponseDTO> getUserCards(String email) {
        List<Card> cards = cardRepository.findByUser_Email(email);

        return cards.stream().map(card -> new CardResponseDTO(
                card.getCardNumber(),
                card.getTitle(),
                card.getCardContent(),
                card.getWriteDateTime(),
                card.getUser().getNickname(),
                card.getCountView(),
                card.getVocabularyItems().stream()
                        .map(item -> new VocabularyItemDTO(
                                item.getItemId(),
                                item.getEnglishWord(),
                                item.getKoreanWord()
                        ))
                        .collect(Collectors.toList())
        )).collect(Collectors.toList());
    }
}
