DROP DATABASE IF EXISTS April25;

Create Database April25;

Use April25;

Create Table Employee
(
   Empno INT Primary Key,
   Name varchar(30) NOT NULL,
   Gender ENUM('MALE','FEMALE'),
   Dept varchar(30),
   Desig varchar(30),
   Basic Numeric(9,2)
);