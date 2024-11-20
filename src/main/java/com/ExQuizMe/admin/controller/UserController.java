package com.ExQuizMe.admin.controller;

import com.ExQuizMe.admin.dto.UserDetailDTO;
import com.ExQuizMe.admin.dto.UserDto;
import com.ExQuizMe.admin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsersWithBasicInfo();
    }

    @GetMapping("/{email}")
    public UserDetailDTO getUserDetails(@PathVariable String email) {
        return userService.getUserDetails(email);
    }

    // 회원 정보 수정
    @PutMapping("/{email}")
    public UserDetailDTO updateUser(@PathVariable String email, @RequestBody UserDetailDTO userDetailDTO) {
        return userService.updateUser(email, userDetailDTO);
    }

    // 회원 삭제
    @DeleteMapping("/{email}")
    public String deleteUser(@PathVariable String email) {
        userService.deleteUser(email);
        return "User deleted successfully";
    }
}
