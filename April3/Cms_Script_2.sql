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

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet` (
  `CUS_ID` int unsigned DEFAULT NULL,
  `WAL_ID` int unsigned NOT NULL AUTO_INCREMENT,
  `WAL_AMOUNT` double unsigned NOT NULL,
  `WAL_SOURCE` enum('PAYTM','CREDIT_CARD','DEBIT_CARD') DEFAULT 'DEBIT_CARD',
  PRIMARY KEY (`WAL_ID`),
  UNIQUE KEY `CUS_ID` (`CUS_ID`,`WAL_SOURCE`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `wallet` VALUES (1,1,4215,'PAYTM'), (1,2,3000,'DEBIT_CARD'),  (1,3,5602.36,'CREDIT_CARD'),  (2,4,4500.36,'DEBIT_CARD'), 
(3,5,485.23,'CREDIT_CARD'),  (2,6,3000,'CREDIT_CARD'),  (2,7,4560,'PAYTM'),   (3,8,56.36,'PAYTM'),  (3,9,4566,'DEBIT_CARD');
