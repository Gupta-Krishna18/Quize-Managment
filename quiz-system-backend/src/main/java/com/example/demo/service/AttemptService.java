package com.example.demo.service;


import com.example.demo.dto.SubmitAttemptRequest;
import com.example.demo.model.*;
import com.example.demo.repository.AttemptRepository;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.repository.QuizRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AttemptService {

    @Autowired
    private AttemptRepository attemptRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private UserRepository userRepository;

    public UserQuizAttempt submitAttempt(Long quizId, Long userId, SubmitAttemptRequest req) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // fetch questions
        List<Question> questions = questionRepository.findByQuizId(quizId);
        Map<Long, Question> qmap = new HashMap<>();
        for (Question q : questions) qmap.put(q.getId(), q);

        int total = questions.size();
        int correct = 0;

        UserQuizAttempt attempt = new UserQuizAttempt();
        attempt.setQuiz(quiz);
        attempt.setUser(user);
        attempt.setStartedAt(LocalDateTime.now());
        attempt.setCompletedAt(LocalDateTime.now());

        List<UserAnswer> answers = new ArrayList<>();

        if (req.getAnswers() != null) {
            for (Map.Entry<Long, String> entry : req.getAnswers().entrySet()) {
                Long qid = entry.getKey();
                String selected = entry.getValue();
                Question question = qmap.get(qid);
                if (question == null) continue;
                UserAnswer ua = new UserAnswer();
                ua.setAttempt(attempt);
                ua.setQuestion(question);
                ua.setSelectedAnswer(selected);
                answers.add(ua);

                if (selected != null && selected.equalsIgnoreCase(question.getCorrectAnswer())) {
                    correct++;
                }
            }
        }

        double score = total == 0 ? 0.0 : ((double) correct / total) * 100.0;
        attempt.setScore(score);
        attempt.setAnswers(answers);

        // save cascade: attempt then answers
        UserQuizAttempt saved = attemptRepository.save(attempt);
        for (UserAnswer ua : answers) {
            ua.setAttempt(saved);
        }
        return attemptRepository.save(saved);
    }

    public List<UserQuizAttempt> getAttemptsByUser(Long userId) {
        return attemptRepository.findByUserId(userId);
    }

    public Optional<UserQuizAttempt> getAttempt(Long id) {
        return attemptRepository.findById(id);
    }

    public Long getUserIdByUsername(String username) {
        return userRepository.findByUsername(username).map(u -> u.getId()).orElseThrow(() -> new RuntimeException("User not found"));
    }

}
