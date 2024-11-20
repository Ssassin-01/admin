package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.repository.VocabularyItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VocabularyItemService {

    @Autowired
    private VocabularyItemRepository vocabularyItemRepository;

    // 단어 삭제
    public void deleteVocabularyItem(Long itemId) {
        if (!vocabularyItemRepository.existsById(itemId)) {
            throw new IllegalArgumentException("단어를 찾을 수 없습니다.");
        }
        vocabularyItemRepository.deleteById(itemId);
    }
}
