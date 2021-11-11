DROP DATABASE IF EXISTS wtwwf WITH (FORCE);

CREATE DATABASE wtwwf;

\c wtwwf;

CREATE TABLE movie (
    id INTEGER PRIMARY KEY,
    overview TEXT,
    popularity FLOAT,
    poster_path TEXT,
    release_date DATE,
    runtime INTEGER,
    title TEXT,
    vote_average FLOAT
);

CREATE TABLE tv (
    id INTEGER PRIMARY KEY,
    episode_runtime INTEGER[],
    first_air_date DATE,
    name TEXT,
    overview TEXT,
    popularity FLOAT,
    poster_path TEXT,
    vote_average FLOAT
);

CREATE TABLE keyword (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE movie_keyword (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movie,
    keyword_id INTEGER REFERENCES keyword
);

CREATE TABLE genre (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE movie_genre (
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movie,
    genre_id INTEGER REFERENCES genre
);

CREATE TABLE tv_genre (
    id SERIAL PRIMARY KEY,
    tv_id INTEGER REFERENCES tv,
    genre_id INTEGER REFERENCES genre
);

CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    username TEXT NOT NULL
);

CREATE TABLE user_movie (
    id SERIAL PRIMARY KEY,
    added_date TIMESTAMP DEFAULT now(),
    movie_id INTEGER REFERENCES movie,
    user_id INTEGER REFERENCES user_profile 
);

CREATE TABLE user_tv (
    id SERIAL PRIMARY KEY,
    added_date TIMESTAMP DEFAULT now(),
    tv_id INTEGER REFERENCES tv,
    user_id INTEGER REFERENCES user_profile    
);

CREATE TABLE friend_group (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE user_friend_group (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_profile,
    friend_group_id INTEGER REFERENCES friend_group
);

CREATE TABLE app_data (
    id SERIAL PRIMARY KEY,
    app_data_key text,
    value text
);