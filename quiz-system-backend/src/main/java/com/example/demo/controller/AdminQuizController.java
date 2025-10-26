package com.example.demo.controller;

import com.example.demo.dto.QuizDTO;
import com.example.demo.model.Question;
import com.example.demo.model.Quiz;
import com.example.demo.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminQuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping("/quizzes")
    public ResponseEntity<?> createQuiz(@RequestBody QuizDTO dto) {
        Quiz q = quizService.createQuiz(dto);
        return ResponseEntity.status(201).body(q);
    }

    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> listQuizzes() {
        return ResponseEntity.ok(quizService.getAll());
    }

    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.ok("Deleted");
    }

    @PostMapping("/quizzes/{id}/questions")
    public ResponseEntity<Question> addQuestion(@PathVariable Long id, @RequestBody QuizDTO.QuestionDTO dto) {
        Question q = quizService.addQuestion(id, dto);
        return ResponseEntity.status(201).body(q);
    }
}
