CREATE DATABASE "Cafe_DB";

USE DATABASE "Cafe_DB";

CREATE TABLE Utilisateur(
   Id_Utilisateur INT AUTO_INCREMENT,
   Pseudo_Utilisateur VARCHAR(100) NOT NULL,
   Nom_Utilisateur VARCHAR(100) NOT NULL,
   Prenom_Utilisateur VARCHAR(100) NOT NULL,
   EstAdmin BOOLEAN NOT NULL,
   PRIMARY KEY(Id_Utilisateur),
   UNIQUE(Pseudo_Utilisateur)
);

CREATE TABLE Coffee(
   Id_Coffee INT AUTO_INCREMENT,
   Nom_Coffee VARCHAR(100) NOT NULL,
   Prix_Coffee INT NOT NULL,
   Image_Coffee VARCHAR(1000) NOT NULL,
   PRIMARY KEY(Id_Coffee),
   UNIQUE(Nom_Coffee)
);

CREATE TABLE Jeton(
   Id_Jeton INT AUTO_INCREMENT,
   Fk_Client INT,
   Fk_Coffee VARCHAR(50),
   PRIMARY KEY(Id_Jeton)
);

CREATE TABLE Acheter(
   Id_Utilisateur INT,
   Id_Jeton INT,
   PRIMARY KEY(Id_Utilisateur, Id_Jeton),
   FOREIGN KEY(Id_Utilisateur) REFERENCES Utilisateur(Id_Utilisateur),
   FOREIGN KEY(Id_Jeton) REFERENCES Jeton(Id_Jeton)
);

CREATE TABLE Utiliser(
   Id_Coffee INT,
   Id_Jeton INT,
   PRIMARY KEY(Id_Coffee, Id_Jeton),
   FOREIGN KEY(Id_Coffee) REFERENCES Coffee(Id_Coffee),
   FOREIGN KEY(Id_Jeton) REFERENCES Jeton(Id_Jeton)
);
