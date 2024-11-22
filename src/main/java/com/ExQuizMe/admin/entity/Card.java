package com.ExQuizMe.admin.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"vocabularyItems"})
@Table(name = "card")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_number")
    private Long cardNumber;

    @ManyToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    @JsonBackReference
    private User user;

    @Column(name = "title")
    private String title;

    @Column(name = "write_dateTime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date writeDateTime;

    @Column(name = "card_titleImage")
    private String cardTitleImage;

    @Column(name = "purpose")
    private String purpose;

    @Column(name = "card_content")
    private String cardContent;

    @Column(name = "countView")
    private Integer countView = 0;

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("card")
    private List<VocabularyItem> vocabularyItems = new ArrayList<>();

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CardBookmark> cardBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CardAccessLog> cardAccessLogs = new ArrayList<>();

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReportLog> reportLogs = new ArrayList<>();
}