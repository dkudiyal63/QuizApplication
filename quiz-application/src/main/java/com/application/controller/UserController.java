package com.application.controller;

import com.application.models.Quiz;
import com.application.models.User;
import com.application.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> user) {
        return userService.loginUser(user);
    }

    @GetMapping("getUser")
    public ResponseEntity<?> getUser(@RequestAttribute String userId) {
        return userService.getUsers(userId);
    }

    @GetMapping("creations")
    public ResponseEntity<?> allQuizzes(@RequestAttribute String userId) {
        return userService.allQuizzes(userId);
    }

    @GetMapping("creations/{quizId}")
    public ResponseEntity<Quiz> specificQuiz(@PathVariable String quizId, @RequestAttribute String userId) {
        return userService.getQuiz(quizId, userId);
    }

    @GetMapping("creations/{quizId}/questions")
    public ResponseEntity<?> getQuestions(@PathVariable("quizId") String quizId,
            @RequestAttribute("userId") String userId) {
        return userService.getQuestions(quizId, userId);
    }

    @GetMapping("attempted")
    public ResponseEntity<?> getAttempted(@RequestAttribute String userId) {
        return userService.getAttempted(userId);
    }
}
