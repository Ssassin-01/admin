package com.ExQuizMe.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class CardResponseDTO {
    private Long cardNumber;
    private String title;
    private String content;
    private Date writeDateTime;
    private String authorNickname;
    private int countView;
    private List<VocabularyItemDTO> vocabularyItems;
}
