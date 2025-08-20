package com.example.movie_app.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

import javax.crypto.SecretKey;



@Component
public class JwtUtil {
    private final SecretKey key;

    // get key from secret
    public JwtUtil(@Value("${jwt.secret}") String base64Secret) {
        byte[] keyBytes = Decoders.BASE64.decode(base64Secret); 
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))  // 1 day token
            .signWith(key, SignatureAlgorithm.HS512)
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

