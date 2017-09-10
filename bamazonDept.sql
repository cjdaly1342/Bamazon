DROP DATABASE IF EXISTS Bamazon_DeptsDB;

CREATE DATABASE Bamazon_DeptsDB;

USE Bamazon_DeptsDB;

CREATE TABLE Departments (
	ID INTEGER(11) AUTO_INCREMENT NOT NULL,
	DeptName VARCHAR(100) NOT NULL,
	Cost DECIMAL(11,2) NOT NULL,
	Sales DECIMAL(11,2) NOT NULL,
	PRIMARY KEY (ID)
);

INSERT INTO Departments (DeptName, Cost, Sales)
VALUES ('Electronics', 5000, 0);

INSERT INTO Departments (DeptName, Cost, Sales)
VALUES ('Music', 1000, 0);

INSERT INTO Departments (DeptName, Cost, Sales)
VALUES ('Instruments', 5000, 0);

INSERT INTO Departments (DeptName, Cost, Sales)
VALUES ('Furniture', 10000, 0);

INSERT INTO Departments (DeptName, Cost, Sales)
VALUES ('Pets - Dogs', 5000, 0);

INSERT INTO Departments (DeptName, Cost, Sales)
VALUES ('Tools', 10000, 0);