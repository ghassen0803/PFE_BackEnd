CREATE DATABASE data_base; 

CREATE TABLE article(
    Article_Id SERIAL PRIMARY KEY, 
    famille VARCHAR(30),
    designation VARCHAR(100),
    unite_mesure VARCHAR(30),
    prix_ttc VARCHAR(6)

);
CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(50),
email VARCHAR(50),
password VARCHAR(50)
);
CREATE TABLE reservation(
id SERIAL PRIMARY KEY,
article VARCHAR(50),
quantite VARCHAR(15),
prix_ttc VARCHAR(15),
date VARCHAR(20),
user_id VARCHAR(5)
);