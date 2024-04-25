Drop Database if exists April25;

create database April25;

use April25;

Create Table Employee
(
	Empno INT,
    Name varchar(30),
    Gender ENUM('MALE','FEMALE'),
    Dept varchar(30),
    Desig varchar(30),
    Basic Numeric(9,2),
    primary key(empno)
);

Desc Employee;