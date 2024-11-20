package com.ExQuizMe.admin.controller;

import com.ExQuizMe.admin.dto.ReportResponseDTO;
import com.ExQuizMe.admin.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    // 모든 신고 데이터 조회
    @GetMapping
    public ResponseEntity<List<ReportResponseDTO>> getAllReports() {
        return ResponseEntity.ok(reportService.getAllReports());
    }

    // 특정 신고 데이터 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<ReportResponseDTO> getReportDetails(@PathVariable Long id) {
        try {
            ReportResponseDTO reportDetails = reportService.getReportDetails(id);
            return ResponseEntity.ok(reportDetails);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 신고 데이터 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReport(@PathVariable Long id) {
        try {
            reportService.deleteReportById(id);
            return ResponseEntity.ok("Report deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Report not found.");
        }
    }
}