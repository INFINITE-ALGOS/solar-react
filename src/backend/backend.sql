-- these are the SQL commands to create DB and required table in it
-- server.js file contains the required configuration & rest files appropriately updated
-- tested on mysql workbench through running node server.js for backend and npm start for react on different ports

SELECT VERSION();
create database mydatabase;
USE mydatabase;

 CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    type ENUM('admin', 'customer', 'internal_teams', 'supplier') NOT NULL
);

SHOW COLUMNS FROM users;

select * from users;

