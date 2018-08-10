DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
	id INT AUTO_INCREMENT NOT NULL,
	item_id INT(30) NOT NULL,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(30,4) NULL,
	quantity INTEGER(30) NULL,
    PRIMARY KEY (id)
);

SELECT * FROM products;