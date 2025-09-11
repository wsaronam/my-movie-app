package com.example.movie_app.controller;

import com.example.movie_app.model.User;
import com.example.movie_app.model.Movie;
import com.example.movie_app.repository.UserRepository;
import com.example.movie_app.repository.MovieRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;




@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:3000")  // i'm just on my machine
public class MovieController {
    //private final MovieRepository repository;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MovieRepository movieRepo;
    

    // public MovieController(MovieRepository repository) {
    //     this.repository = repository;
    // }

    // @GetMapping
    // public ArrayList<Movie> getAll() {
    //     return repository.findAll();
    // }
    
    // @PostMapping
    // public Movie create(@RequestBody Movie movie) {
    //     return repository.save(movie);
    // }

    // @PutMapping("/{id}")
    // public Movie update(@PathVariable Long id, @RequestBody Movie movie) {
    //     movie.setId(id);
    //     return repository.save(movie);
    // }

    // @DeleteMapping("/{id}")
    // public void delete(@PathVariable Long id) {
    //     repository.deleteById(id);
    // }

    
    @PostMapping("/add")
    //public ResponseEntity<?> addMovie(@RequestBody Movie movie, @RequestParam String username) {
    public ResponseEntity<?> addMovie(@RequestBody Movie movie, Principal principal) {
        String username = principal.getName();
        User user = userRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.getMovies().add(movie);
        userRepo.save(user);

        return ResponseEntity.ok(movieRepo.save(movie));
    }


    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(
            @PathVariable("id") Long id,
            @RequestBody Movie updatedMovie,
            @RequestParam("username") String username) {
        
        System.out.println(">>> updateMovie called for user: " + username);

        // User user = userRepo.findByUsername(username)
        //         .orElseThrow(() -> new RuntimeException("User not found"));

        Movie movie = movieRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        // if (!user.getMovies().contains(movie)) {
        //     return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        // }

        movie.setTitle(updatedMovie.getTitle());
        movie.setDescription(updatedMovie.getDescription());
        movie.setReleaseYear(updatedMovie.getReleaseYear());
        movie.setWatched(updatedMovie.isWatched());
        movie.setReview(updatedMovie.getReview());

        return ResponseEntity.ok(movieRepo.save(movie));
    }


    @GetMapping("/user")
    //public ResponseEntity<List<Movie>> getMovies(@RequestParam String username) {
    public ResponseEntity<List<Movie>> getMovies(Principal principal) {
        String username = principal.getName();
        User user = userRepo.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

        return ResponseEntity.ok(user.getMovies());
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(
            @PathVariable("id") Long id,
            @RequestParam("username") String username) {

        movieRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
