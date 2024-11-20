package com.ExQuizMe.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class ReportResponseDTO {
    private Long reportId;        // 신고 ID
    private Long cardNumber;      // 단어장 번호
    private String reason;        // 신고 사유
    private String details;       // 신고 세부 내용
    private String reporterEmail; // 신고자 이메일
    private Date reportedAt;      // 신고 날짜
    private String cardTitle;     // 단어장 제목
    private String cardContent;   // 단어장 내용
    private String cardAuthor;    // 단어장 작성자
    private List<VocabularyItemDTO> cardVocabularyItems; // 단어 리스트
}