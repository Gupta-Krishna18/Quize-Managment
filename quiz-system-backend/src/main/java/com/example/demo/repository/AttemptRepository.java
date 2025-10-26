package com.example.demo.repository;

import com.example.demo.model.UserQuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttemptRepository extends JpaRepository<UserQuizAttempt, Long> {
    List<UserQuizAttempt> findByUserId(Long userId);
}
