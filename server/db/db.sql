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
--  type 0 = post, 1 = comment, 2 = reply
CREATE TABLE posts (
  id int NOT NULL auto_increment,
  user_id int,
  post varchar(255),
  type varchar(255),
  parent_id int,
  PRIMARY KEY(id)
);
CREATE TABLE friends ( 
  id int NOT NULL auto_increment,
  user_id_a int NOT NULL, 
  user_id_b int NOT NULL,
  PRIMARY KEY(id)
);
INSERT INTO users (username, password, status, picture) VALUES('daniel', 'daniel', 'happy', 'thisisasamplepicture');
INSERT INTO users (username, password, status, picture) VALUES('darren', 'darren', 'happy2', 'thisisanewsamplepicture');
INSERT INTO friends (user_id_a, user_id_b) VALUES(1, 2);
INSERT INTO friends (user_id_a, user_id_b) VALUES(2, 1);