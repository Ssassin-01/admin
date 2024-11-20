package com.ExQuizMe.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyItemDTO {
    private Long itemId;         // 단어 ID
    private String englishWord;  // 영어 단어
    private String koreanWord;   // 한글 뜻
}