drop database if exists cms;

create database cms;

use cms;

create table Restaurant
(
   RestaurantId varchar(30) primary key,
   RestaurantName varchar(30),
   City varchar(30),
   Location varchar(30),
   Rating varchar(10)
);

create table menu 
(
   menuId int auto_increment primary key,
   RestaurantId varchar(30) references Restaurant(RestaurantID),
   itemName varchar(30),
   price numeric(9,2),
   speciality varchar(30)
);
   