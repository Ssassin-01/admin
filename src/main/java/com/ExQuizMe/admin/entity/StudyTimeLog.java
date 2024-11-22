package com.ExQuizMe.admin.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "study_time_log", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "study_date"})
})
public class StudyTimeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_email", referencedColumnName = "email", nullable = false)
    private User user;

    @Column(name = "study_time", nullable = false)
    private Long studyTime;

    @Column(name = "study_date", nullable = false)
    private LocalDate studyDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Long getStudyTime() {
        return studyTime;
    }

    public void setStudyTime(Long studyTime) {
        this.studyTime = studyTime;
    }

    public LocalDate getStudyDate() {
        return studyDate;
    }

    public void setStudyDate(LocalDate studyDate) {
        this.studyDate = studyDate;
    }
}