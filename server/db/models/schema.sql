USE Study;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  membership INT DEFAULT 0
);

CREATE TABLE locations (
  id VARCHAR(255) PRIMARY KEY UNIQUE,
  name VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  address VARCHAR(255),
  image1 VARCHAR(255),
  image2 VARCHAR(255),
  image3 VARCHAR(255)
);

CREATE TABLE ratings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  coffeeTea INT,
  atmosphere INT,
  comfort INT,
  food INT,
  location VARCHAR(255),
  FOREIGN KEY (location) REFERENCES locations(id),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users_locations (
  user_id INT,
  location_id VARCHAR(255)
);

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  text VARCHAR(255),
  user_id INT,
  parent_id INT,
  score INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  location VARCHAR(255),
  FOREIGN KEY (location) REFERENCES locations(id) 
);

/* CHAT SCHEMAS */

CREATE TABLE chatgroups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  creator_id INT,
  group_name VARCHAR(255) UNIQUE,
  group_topic VARCHAR(255),
  FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE chatgroups_users (
  user_id INT,
  chatgroups_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (chatgroups_id) REFERENCES chatgroups(id)
);

CREATE TABLE chatgroups_invitations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  chatgroups_id INT, 
  user_id INT,
  FOREIGN KEY (chatgroups_id) REFERENCES chatgroups(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

