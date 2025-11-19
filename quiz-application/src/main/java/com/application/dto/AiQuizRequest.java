package com.application.dto;

public class AiQuizRequest {
    private String grade;
    private String difficulty;
    private String subject;
    private String topic;

    public AiQuizRequest() {
    }

    public AiQuizRequest(String grade, String difficulty, String subject, String topic) {
        this.grade = grade;
        this.difficulty = difficulty;
        this.subject = subject;
        this.topic = topic;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
}
