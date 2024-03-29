drop database if exists practice;

create database practice;

use practice;

drop table if exists Employ;

Create Table Employ
(
   Empno INT primary key,
   Name varchar(30),
   Gender enum('MALE', 'FEMALE'),
   Dept varchar(30),
   Desig varchar(30),
   Basic numeric(9,2)
);
