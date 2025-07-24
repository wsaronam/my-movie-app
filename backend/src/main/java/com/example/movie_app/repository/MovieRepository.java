package com.example.movie_app.repository;

import com.example.movie_app.model.User;
import com.example.movie_app.model.Movie;

import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;




public interface MovieRepository extends JpaRepository<Movie, Long> {
    ArrayList<Movie> findByUser(User user);
}
