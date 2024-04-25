use april25;

drop table if exists LeaveDetails;

Drop Table If Exists EmployDetails;

Create Table EmployDetails
(
     Empno INT,
	 Name varchar(30),
     Gender ENUM('MALE','FEMALE'),
     Department varchar(30),
     Desig varchar(30),
     Basic Numeric(9,2),
     primary key(empno)
);

Desc EmployDetails;

Create Table LeaveDetails
(
    LeaveID INt Primary Key auto_increment,
    EmpId INT,
    LeaveStartDate Date,
    LeaveEndDate Date,
    LeaveReason varchar(30),
    LeaveType ENUM('EL','PL','ML'),
    ManagerComments varchar(30),
    FOREIGN KEY(EmpId) REFERENCES EmployDetails(Empno)
);