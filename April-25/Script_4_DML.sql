Use April25;


Delete from LeaveDetails;
delete from EmployDetails;

Insert into EmployDetails(Empno, Name, Gender, Department, Desig, Basic) 
values(1, 'Sadhana','FEMALE','Sql','Expert',88323),
(2,'Anil','MALE','Java','Programmer',88411),
(3,'Hari','MALE','React','Manager',88311),
(4,'Priyadarshan','MALE','Java','Expert',88114),
(5, 'Mayuri','FEMALE','Sql','Expert',82355),
(6,'Meghana','FEMALE','Sql','Developer',88424);

Insert into LeaveDetails(EmpId,LeaveStartDate,LeaveEndDate,LeaveReason,LeaveType,ManagerComments)
values(1,'2024-10-10','2024-10-10','Sick','EL','Go ahead'),
(2,'2024-11-11','2024-12-12','Sick','EL','Take Rest'),
(1,'2024-05-15','2024-05-16','Going Home','EL','Enjoy'),
(2,'2024-10-12','2024-12-12','Marriage','EL','Ok'),
(3,'2024-11-11','2024-11-17','Exams','EL','Prepare Well');
