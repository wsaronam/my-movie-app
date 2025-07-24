package com.example.movie_app.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;




@Entity
@Getter
@Setter
@NoArgsConstructor
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private int releaseYear;
    private boolean watched;
    private String review;

    // we may use this in the future if we want to tie in a movie with the User
    // @ManyToOne
    // @JoinColumn(name = "user_id")
    // private User user;
}
