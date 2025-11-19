package com.application.services;

import com.application.models.Question;
import com.application.repository.QuestionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuestionService {

	private final QuestionRepository repo;

	public QuestionService(QuestionRepository repo) {
		this.repo = repo;
	}

	@Transactional
	public boolean addQuestions(List<Question> questions, String quizId) {
		try {
			for (Question q : questions) {
				q.setQuizId(quizId);
				repo.save(q);
			}
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public ResponseEntity<?> getQuiz(String id) {
		Optional<List<Map<String, String>>> res = repo.findByQuizId(id);
		if (!res.isPresent())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		List<Map<String, String>> questions = res.get();
		if (questions == null || questions.isEmpty())
			return ResponseEntity.ok().body(java.util.Collections.emptyList());
		return ResponseEntity.ok().body(questions);

	}
}
