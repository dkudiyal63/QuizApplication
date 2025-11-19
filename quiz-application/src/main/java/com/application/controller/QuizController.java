package com.application.controller;

import com.application.dto.AiQuizRequest;
import com.application.dto.QuizCreationDto;
import com.application.dto.QuizSubmissionDto;
import com.application.models.Quiz;
import com.application.services.AiQuizService;
import com.application.services.QuestionService;
import com.application.services.QuizService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("quiz")
public class QuizController {

	private final QuizService quizService;
	private final QuestionService questionService;
	private final AiQuizService aiQuizService;

	public QuizController(QuizService quizService, QuestionService questionService, AiQuizService aiQuizService) {
		this.quizService = quizService;
		this.questionService = questionService;
		this.aiQuizService = aiQuizService;
	}

	@PostMapping("create")
	public ResponseEntity<?> createQuiz(@RequestAttribute("userId") String userId,
			@RequestBody QuizCreationDto quizDto) {
		Quiz quiz = quizDto.getQuiz();
		quiz.setUserId(userId);
		String quizId = quizService.createQuiz(quiz, quizDto.getQuestions());
		if (quizId == null || quizId.trim().isEmpty())
			return ResponseEntity.internalServerError().build();

		if (questionService.addQuestions(quizDto.getQuestions(), quizId))
			return ResponseEntity.status(HttpStatus.CREATED).body(quizId);
		// Quiz creation request received
		return ResponseEntity.notFound().build();
	}

	@GetMapping("{quizId}")
	public ResponseEntity<?> getQuiz(@PathVariable("quizId") String id) {
		return questionService.getQuiz(id);
	}

	@GetMapping("attempt/{quizId}")
	public ResponseEntity<?> getQuizInstructions(@PathVariable String quizId, @RequestAttribute String userId) {
		if (quizService.checkAttempted(userId, quizId))
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		return quizService.getQuizInstructions(quizId);
	}

	@PostMapping("start")
	public ResponseEntity<?> getQuestions(@RequestBody Map<String, String> quizId) {
		return questionService.getQuiz(quizId.get("quizId"));
	}

	@PostMapping("submit")
	public ResponseEntity<?> submitQuiz(@RequestBody QuizSubmissionDto answers, @RequestAttribute String userId) {
		answers.getAnswers().remove("0");
		return quizService.submitQuiz(answers.getQuizId(), userId, answers.getDate(), answers.getAnswers());
	}

	@PostMapping("generate-ai")
	public ResponseEntity<?> generateAiQuiz(@RequestBody AiQuizRequest request) {
		try {
			return new ResponseEntity<>(aiQuizService.generateQuiz(request),HttpStatus.OK);
//			return ResponseEntity.ok(questions);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to generate quiz: " + e.getMessage());
		}
	}

	@GetMapping("health")
	public ResponseEntity<String> health() {
		return ResponseEntity.ok("Quiz App Backend is running!");
	}
}
