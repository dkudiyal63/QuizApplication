package com.application.services;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.application.dto.AiQuizRequest;
import com.application.models.Question;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class AiQuizService {

    private static final Logger logger = LoggerFactory.getLogger(AiQuizService.class);

    @Value("${gemini.api.key:}")
    private String geminiApiKey;

    // It's generally better to inject a RestTemplate bean, but this is functional.
    private final RestTemplate restTemplate = new RestTemplate();
    private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent";

    public List<Question> generateQuiz(AiQuizRequest request) {

        Client client = Client.builder().apiKey(geminiApiKey).build();

        GenerateContentResponse response = client.models.generateContent(
                "gemini-2.0-flash",
                buildPrompt(request,10),
                null
        );
        List<Question> questions = parseQuizResponse(response.text());
        return questions;

    }


    private String buildPrompt(AiQuizRequest request, int numberOfQuestions) {
        // --- FIX 1: Made the number of questions a parameter to ensure consistency.
        return String.format(
                "Generate a quiz with %d multiple choice questions for %s level, %s difficulty, on the subject '%s' and topic '%s'. "
                        +
                        "Format the response exactly as follows, with no introductory or concluding text:\n\n" +
                        "Q1. [Question text]\n" +
                        "A) [Option A]\n" +
                        "B) [Option B]\n" +
                        "C) [Option C]\n" +
                        "D) [Option D]\n" +
                        "Correct: [A/B/C/D]\n" +
                        "Points: 1\n\n" +
                        "Q2. [Question text]\n" +
                        "...\n" +
                        "Continue this exact format for all %d questions.",
                numberOfQuestions, request.getGrade(), request.getDifficulty(), request.getSubject(), request.getTopic(),
                numberOfQuestions);
    }

    private List<Question> parseQuizResponse(String content) {
        List<Question> questions = new ArrayList<>();
        if (content == null || content.trim().isEmpty()) {
            return questions;
        }

        String[] questionBlocks = content.trim().split("\\s*Q\\d+\\.");

        for (int i = 1; i < questionBlocks.length; i++) { // Skip the first element which is empty before the first "Q1."
            String block = questionBlocks[i].trim();
            if (block.isEmpty()) {
                continue;
            }

            try {
                // The 'i' here corresponds to the question number.
                Question question = parseQuestionBlock(block, i);
                questions.add(question);
            } catch (Exception e) {
                // --- IMPROVEMENT: Use a proper logger instead of System.err
                logger.warn("Error parsing question block #{}: '{}'. Skipping. Error: {}", i, block, e.getMessage());
            }
        }

        return questions;
    }

    private Question parseQuestionBlock(String block, int questionNumber) {
        String[] lines = block.split("\n");
        // The first line of the block is the question text itself.
        String questionText = lines[0].trim();

        String optionA = "", optionB = "", optionC = "", optionD = "";
        String correctAnswer = "";
        int points = 1; // Default points

        for (String line : lines) {
            String trimmedLine = line.trim();
            if (trimmedLine.startsWith("A)")) {
                optionA = trimmedLine.substring(2).trim();
            } else if (trimmedLine.startsWith("B)")) {
                optionB = trimmedLine.substring(2).trim();
            } else if (trimmedLine.startsWith("C)")) {
                optionC = trimmedLine.substring(2).trim();
            } else if (trimmedLine.startsWith("D)")) {
                optionD = trimmedLine.substring(2).trim();
            } else if (trimmedLine.toLowerCase().startsWith("correct:")) {
                correctAnswer = trimmedLine.substring(8).trim();
            } else if (trimmedLine.toLowerCase().startsWith("points:")) {
                try {
                    points = Integer.parseInt(trimmedLine.substring(7).trim());
                } catch (NumberFormatException e) {
                    logger.warn("Could not parse points, defaulting to 1. Line: '{}'", trimmedLine);
                    points = 1;
                }
            }
        }

        Question question = new Question();
        question.setQuestionNo(String.valueOf(questionNumber));
        question.setQuestion(questionText);
        question.setOption1(optionA);
        question.setOption2(optionB);
        question.setOption3(optionC);
        question.setOption4(optionD);
        question.setCorrect(correctAnswer);

        // --- FIX 3: Use the parsed `points` value instead of hardcoding "1".
        question.setPoints(String.valueOf(points));

        return question;
    }
}