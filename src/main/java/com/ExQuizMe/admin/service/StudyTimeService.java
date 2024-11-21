package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.entity.StudyTimeLog;
import com.ExQuizMe.admin.repository.StudyTimeLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudyTimeService {

    @Autowired
    private StudyTimeLogRepository studyTimeLogRepository;


    // 월별 학습 로그 가져오기
}