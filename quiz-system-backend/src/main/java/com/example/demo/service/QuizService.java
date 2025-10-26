package com.example.demo.service;

import com.example.demo.dto.QuizDTO;
import com.example.demo.model.Question;
import com.example.demo.model.Quiz;
import com.example.demo.repository.QuestionRepository;
import com.example.demo.repository.QuizRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Basic quiz management service.
 */
@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private ObjectMapper objectMapper;

    public Quiz createQuiz(QuizDTO dto) {
        Quiz q = new Quiz();
        q.setTitle(dto.getTitle());
        q.setDescription(dto.getDescription());
        q.setDuration(dto.getDuration());
        quizRepository.save(q);

        if (dto.getQuestions() != null && !dto.getQuestions().isEmpty()) {
            List<Question> saved = new ArrayList<>();
            for (QuizDTO.QuestionDTO qq : dto.getQuestions()) {
                Question question = new Question();
                question.setQuiz(q);
                question.setQuestionText(qq.getQuestionText());
                try {
                    question.setOptionsJson(objectMapper.writeValueAsString(qq.getOptions()));
                } catch (Exception ex) {
                    question.setOptionsJson("[]");
                }
                question.setCorrectAnswer(qq.getCorrectAnswer());
                question.setType(qq.getType());
                saved.add(questionRepository.save(question));
            }
            q.setQuestions(saved);
            quizRepository.save(q);
        }

        return q;
    }

    public List<Quiz> getAll() {
        return quizRepository.findAll();
    }

    public Quiz getById(Long id) {
        return quizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    public Question addQuestion(Long quizId, QuizDTO.QuestionDTO qq) {
        Quiz quiz = getById(quizId);
        Question question = new Question();
        question.setQuiz(quiz);
        question.setQuestionText(qq.getQuestionText());
        try {
            question.setOptionsJson(objectMapper.writeValueAsString(qq.getOptions()));
        } catch (Exception ex) {
            question.setOptionsJson("[]");
        }
        question.setCorrectAnswer(qq.getCorrectAnswer());
        question.setType(qq.getType());
        return questionRepository.save(question);
    }
}
