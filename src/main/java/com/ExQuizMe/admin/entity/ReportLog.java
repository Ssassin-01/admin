package com.ExQuizMe.admin.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "report_log")
public class ReportLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "card_number", referencedColumnName = "card_number")
    private Card card;

    @Column(name = "reason")
    private String reason;

    @Column(name = "details")
    private String details;

    @Column(name = "reported_at")
    @Temporal(TemporalType.TIMESTAMP)
    private Date reportedAt;

    @Column(name = "reporter_email")
    private String reporterEmail;
}
