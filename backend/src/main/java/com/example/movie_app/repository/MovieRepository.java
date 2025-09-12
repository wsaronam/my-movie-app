package com.example.movie_app.repository;

import com.example.movie_app.model.Movie;

import org.springframework.data.jpa.repository.JpaRepository;




public interface MovieRepository extends JpaRepository<Movie, Long> {
}
