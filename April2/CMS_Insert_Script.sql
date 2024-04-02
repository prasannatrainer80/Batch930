use cms;

truncate table Restaurant;

insert into Restaurant(RestaurantId, RestaurantName, City, Location, Rating)
values('R001','Alpha Hotel','Hyderabad','Maredpally','4.6'),
	('R002','Paradise','Hyderabad','Patny','4.5'),
    ('R003','Pista House','Secunderabad','Banjara Hills','4.2'),
    ('R004','Dolphin','Vizag','Daba Gardens','4.6');

truncate table Menu;

insert into Menu(RestaurantId,ItemName,Price,Speciality) values('R001','Veg Biryani',674.22,'VEG'),
('R001','Haleem',1674.22,'NON-VEG'),
('R001','Paneer 65',333.22,'VEG'),

('R002','Rajma',874.22,'VEG'),
('R002','Butter Nan',54.22,'VEG'),
('R002','Roti',77.22,'VEG'),

('R003','ALU 65',474.22,'VEG'),
('R003','Kadai Paneer',774.22,'VEG'),
('R003','Rumali Roti',64.22,'VEG'),

('R004','Prawns Fry',1674.22,'NON-VEG'),
('R004','Mutton Biryani',974.22,'NON-VEG'),
('R004','Chicken Fried Rings',774.22,'NON-VEG');