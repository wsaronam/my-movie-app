package com.example.movie_app.controller;

import com.example.movie_app.config.JwtResponse;
import com.example.movie_app.model.User;
import com.example.movie_app.repository.UserRepository;

import com.example.movie_app.config.JwtUtil;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;



@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")  // i'm just on my machine
public class AuthController {
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthController(UserRepository userRepo, JwtUtil jwtUtil) {
        this.userRepo = userRepo;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            if (userRepo.existsByUsername(user.getUsername())) {
                return ResponseEntity.badRequest()
                    .body("Username already taken");
            }
            else {
                user.setPassword(passEncoder.encode(user.getPassword()));
                userRepo.save(user);
                return ResponseEntity.ok("User registered successfully");
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Registration failed: " + e.getMessage());
        }
        
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        Optional<User> user = userRepo.findByUsername(loginUser.getUsername());

        if (user.isPresent() && passEncoder.matches(loginUser.getPassword(), user.get().getPassword())) {

            String token = jwtUtil.generateToken(loginUser.getUsername());
            return ResponseEntity.ok(new JwtResponse(token));
        } 
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Username and Password do not match");
        }
    }
    
}
