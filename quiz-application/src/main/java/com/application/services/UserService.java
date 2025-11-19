package com.application.services;

import com.application.models.AttemptedQuiz;
import com.application.models.Quiz;
import com.application.models.User;
import com.application.repository.AttemptedQuizRepository;
import com.application.repository.QuizRepository;
import com.application.repository.UserRepository;
import com.application.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
public class UserService {

	private final UserRepository repo;
	private final QuizRepository quizRepo;
	private final QuestionService questionService;
	private final AttemptedQuizRepository attemptedRepo;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	public UserService(UserRepository repo, QuizRepository quizRepo, QuestionService questionService,
                       AttemptedQuizRepository attemptedRepo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
		this.repo = repo;
		this.quizRepo = quizRepo;
		this.questionService = questionService;
		this.attemptedRepo = attemptedRepo;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
    }

	public ResponseEntity<?> registerUser(User user) {
		// Basic input validation
		if (user == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payload");
		}

		String email = user.getEmail() == null ? "" : user.getEmail().trim().toLowerCase();
		String password = user.getPassword() == null ? "" : user.getPassword();

		if (!StringUtils.hasText(email) || !email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid email");
		}

		if (!StringUtils.hasText(password) || password.length() < 8) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password must be at least 8 characters");
		}

		if (repo.findByEmail(email).isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
		}

		String id = UUID.randomUUID().toString();
		user.setUserId(id);
		user.setEmail(email);
		user.setPassword(passwordEncoder.encode(password));
		repo.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	public ResponseEntity<?> loginUser(Map<String, String> login) {
		String rawEmail = login.get("email");
		String rawPassword = login.get("password");

		if (!StringUtils.hasText(rawEmail) || !StringUtils.hasText(rawPassword)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email and password are required");
		}
		String email = rawEmail.trim().toLowerCase();
		Optional<User> res = repo.findByEmail(email);
		if (res.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		User user = res.get();
		if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid credentials");
		}

		Map<String, String> data = new HashMap<>();
		data.put("id", user.getUserId());
		data.put("username", user.getFirstName() != null ? user.getFirstName() : "");
		String jwt = jwtUtil.generateToken(user.getUserId());
		data.put("token", jwt);
		return ResponseEntity.status(HttpStatus.OK).body(data);
	}

	public String getUser(String id) {
		User user = repo.findById(id).orElse(null);
        
        return user != null ? user.getFirstName() : "Guest";
	}

	public boolean checkUser(String uid) {
		Optional<User> user = repo.findById(uid);
		if (!user.isPresent())
			return false;
		return true;
	}

	public ResponseEntity<List<Quiz>> allQuizzes(String userId) {
		Optional<List<Quiz>> all = quizRepo.findByUserIdOrderByDateDesc(userId);
		if (!all.isPresent())
			return ResponseEntity.ok().body(Collections.emptyList());
		return ResponseEntity.ok().body(all.get());
	}

	public ResponseEntity<Quiz> getQuiz(String quizId, String userId) {
		Optional<Quiz> res = quizRepo.findByQuizId(quizId);
		if (!res.isPresent())
			return ResponseEntity.notFound().build();
		if (userQuizRelation(userId, quizId)) {
			res.get().setUserId(null);
			return ResponseEntity.ok(res.get());
		}
		return ResponseEntity.notFound().build();
	}

	private boolean userQuizRelation(String userId, String quizId) {
		Optional<Quiz> res = quizRepo.findByQuizId(quizId);
		if (!res.isPresent() || res.get().getUserId() == null || res.get().getUserId().trim().isEmpty())
			return false;
		if (userId.equals(res.get().getUserId()))
			return true;
		return false;
	}

	public ResponseEntity<?> getQuestions(String quizId, String userId) {
		if (!userQuizRelation(userId, quizId))
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		return questionService.getQuiz(quizId);
	}

	public ResponseEntity<?> getAttempted(String userId) {
		List<AttemptedQuiz> attemptedQuizId = attemptedRepo.findByUserId(userId);
		if (attemptedQuizId.isEmpty())
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		Map<String, List<?>> response = new HashMap<>();
		List<Map<String, String>> quizzes = new ArrayList<>();
		for (AttemptedQuiz quiz : attemptedQuizId) {
			Map<String, String> m = quizRepo.findByQuizIdNoDate(quiz.getQuizId());
			if (!m.isEmpty())
				quizzes.add(m);
		}

		response.put("attempted", attemptedQuizId);
		response.put("quizDetails", quizzes);
		return ResponseEntity.ok(response);

	}

	public ResponseEntity<?> getUsers(String userId) {
		Optional<User> res = repo.findByUserId(userId);
		if (!res.isPresent())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		return ResponseEntity.ok(res.get());
	}

}