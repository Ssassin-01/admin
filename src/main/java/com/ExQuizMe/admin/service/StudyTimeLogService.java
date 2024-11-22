package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.repository.StudyTimeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class StudyTimeLogService {

    private final StudyTimeLogRepository studyTimeLogRepository;

    // 월별 학습량 (기본값 포함)
    public List<Integer> getMonthlyStudyTime(String email, int year) {
        List<Object[]> rawData = studyTimeLogRepository.getMonthlyStudyTime(email, year);

        // 기본값 0으로 채운 12개월 데이터 생성
        int[] monthlyData = new int[12];
        rawData.forEach(data -> {
            int month = (int) data[0] - 1; // 1월: index 0
            int totalStudyTime = ((Number) data[1]).intValue();
            monthlyData[month] = totalStudyTime;
        });

        return IntStream.of(monthlyData).boxed().collect(Collectors.toList());
    }

    // 주차별 학습량 (기본값 포함)
    // 특정 연도와 월의 주차별 시작일과 종료일 반환
    public List<Map<String, Object>> getWeekRanges(int year, int month) {
        LocalDate startDate = LocalDate.of(year, month, 1);
        LocalDate endDate = startDate.withDayOfMonth(startDate.lengthOfMonth());

        List<Map<String, Object>> weeks = new ArrayList<>();

        LocalDate currentStart = startDate.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        while (currentStart.isBefore(endDate)) {
            LocalDate currentEnd = currentStart.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
            if (currentEnd.isAfter(endDate)) {
                currentEnd = endDate;
            }

            weeks.add(Map.of(
                    "week", weeks.size() + 1,
                    "startDate", currentStart,
                    "endDate", currentEnd
            ));

            currentStart = currentEnd.plusDays(1);
        }

        return weeks;
    }

    // 특정 주차의 일별 학습량 반환
    public List<Map<String, Object>> getDailyStudyTime(String email, int year, int month, int week) {
        List<Map<String, Object>> weekRanges = getWeekRanges(year, month);

        if (week < 1 || week > weekRanges.size()) {
            throw new IllegalArgumentException("Invalid week: " + week);
        }

        Map<String, Object> selectedWeek = weekRanges.get(week - 1);
        LocalDate startDate = (LocalDate) selectedWeek.get("startDate");
        LocalDate endDate = (LocalDate) selectedWeek.get("endDate");

        List<Object[]> rawData = studyTimeLogRepository.getDailyStudyTime(email, startDate, endDate);

        return rawData.stream()
                .map(data -> Map.of(
                        "date", data[0],
                        "studyTime", ((Number) data[1]).intValue()
                ))
                .collect(Collectors.toList());
    }
}