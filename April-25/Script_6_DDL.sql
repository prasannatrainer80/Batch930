use april25;

Drop Table If exists AgentPolicy;

Drop Table if exists Agent;

Drop Table If exists Policy;

Create Table Agent
(
   AgentId INT Primary Key auto_increment,
   FirstName varchar(30),
   MI Varchar(1),
   LastName varchar(30),
   FullName varchar(60),
   Gender ENUM('MALE','FEMALE'),
   SSN varchar(30),
   MaritalStatus INT,
   Address1 varchar(30),
   Address2 varchar(30),
   City varchar(30),
   state varchar(30),
   zipcode varchar(30),
   country varchar(30)
);

Create Table Policy
(
  PolicyID INT Primary Key auto_increment,
  AppNumber varchar(30),
  AppDate date,
  PolicyNumber varchar(30),
  AnnualPremium numeric(9,2),
  PaymentModeId INT,
  ModalPremium numeric(9,2)
);

Create Table AgentPolicy
(
    AgentID INT,
    PolicyID INT,
    IsSplitAgent INT,
    Foreign KEY(AGentID) REFERENCES Agent(AgentID),
    FOREIGN KEY(PolicyID) REFERENCES Policy(PolicyID),
    Primary Key(AgentID, PolicyID)
);