package com.ExQuizMe.admin.controller;

import com.ExQuizMe.admin.dto.UserDetailDTO;
import com.ExQuizMe.admin.dto.UserDto;
import com.ExQuizMe.admin.entity.User;
import com.ExQuizMe.admin.repository.UserRepository;
import com.ExQuizMe.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/users")
    public List<UserDto> getAllUsers() {
        return userService.getAllUsersWithBasicInfo();
    }



    @GetMapping("/api/users/{email}")
    public UserDetailDTO getUserDetails(@PathVariable String email) {
        return userService.getUserDetails(email);
    }
}