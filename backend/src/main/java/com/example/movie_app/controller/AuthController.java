package com.example.movie_app.controller;

import com.example.movie_app.model.User;
import com.example.movie_app.repository.UserRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")  // i'm just on my machine
public class AuthController {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();

    @Autowired
    public AuthController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        if (userRepo.existsByUsername(user.getUsername())) {
            return "Username already taken";
        }
        else {
            user.setPassword(passEncoder.encode(user.getPassword()));
            userRepo.save(user);
            return "User registered successfully";
        }
    }
    
    @PostMapping("/login")
    public String login(@RequestBody User loginUser) {
        return userRepo.findByUsername(loginUser.getUsername())
            .filter(user -> passEncoder.matches(user.getPassword(), loginUser.getPassword()))
            .map(user -> "Login successful")
            .orElse("Username and Password do not match");
    }
    
}
