use April25;

Drop Table If Exists Menu;

Drop Table if exists Restaurant;

Create Table Restaurant
(
   RestaurantID INT,
   RestaurantName varchar(30),
   City varchar(30), 
   MobileNo varchar(15),
   Email varchar(15),
   Location varchar(30),
   Rating numeric(9,2),
   Primary Key(RestaurantID),
   Unique(MobileNo),
   Unique(Email)
);

Create Table Menu
(
	MenuId INT auto_increment,
    RestaurantId INT,
    ItemName varchar(30),
    Price numeric(9,2),
    ItemType varchar(30),
    primary key(MenuId),
    foreign key(RestaurantId) References Restaurant(RestaurantId)
);