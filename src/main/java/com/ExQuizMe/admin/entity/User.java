package com.ExQuizMe.admin.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Getter
@Setter
@Table(name = "user")
public class User {
    @Id
    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "tel_Number", unique = true)
    private String telNumber;

    @Column(name = "date")
    private LocalDate date; // 사용자 생년월일

    @Column(name = "gender")
    private Integer gender;

    @Column(name = "signup_purpose")
    private String signupPurpose;

    @Column(name = "identity")
    private String identity = "";

    @Column(name = "one_line_resolution")
    private String oneLineResolution = "";

    @Column(name = "permission")
    private String permission = "ROLE_USER";

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<UserActivity> activities;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Card> cards;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudyTimeLog> studyLogs = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Subscription> subscriptions = new ArrayList<>();


    public User(String email, String encode, String nickname, String telNumber, LocalDate date, Integer gender, String signupPurpose, String identity, String oneLineResolution, String roleUser) {
        this.email = email;
        this.password = encode;
        this.nickname = nickname;
        this.telNumber = telNumber;
        this.date = date;
        this.gender = gender;
        this.signupPurpose = signupPurpose;
        this.identity = identity;
        this.oneLineResolution = oneLineResolution;
        this.permission = roleUser;
        this.activities = Collections.emptyList();
        this.cards = Collections.emptyList();
        this.subscriptions = Collections.emptyList();
    }
}
