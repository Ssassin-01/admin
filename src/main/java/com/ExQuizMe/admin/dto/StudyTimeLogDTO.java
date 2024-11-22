package com.ExQuizMe.admin.dto;

import java.time.LocalDate;

public class StudyTimeLogDTO {
    private LocalDate studyDate;
    private Long studyTime;

    public StudyTimeLogDTO(LocalDate studyDate, Long studyTime) {
        this.studyDate = studyDate;
        this.studyTime = studyTime;
    }

    public LocalDate getStudyDate() {
        return studyDate;
    }

    public void setStudyDate(LocalDate studyDate) {
        this.studyDate = studyDate;
    }

    public Long getStudyTime() {
        return studyTime;
    }

    public void setStudyTime(Long studyTime) {
        this.studyTime = studyTime;
    }
}
