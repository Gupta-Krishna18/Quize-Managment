package com.example.demo.dto;

import java.util.Map;

public class SubmitAttemptRequest {

    // map questionId -> selectedAnswer
    private Map<Long, String> answers;
    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }

}
