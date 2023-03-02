DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS messages;
CREATE TABLE messages (
  /* Describe your table here.*/
  ID int NOT NULL AUTO_INCREMENT,
  BODY varchar(255),
  PRIMARY KEY (ID)
);

/* Create other tables and define schemas for them here! */

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  /* Describe your table here.*/
  ID int NOT NULL AUTO_INCREMENT,
  NAME varchar(255),
  PRIMARY KEY (ID)
);

/* <name-of-column-1> <data-type-of-column> [ADDITIONAL-INFO-ABOUT-THIS-COLUMN],*/
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

