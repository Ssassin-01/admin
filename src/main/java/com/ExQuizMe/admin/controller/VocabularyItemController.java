package com.ExQuizMe.admin.controller;

import com.ExQuizMe.admin.service.VocabularyItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vocabulary-items")
public class VocabularyItemController {

    @Autowired
    private VocabularyItemService vocabularyItemService;

    // 단어 삭제
    @DeleteMapping("/{itemId}")
    public ResponseEntity<String> deleteVocabularyItem(@PathVariable Long itemId) {
        try {
            vocabularyItemService.deleteVocabularyItem(itemId);
            return ResponseEntity.ok("단어가 삭제되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("단어를 찾을 수 없습니다.");
        }
    }
}
