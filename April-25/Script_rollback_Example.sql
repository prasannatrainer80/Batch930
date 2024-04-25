use april25;
drop table test;

create table Test
(
   id int primary key auto_increment,
   name varchar(30),
   grade numeric(9,2)
);

insert into Test(name,grade) values('sadhana',5.2),('Hari',5.2),('Raj',5.2),
('Balaji',6.2);

select * from test;

set autocommit = 0;

start transaction;
delete from Test where id=4;

rollback;

start transaction;
delete from Test where id=3;

commit;