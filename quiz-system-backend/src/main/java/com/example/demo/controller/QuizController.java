package com.example.demo.controller;

import com.example.demo.dto.SubmitAttemptRequest;
import com.example.demo.model.Quiz;
import com.example.demo.model.UserQuizAttempt;
import com.example.demo.service.AttemptService;
import org.springframework.security.core.Authentication;
import com.example.demo.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173") // Vite default port
@RestController
@RequestMapping("/api")
public class QuizController {

    @Autowired
    private QuizService quizService;
    @Autowired
    private AttemptService attemptService;

    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getQuizzes() {
        return ResponseEntity.ok(quizService.getAll());
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable Long id) {
        return ResponseEntity.ok(quizService.getById(id));
    }

    /**
     * Submit attempt. Requires authenticated user (JWT).
     * Authentication principal provides username; fetch userId in service via UserRepository.
     */
    @PostMapping("/quizzes/{id}/attempt")
    public ResponseEntity<?> submitAttempt(@PathVariable Long id,
                                           @RequestBody SubmitAttemptRequest req,
                                           Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Unauthorized");
        }
        String username = authentication.getName();
        // get userId through attemptService's userRepository indirectly - but for clarity:
        // We'll lookup user id via attemptService's userRepository (package-private). Simpler:
        // For now, fetch user by username via attemptService's UserRepository: use a helper.

        // to avoid exposing repository here, we'll assume AttemptService has method to accept username.
        // But to keep it simple in this codebase, we'll use username->userId lookup via attemptService.getUserIdByUsername method.
        // Implemented below by casting to service - but here we'll call attemptService. We'll implement getUserIdByUsername in AttemptService.

        Long userId = attemptService.getUserIdByUsername(username);
        UserQuizAttempt result = attemptService.submitAttempt(id, userId, req);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/attempts/me")
    public ResponseEntity<?> myAttempts(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) return ResponseEntity.status(401).body("Unauthorized");
        Long userId = attemptService.getUserIdByUsername(authentication.getName());
        return ResponseEntity.ok(attemptService.getAttemptsByUser(userId));
    }

    @GetMapping("/attempts/{id}")
    public ResponseEntity<?> getAttempt(@PathVariable Long id) {
        return attemptService.getAttempt(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}