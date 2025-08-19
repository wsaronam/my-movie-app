package com.example.movie_app.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import java.security.Key;

import java.util.Date;



@Component
public class JwtUtil {
    private final String jwtSecret = "jwtSecret0key0goes0here101010101abcdefghijklmnopqrstuvwxyz1234567890";  // Good secret goes here
    private final Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes()); // key is made here

    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))  // 1 day token
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}

