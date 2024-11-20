package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.ReportLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportLogRepository extends JpaRepository<ReportLog, Long> {
}