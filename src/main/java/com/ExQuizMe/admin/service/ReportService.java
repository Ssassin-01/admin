package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.dto.ReportResponseDTO;
import com.ExQuizMe.admin.dto.VocabularyItemDTO;
import com.ExQuizMe.admin.entity.ReportLog;
import com.ExQuizMe.admin.repository.ReportLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    @Autowired
    private ReportLogRepository reportLogRepository;

    // 모든 신고 데이터 조회
    public List<ReportResponseDTO> getAllReports() {
        List<ReportLog> reportLogs = reportLogRepository.findAll();

        // ReportLog 엔티티를 DTO로 변환
        return reportLogs.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }


    // 특정 신고 데이터 상세 조회
    public ReportResponseDTO getReportDetails(Long id) {
        ReportLog reportLog = reportLogRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));

        return convertToDTO(reportLog);
    }


    // 특정 신고 데이터 삭제
    public void deleteReportById(Long id) {
        if (!reportLogRepository.existsById(id)) {
            throw new IllegalArgumentException("Report with ID " + id + " not found.");
        }
        reportLogRepository.deleteById(id);
    }


    // ReportLog를 ReportResponseDTO로 변환
    private ReportResponseDTO convertToDTO(ReportLog report) {
        return new ReportResponseDTO(
                report.getId(),
                report.getCard().getCardNumber(),
                report.getReason(),
                report.getDetails(),
                report.getReporterEmail(),
                report.getReportedAt(),
                report.getCard().getTitle(),
                report.getCard().getCardContent(),
                report.getCard().getUser().getNickname(),
                report.getCard().getVocabularyItems().stream()
                        .map(v -> new VocabularyItemDTO(
                                v.getItemId(),
                                v.getEnglishWord(),
                                v.getKoreanWord()
                        ))
                        .collect(Collectors.toList())
        );
    }
}