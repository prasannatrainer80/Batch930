use April25;

drop table if exists EmployPayroll;

Create Table EmployPayroll
(
   Empno INT,
   Name varchar(30),
   Gender ENUM('MALE','FEMALE'),
   Salary numeric(9,2),
   SalaryDate DateTime,
   ManagerID INT,
   Primary Key(Empno,SalaryDate)
);

Desc EmployPayroll;