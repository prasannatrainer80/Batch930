-- Display list of tables available in current database 

show tables;

-- Display information about Emp table 

desc Emp;

-- Display all records from Emp table 

select * from Emp;

-- Display Empno, Ename, job, sal from Emp table 

select empno, ename, job, sal from Emp;

-- Where clause : Used to display records based on the condition 

-- Display all records whose sal >= 2000;

select * from Emp where sal >= 2000; 

-- Display all records whose job is 'Manager'

select * from Emp where job='Manager';

-- display info whose empno is 7900 

select * from Emp where empno = 7900; 

-- Display info about ename is 'FORD'

select * from Emp where ename='FORD'; 

-- between...and : This operator allows you to display values from start to end range 

select * from Emp where sal between 1000 and 2000;

select * from Emp where sal not between 1000 and 2000;

-- in operator : used to check for multiple values of particular column 

select * from emp where job in('CLERK','MANAGER','PRESIDENT');

select * from Emp where ename in('SMITH', 'ADAMS', 'MILLER');

select * from emp where job not in('CLERK','MANAGER','PRESIDENT');

select * from Emp where ename not in('SMITH', 'ADAMS', 'MILLER');

-- LIKE OPERATOR : used to display records w.r.t. wild cards 

-- display all records whose name starts with 'S' 

select * from Emp where ename like 'S%'; 

-- Display all records whose name ends with 'S' 

select * from Emp where ename like '%S';

-- Order By : Used to display data w.r.t. Specific field(s) in ascending or descending order 

select Empno, Ename, Job, Sal, Hiredate from Emp 
order By Job;

select Empno, Ename, Job, Sal, Hiredate from Emp 
order By Job DESC;

select Empno, Ename, job, sal, hiredate from Emp
order by Job, Ename;

select Empno, Ename, job, sal, hiredate from Emp
order by Job, Ename DESC;

