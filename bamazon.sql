DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE Products (
ID INTEGER NOT NULL,
Product VARCHAR(100) NOT NULL,
Dept VARCHAR(100) NOT NULL,
Price DECIMAL(6,2) NOT NULL,
Stock INTEGER NOT NULL,
PRIMARY KEY (ID)
);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (110, 'iPhone6', 'Electronics', 413.42, 10);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (274, 'Mastodon - OblivionLP', 'Music', 27.34, 2);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (367, 'Epiphone SG', 'Instruments', 607.47, 32);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (143, 'HP Omen', 'Electronics', 1838.68, 4);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (417, 'Recliner', 'Furniture', 415.64, 17);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (522, 'Italian Greyhoud', 'Pets - Dogs', 13.42, 1);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (613, 'Snap-On Wrench Set', 'Tools', 407.32, 82);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (166, 'XBox One', 'Electronics', 412.37, 13);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (523, 'Karin Terrier', 'Pets - Dogs', 13.43, 1);

INSERT INTO Products (ID, Product, Dept, Price, Stock)
VALUES (233, 'Opeth - Still LifeLP', 'Music', 38.41, 3);

