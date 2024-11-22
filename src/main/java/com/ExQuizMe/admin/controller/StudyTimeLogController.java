package com.ExQuizMe.admin.controller;

import com.ExQuizMe.admin.service.StudyTimeLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/study-time")
@RequiredArgsConstructor
public class StudyTimeLogController {

    private final StudyTimeLogService studyTimeLogService;

    // 월별 학습량
    @GetMapping("/monthly")
    public List<Integer> getMonthlyStudyTime(@RequestParam String email, @RequestParam int year) {
        return studyTimeLogService.getMonthlyStudyTime(email, year);
    }

    // 주차별 학습량
    @GetMapping("/week-ranges")
    public List<Map<String, Object>> getWeekRanges(@RequestParam int year, @RequestParam int month) {
        return studyTimeLogService.getWeekRanges(year, month);
    }

    @GetMapping("/daily")
    public List<Map<String, Object>> getDailyStudyTime(
            @RequestParam String email,
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam int week) {
        return studyTimeLogService.getDailyStudyTime(email, year, month, week);
    }
}
