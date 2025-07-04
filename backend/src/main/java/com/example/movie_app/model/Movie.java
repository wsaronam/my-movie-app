package com.example.movie_app.model;

import jakarta.persistence.*;

@Entity
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private int year;
    private boolean watched;
    private String review;


    public Movie() {}

    // GETTERS
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public int getYear() {
        return year;
    }

    public boolean isWatched() {
        return watched;
    }

    public String getReview() {
        return review;
    }


    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public void setWatched(boolean watched) {
        this.watched = watched;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
