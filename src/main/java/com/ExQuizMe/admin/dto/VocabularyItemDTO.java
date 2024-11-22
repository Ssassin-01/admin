package com.ExQuizMe.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyItemDTO {
    private Long itemId;
    private String englishWord;
    private String koreanWord;
}