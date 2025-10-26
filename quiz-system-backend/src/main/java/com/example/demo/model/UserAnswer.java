package com.example.demo.model;

import javax.persistence.*;

@Entity
@Table(name = "answers")
public class UserAnswer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserQuizAttempt attempt;

    @ManyToOne
    private Question question;

    private String selectedAnswer;

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public UserQuizAttempt getAttempt() { return attempt; }
    public void setAttempt(UserQuizAttempt attempt) { this.attempt = attempt; }
    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }
    public String getSelectedAnswer() { return selectedAnswer; }
    public void setSelectedAnswer(String selectedAnswer) { this.selectedAnswer = selectedAnswer; }
}
