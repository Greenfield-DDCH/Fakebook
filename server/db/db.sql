CREATE DATABASE facebook;

USE facebook;

CREATE TABLE users (
  id int NOT NULL auto_increment,
  username varchar(50),
  password varchar(255),
  status varchar(255),
  picture varchar(255),
  PRIMARY KEY(id)
);

CREATE TABLE posts (
  id int NOT NULL auto_increment,
  post varchar(255),
  PRIMARY KEY(id)
);

CREATE TABLE friends ( 
  id int NOT NULL auto_increment,
  user_id_a int NOT NULL, 
  user_id_b int NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE comments (
  id int NOT NULL auto_increment,
  owner_id int NOT NULL,
  comment varchar(255),
  post_id int,
  comment_id int,
  FOREIGN KEY (comment_id) REFERENCES comments(id),
  FOREIGN KEY (post_id) REFERENCES posts(id),
  PRIMARY KEY(id)
);
