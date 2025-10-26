package com.example.demo.dto;

import java.util.List;

public class QuizDTO {

    private String title;
    private String description;
    private Integer duration; // minutes

    // Optional list of questions to create with quiz
    private List<QuestionDTO> questions;

    // getters & setters...

    public static class QuestionDTO {
        private String questionText;
        private List<String> options;
        private String correctAnswer;
        private String type; // MCQ, TRUE_FALSE, SHORT_ANSWER

        // getters & setters
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public List<String> getOptions() { return options; }
        public void setOptions(List<String> options) { this.options = options; }
        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    public List<QuestionDTO> getQuestions() { return questions; }
    public void setQuestions(List<QuestionDTO> questions) { this.questions = questions; }

}
