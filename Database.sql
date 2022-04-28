CREATE DATABASE data_base; 

CREATE TABLE article(
    Article_Id SERIAL PRIMARY KEY, 
    famille VARCHAR(30),
    designation VARCHAR(100),
    unite_mesure VARCHAR(30),
    prix_ttc VARCHAR(6)

);
CREATE TABLE client(
Client_Id SERIAL PRIMARY KEY,
name VARCHAR(50),
password VARCHAR(50),
email VARCHAR(50),
phone VARCHAR(15)
);