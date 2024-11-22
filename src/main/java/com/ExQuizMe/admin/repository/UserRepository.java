package com.ExQuizMe.admin.repository;

import com.ExQuizMe.admin.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u.email, u.date, u.gender, u.identity, u.nickname, u.signupPurpose FROM User u")
    List<Object[]> findUsersBasicInfo();

    Optional<User> findByEmail(String email);
}