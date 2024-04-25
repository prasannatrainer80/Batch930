use April25;

delete from EmployPayroll;

insert into EmployPayroll(Empno, Name, Gender, Salary, SalaryDate, ManagerId) 
values(1,'Ganesh','MALE',88234,'2024-04-01',NULL),
(2,'Shivendra','MALE',88234,'2024-04-01',1),
(3,'Pramoditha','FEMALE',88111,'2024-04-01',NULL),
(1,'Ganesh','MALE',90000,'2024-05-01',NULL);