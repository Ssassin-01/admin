package com.ExQuizMe.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class UserDetailDTO {
    private String email;
    private String nickname;
    private LocalDate date;
    private Integer gender;
    private String identity;
    private String signupPurpose;
    private String telNumber;
    private String oneLineResolution;
    private String permission;
}