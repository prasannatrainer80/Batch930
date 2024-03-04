use practice930;

drop table if exists Employ;

create table Employ
(
   Empno INT primary key, 
   Name varchar(30), 
   Gender ENUM('MALE','FEMALE'),
   Dept varchar(30),
   Desig varchar(30),
   Basic Numeric(9,2)
);