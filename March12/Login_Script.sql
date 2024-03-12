use practice930;

drop table if exists login;

create table login
(
    userName varchar(30) primary key,
    passCode varchar(30) not null
);

insert into login(userName,passCode) values('Srinvias','Mani'),('Karthik','Karanam'),('Akhil','Adapala'),('Satish','Gavini');

select * from Login;