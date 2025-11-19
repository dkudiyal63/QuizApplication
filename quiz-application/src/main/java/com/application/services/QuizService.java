package com.application.services;


import com.application.models.AttemptedQuiz;
import com.application.models.Question;
import com.application.models.Quiz;
import com.application.repository.AttemptedQuizRepository;
import com.application.repository.QuestionRepository;
import com.application.repository.QuizRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class QuizService {

	private QuizRepository quizRepo;
	private QuestionRepository questionRepo;
	private AttemptedQuizRepository attemptRepo;

	public QuizService(QuizRepository quizRepo, QuestionRepository questionRepo, AttemptedQuizRepository attemptRepo) {
		this.quizRepo = quizRepo;
		this.questionRepo = questionRepo;
		this.attemptRepo = attemptRepo;
	}

	private boolean isUnique(String id) {
		Optional<Quiz> o = quizRepo.findByQuizId(id);
		if (!o.isPresent())
			return true;
		return false;
	}

	private String generateId() {
		int code;
		String id;
		do {
			code = ThreadLocalRandom.current().nextInt(100000, 1000000);
			id = String.valueOf(code);
		} while (!isUnique(id));
		return id;
	}

	private Map<String, String> totalPointsAndQuestions(List<Question> questions) {
		int totalPoints = 0;
		int totalQuestions = 0;
		for (Question q : questions) {
			totalPoints += Integer.parseInt(q.getPoints());
			totalQuestions++;
		}
		Map<String, String> m = new HashMap<>();
		m.put("totalPoints", Integer.toString(totalPoints));
		m.put("totalQuestions", Integer.toString(totalQuestions));
		return m;
	}

	public String createQuiz(Quiz quiz, List<Question> questions) {
		String id = generateId();
		quiz.setQuizId(id);
		Map<String, String> totals = totalPointsAndQuestions(questions);
		quiz.setTotalPoints(totals.get("totalPoints"));
		quiz.setTotalQuestions(totals.get("totalQuestions"));
		Quiz res = quizRepo.save(quiz);
		return res.getQuizId();
	}

	public ResponseEntity<?> getQuizInstructions(String quizId) {
		Optional<Map<String, String>> res = quizRepo.findQuizByQuizId(quizId);
		if (!res.isPresent() || res.get().get("quizId") == null)
			return ResponseEntity.notFound().build();
		return ResponseEntity.ok(res.get());
	}

	@Transactional
	public ResponseEntity<?> submitQuiz(String quizId, String userId, String date, Map<String, String> answers) {
		Integer points = 0;
		for (String key : answers.keySet()) {
			Map<String, String> original = questionRepo.findQuestionByQuizId(quizId, key);
			if (answers.get(key) != null && answers.get(key).equals(original.get("correct"))) {
				points += Integer.parseInt(original.get("points"));
			}
		}
		String totalPoints = quizRepo.findPointsByQuizId(quizId);

		AttemptedQuiz attempted = new AttemptedQuiz(userId, quizId, Integer.toString(points), date, totalPoints);
		AttemptedQuiz res = attemptRepo.save(attempted);
		Map<String, String> performance = new HashMap<>();
		performance.put("points", Integer.toString(points));
		performance.put("totalPoints", totalPoints);
		return ResponseEntity.ok().body(performance);
	}

	public boolean checkAttempted(String userId, String quizId) {
		Optional<AttemptedQuiz> res = attemptRepo.findByUserIdAndQuizId(userId, quizId);
		if (!res.isPresent() || res.get().getQuizId() == null || res.get().getQuizId().trim().isEmpty())
			return false;
		return true;
	}

}
