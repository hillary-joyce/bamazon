DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(150),
  department_name VARCHAR(100),
  price DECIMAL(10,2),
  stock_quantity INT(10),
  PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Telescope", "Science & Technology", 99.99, 145);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mini Rocket", "Science & Technology", 25.00, 135);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("'I Love Space' Mug", "Kitchen", 11.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sputnik-shaped cutting board", "Kitchen", 22.30, 255);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("NASA Sheets", "Bedding", 42.00, 170);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Carl Sagan Body Pillow", "Bedding", 24.00, 220);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("'That's one small step for man' doormat", "Outdoor & Patio", 10.00, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Space Shuttle Tiki Torches", "Outdoor & Patio", 10.50, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apollo 11 Toothbrush Holder", "Bath", 5.00, 230);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Voyager Shower Caddy", "bath", 12.99, 145);
