#BAMAZON - An Amazon-type products database using mySQL

## DESCRIPTION
BAMAZON is a small simplified version of an amazon-type products database.
It uses node.js to run Customer and Manager mySQL commands.

##CUSTOMER MODE
In customer mode, the user is shown a list of all available products and then is prompted
to select one by its id number.
![bamazon customer main display](/images/customer_screenshot_1)

The customer can then select the number of items to buy.
![bamazon customer main display](/images/customer_screenshot_2)

As long as there is enough in stock, the transaction will go through and show the user the total cost of their purchase.
![bamazon customer main display](/images/customer_screenshot_3)

##MANAGER MODE  
In manager mode, the user has 4 options

###View Product Inventory
This allows the user to see a full list of products for sale, their id number, name, price and quantity in stock

###View Low Inventory
This allows the user to see any product that has a stock of less than 5.

###Add to Inventory
This allows the user to select a product by id number and add to its stock quantity

###Add New product
This allows the user to add a new product to the database, including name, department, price and stock quantity
