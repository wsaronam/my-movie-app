package com.example.movie_app.controller;

import com.example.movie_app.model.Movie;
import com.example.movie_app.repository.MovieRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;




@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")  // i'm just on my machine
public class MovieController {
    private final MovieRepository repository;

    public MovieController(MovieRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Movie> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public Movie create(@RequestBody Movie movie) {
        return repository.save(movie);
    }

    @PutMapping("/{id}")
    public Movie update(@PathVariable Long id, @RequestBody Movie movie) {
        movie.setId(id);
        return repository.save(movie);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
