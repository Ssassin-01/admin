package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.StudyTimeLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface StudyTimeLogRepository extends JpaRepository<StudyTimeLog, Long> {

    // 연도의 월별 학습량
    @Query("SELECT MONTH(log.studyDate) AS month, SUM(log.studyTime) AS totalStudyTime " +
            "FROM StudyTimeLog log " +
            "WHERE log.user.email = :email AND YEAR(log.studyDate) = :year " +
            "GROUP BY MONTH(log.studyDate) " +
            "ORDER BY month")
    List<Object[]> getMonthlyStudyTime(String email, int year);

    // 특정 연도와 월의 주차별 학습량
    @Query("SELECT WEEK(log.studyDate) AS week, SUM(log.studyTime) AS totalStudyTime " +
            "FROM StudyTimeLog log " +
            "WHERE log.user.email = :email AND YEAR(log.studyDate) = :year AND MONTH(log.studyDate) = :month " +
            "GROUP BY WEEK(log.studyDate) " +
            "ORDER BY week")
    List<Object[]> getWeeklyStudyTime(String email, int year, int month);

    // 특정 주차의 일별 학습량
    @Query("SELECT log.studyDate, SUM(log.studyTime) " +
            "FROM StudyTimeLog log " +
            "WHERE log.user.email = :email AND log.studyDate BETWEEN :startDate AND :endDate " +
            "GROUP BY log.studyDate " +
            "ORDER BY log.studyDate")
    List<Object[]> getDailyStudyTime(String email, LocalDate startDate, LocalDate endDate);

}
