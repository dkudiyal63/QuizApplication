package com.application.repository;

import com.application.keys.AttemptedQuizKey;
import com.application.models.AttemptedQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AttemptedQuizRepository extends JpaRepository<AttemptedQuiz, AttemptedQuizKey> {

	Optional<AttemptedQuiz> findByUserIdAndQuizId(String userId, String quizId);

	List<AttemptedQuiz> findByUserId(String userId);

}
