package com.ExQuizMe.admin.service;

import com.ExQuizMe.admin.dto.UserDetailDTO;
import com.ExQuizMe.admin.dto.UserDto;
import com.ExQuizMe.admin.entity.User;
import com.ExQuizMe.admin.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserDto> getAllUsersWithBasicInfo() {
        List<Object[]> users = userRepository.findUsersBasicInfo();
        return IntStream.range(0, users.size())
                .mapToObj(i -> new UserDto(
                        i + 1,
                        (String) users.get(i)[0],
                        (LocalDate) users.get(i)[1],
                        (Integer) users.get(i)[2],
                        (String) users.get(i)[3],
                        (String) users.get(i)[4],
                        (String) users.get(i)[5]
                ))
                .collect(Collectors.toList());
    }

    public UserDetailDTO getUserDetails(String email) {
        User user = userRepository.findById(email).orElseThrow(() -> new RuntimeException("User not found"));
        return new UserDetailDTO(
                user.getEmail(),
                user.getNickname(),
                user.getDate(),
                user.getGender(),
                user.getIdentity(),
                user.getSignupPurpose(),
                user.getTelNumber(),
                user.getOneLineResolution(),
                user.getPermission()
        );
    }

    public User getUserByEmail(String email) {
        return userRepository.findById(email).orElse(null);
    }
}