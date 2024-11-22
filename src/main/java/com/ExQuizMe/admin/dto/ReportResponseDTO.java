package com.ExQuizMe.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class ReportResponseDTO {
    private Long reportId;
    private Long cardNumber;
    private String reason;
    private String details;
    private String reporterEmail;
    private Date reportedAt;
    private String cardTitle;
    private String cardContent;
    private String cardAuthor;
    private List<VocabularyItemDTO> cardVocabularyItems;
}