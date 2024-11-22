package com.ExQuizMe.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class UserDto {
    private int id;
    private String email;
    private LocalDate date;
    private Integer gender;
    private String identity;
    private String nickname;
    private String signupPurpose;
}