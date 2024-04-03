use cms;

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `CUS_ID` int NOT NULL AUTO_INCREMENT,
  `CUS_NAME` varchar(50) NOT NULL,
  `CUS_PHN_NO` varchar(50) NOT NULL,
  `CUS_USERNAME` varchar(50) NOT NULL,
  `CUS_PASSWORD` varchar(50) NOT NULL,
  `CUS_EMAIL` varchar(50) NOT NULL,
  PRIMARY KEY (`CUS_ID`),
  UNIQUE KEY `CUS_PHN_NO` (`CUS_PHN_NO`),
  UNIQUE KEY `CUS_USERNAME` (`CUS_USERNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=9122 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `customer` VALUES (1,'Prasanna Pappu','9381413089','prassucp','hexaware@','prassucp@gmail.com'),
(2,'Krishna Kumar','8939391144','krishnak','chennai@123','krishnak@gmail.com'),
(3,'Renu Srivastav','8755144556','Renu','ghazi@117','renusan@gmmail.com'),
(9,'Sunil','888235','sunilvizag','rushikonda','sunil@gmail.com'),
(91,'Naresh','8488444882','nareshp','infinite','naresh@gmail.com'),
(99,'asdfkjla','848233','asdkjf','kkkkasdjfkl','a@b.com'),
(993,'akljsdf','84884845','akjfd','faffafsd','848423'),
(9022,'kjsdlfak','88848483','sdfkjj','kkaskf','a@b.com'),
(9121,'Naresh','422555555','nareshps','infinite','naresh@gmail.com');

