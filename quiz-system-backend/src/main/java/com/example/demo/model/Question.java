package com.example.demo.model;


import javax.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Quiz quiz;

    @Column(length = 1000)
    private String questionText;

    // store options as a single String (JSON) e.g. ["A","B","C","D"]
    @Column(length = 2000)
    private String optionsJson;

    private String correctAnswer;
    private String type; // MCQ, TRUE_FALSE, SHORT_ANSWER

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Quiz getQuiz() { return quiz; }
    public void setQuiz(Quiz quiz) { this.quiz = quiz; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public String getOptionsJson() { return optionsJson; }
    public void setOptionsJson(String optionsJson) { this.optionsJson = optionsJson; }
    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
