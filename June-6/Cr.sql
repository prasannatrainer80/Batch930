drop database if exists cr;

create database cr;

use cr;

Create Table Complaint
(
   ComplaintID varchar(30) primary key,
   ComplaintType varchar(30),
   CDescription varchar(100),
   ComplaintDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   Severity varchar(20),
   Status varchar(30) default 'Pending'
);

-- ComplaintID to be generated Automatically C001,C002 etc...

-- AddComplaint, SearchComplaint, ShowAllComplaint

Create Table Resolve
(
   ComplaintID varchar(30),
   ComplaintDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   ResolveDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   ResolvedBy varchar(30),
   Comments varchar(100)
);

--- *** Plesae finish by 11.15 the Complaint 3 operations, as i will explain about resolve ***