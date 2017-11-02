CREATE DATABASE recipes_db;

USE recipes_db;

CREATE TABLE recipes (
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  recipe_name VARCHAR(100) NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  cook_time INTEGER(10) NOT NULL,
  ingredients VARCHAR(700) NOT NULL,
  instructions VARCHAR(700) NOT NULL,
  favorite BOOLEAN NOT NULL,
  image_url VARCHAR(700) NOT NULL,
  date TIMESTAMP,
  PRIMARY KEY (id)
);