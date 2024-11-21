package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.repository.StudyTimeLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
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
    public List<Integer> getWeeklyStudyTime(String email, int year, int month) {
        List<Object[]> rawData = studyTimeLogRepository.getWeeklyStudyTime(email, year, month);

        // 최대 주차 수를 계산
        int maxWeeks = rawData.stream()
                .mapToInt(data -> (int) data[0]) // week 값을 추출
                .max()
                .orElse(0); // 데이터가 없으면 기본값 0

        // 주차 데이터를 0으로 초기화
        int[] weeklyData = new int[maxWeeks];
        Arrays.fill(weeklyData, 0); // 기본값으로 초기화

        // 쿼리 결과를 배열에 매핑
        rawData.forEach(data -> {
            int week = (int) data[0] - 1; // week 값을 배열 인덱스로 변환
            int totalStudyTime = ((Number) data[1]).intValue(); // 총 학습 시간
            weeklyData[week] = totalStudyTime; // 데이터 매핑
        });

        // 배열을 리스트로 변환하여 반환
        return IntStream.of(weeklyData).boxed().collect(Collectors.toList());
    }


    // 일별 학습량
    public List<Map<String, Object>> getDailyStudyTime(String email, int year, int month, int week) {
        List<Object[]> rawData = studyTimeLogRepository.getDailyStudyTime(email, year, month, week);

        // 일별 데이터를 반환 (날짜 및 학습 시간)
        return rawData.stream().map(data -> Map.of(
                "date", data[0],
                "studyTime", ((Number) data[1]).intValue()
        )).collect(Collectors.toList());
    }
}
