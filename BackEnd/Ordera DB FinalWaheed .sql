create database Ordera4

create table Customer2
(
	CustomerID int primary key,
	CustomerName varchar(100),
	CustomerE_mail varchar(50),
	CustomerPassword varchar(100),
	CustomerPhoneNumber int,
	Imagesrc varchar(200),
	FavoriteIDs int,

)

create table Captain2
(
	CaptainID int primary key,
	CaptainName varchar(100),
	CaptainE_mail varchar(50),
	CaptainPassword varchar(100),
	CaptainPhoneNumber int,
	Imagesrc varchar(200)

)

create table SYSAdmin2
(
	AdminID int primary key,
	AdminName varchar(100),
	AdminE_mail varchar(50),
	AdminPassword varchar(100),
	AdminPhoneNumber int,
	Imagesrc varchar(200)

)


create table Categories2
(
	CategoryID int primary key,
	CategoryName varchar(100),
	CategorySpecification varchar(200),
	Imagesrc varchar(200)
)



create table Items_Prices2
(
	ItemID int primary key,
	ItemName varchar(100),
	ItemSpecification varchar(200),
	ItemPrice int,
	Imagesrc varchar(200),
	PlaceID int,
	Favorite_IDs int

)




create table Places2
(
	PlaceID int primary key,
	PlaceName varchar(50),
	PlaceSpecification varchar(200),
	Category_ID int,
)


create table Favorites2
(
	FavoriteID int primary key,
	FavoriteNumber int,
	ItemIDs varchar(100),
	Itemname varchar(100),
	ItemSpecification varchar(200),
	PlaceIDs int,
	ItemPrices varchar(300),
)

 

create table Payments2
(
	PaymentID int primary key,
	PaymentMethod varchar(20),
	TotalPaymentAmount int,
	CustomerID int,
	ItemIDs int,
	ItemPrices varchar(300),

)



create table Orders2
(
	OrderID int primary key,
	CustomerID int,
	CaptainID int,
	ItemsIDs int,
	PaymentID int,
)

alter table Orders2 add constraint CustomerID_FK foreign key (CustomerID) references Customer2(CustomerID);
alter table Orders2 add constraint CaptainID_FK foreign key (CaptainID) references Captain2(CaptainID);
alter table Orders2 add constraint PaymentID_FK foreign key (PaymentID) references Payments2(PaymentID);
alter table Orders2 add constraint ItemID_FK foreign key (ItemsIDs) references Items_Prices2(ItemID);



alter table Items_Prices2 add constraint PlaceID_FK foreign key (PlaceID) references Places2(PlaceID);
alter table Items_Prices2 add constraint Item_Favorite_ID_FK foreign key (Favorite_IDs) references Favorites2(FavoriteID);



alter table Payments2 add constraint PayCustomerID_FK foreign key (CustomerID) references Customer2(CustomerID);


alter table Places2 add constraint Places_Category_ID_FK foreign key (Category_ID) references Categories2(CategoryID);



========================================================================================================================================================================


INSERT INTO Customer2 (CustomerID, CustomerName, CustomerE_mail, CustomerPassword, CustomerPhoneNumber) VALUES (1, 'Hossam Bhi','hossambhi@gmail.com', 01234, 01099086281);

INSERT INTO Customer2 (CustomerID, CustomerName, CustomerE_mail, CustomerPassword, CustomerPhoneNumber) VALUES (2, 'Mohamed Sobhy','mohamedbarhoma@gmail.com', 01234 , 01060927266);

INSERT INTO Customer2 (CustomerID, CustomerName, CustomerE_mail, CustomerPassword, CustomerPhoneNumber) VALUES (3, 'Bahaa eldin','bahaa1365@gmail.com', 01234 , 01099626370);

INSERT INTO Customer2 (CustomerID, CustomerName, CustomerE_mail, CustomerPassword, CustomerPhoneNumber) VALUES (4, 'Mohamed Waheed','mohamedwaheed458@gmail.com', 01234 , 01144338618);

INSERT INTO Customer2 (CustomerID, CustomerName, CustomerE_mail, CustomerPassword, CustomerPhoneNumber) VALUES (5, 'Kareem Mohamed','kareemmohamed966@gmail.com', 01234 , 01119661002);


========================================================================================================================================================================


INSERT INTO Captain2 (CaptainID, CaptainName, CaptainE_mail, CaptainPassword, CaptainPhoneNumber) VALUES (1, 'Hossam Bhi','hossambhi@gmail.com', 12345, 01099086281);

