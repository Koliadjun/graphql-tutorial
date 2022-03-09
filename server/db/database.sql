create TABLE director(id SERIAL PRIMARY KEY, name VARCHAR(255), age INTEGER );


CREATE TABLE movie(id SERIAL PRIMARY KEY,
                                     name VARCHAR(255),
                                          genre VARCHAR(255),
                                                rate INTEGER, watched BOOLEAN, director_id INTEGER,
                   FOREIGN KEY (director_id) REFERENCES director(id));