INSERT INTO Captain2 (CaptainID, CaptainName, CaptainE_mail, CaptainPassword, CaptainPhoneNumber) VALUES (2, 'Mohamed Sobhy','mohamedbarhoma@gmail.com', 12345, 01060927266);

INSERT INTO Captain2 (CaptainID, CaptainName, CaptainE_mail, CaptainPassword, CaptainPhoneNumber) VALUES (3, 'Bahaa eldin','bahaa1365@gmail.com', 12345, 01099626370);

INSERT INTO Captain2 (CaptainID, CaptainName, CaptainE_mail, CaptainPassword, CaptainPhoneNumber) VALUES (4, 'Mohamed Waheed','mohamedwaheed458@gmail.com', 12345, 01144338618);

INSERT INTO Captain2 (CaptainID, CaptainName, CaptainE_mail, CaptainPassword, CaptainPhoneNumber) VALUES (5, 'Kareem Mohamed','kareemmohamed966@gmail.com', 12345, 01119661002);


========================================================================================================================================================================

INSERT INTO SYSAdmin2 (AdminID, AdminName, AdminE_mail, AdminPassword, AdminPhoneNumber) VALUES (1, 'Mohamed Waheed','mohamedwaheed458@gmail.com', 1020, 01144338618);

INSERT INTO SYSAdmin2 (AdminID, AdminName, AdminE_mail, AdminPassword, AdminPhoneNumber) VALUES (2, 'Mohamed Sobhy','mohamedbarhoma@gmail.com', 1020, 01060927266);

INSERT INTO SYSAdmin2 (AdminID, AdminName, AdminE_mail, AdminPassword, AdminPhoneNumber) VALUES (3, 'Hossam Bhi','hossambhi@gmail.com', 1020, 01099086281);

INSERT INTO SYSAdmin2 (AdminID, AdminName, AdminE_mail, AdminPassword, AdminPhoneNumber) VALUES (4, 'Bahaa Eldin','bahaa1365@gmail.com', 1020, 01099626370);

INSERT INTO SYSAdmin2 (AdminID, AdminName, AdminE_mail, AdminPassword, AdminPhoneNumber) VALUES (5, 'Kareem Mohamed','bahaa1365@gmail.com', 1020, 01119661002);


==========================================================================================================================================================================

INSERT INTO Categories2 (CategoryID, CategoryName, CategorySpecification) VALUES (1, 'Pharmacy','Human Medicine' );

INSERT INTO Categories2 (CategoryID, CategoryName, CategorySpecification) VALUES (2, 'Fast Food','eatable food but not healthy');

INSERT INTO Categories2 (CategoryID, CategoryName, CategorySpecification) VALUES (3, 'Restaurant','eatable food but not healthy because MaMa knows best');

INSERT INTO Categories2 (CategoryID, CategoryName, CategorySpecification) VALUES (4, 'Patesteries','Eastern - Western patesteries');

 
==========================================================================================================================================================================



INSERT INTO Places2 (PlaceID, PlaceName, PlaceSpecification, Category_ID) VALUES (1, 'Mckdonalds','restaurant', 1);

INSERT INTO Places2 (PlaceID, PlaceName, PlaceSpecification, Category_ID) VALUES (2, 'El Ezaby pharmacy','super wide range pharmacy', 2);


==========================================================================================================================================================================


INSERT INTO Favorites2 (FavoriteID, ItemIDs, Itemname, ItemSpecification, PlaceIDs, ItemPrices ) VALUES (1, 1,'Chicken', 'Fast Food' , 1, 75);

INSERT INTO Favorites2 (FavoriteID, ItemIDs, Itemname, ItemSpecification, PlaceIDs, ItemPrices ) VALUES (2, 2,'Congestal', 'Medicine' , 2, 12.5);

==========================================================================================================================================================================


INSERT INTO Items_Prices2 (ItemID, ItemName, ItemSpecification, PlaceID, ItemPrice, Favorite_IDs) VALUES (1, 'Big Mac','Fast Food', 1, 45, 1);

INSERT INTO Items_Prices2 (ItemID, ItemName, ItemSpecification, PlaceID, ItemPrice, Favorite_IDs) VALUES (2, 'Congestal','Medicine', 2, 12.5, 1);


==========================================================================================================================================================================


INSERT INTO Payments2 (PaymentID, PaymentMethod, TotalPaymentAmount, CustomerID, ItemIDs, ItemPrices) VALUES (1, 'Cash', 45 , 1 , '2', '25');


==========================================================================================================================================================================


INSERT INTO Orders2 (OrderID, CustomerID, CaptainID, ItemsIDs, PaymentID) VALUES (1, 1, 2 , 2 , 1);