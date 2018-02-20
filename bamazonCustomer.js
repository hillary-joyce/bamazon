var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "NEWPASS",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  customerPurchase();
});

//function to prompt customer for purchase
function promptCustomer() {
  inquirer.prompt([
    //ask the user for the ID of the product they would like to buy
    {
      type: "input",
      message: "Enter the product ID of the item you'd like to buy: ",
      name: "productID",
      validate: function(answer) {
        if (!(parseInt(answer))) {
          return 'Please enter a valid ID';
        }
        return true;
      }
    },
    //ask how many units of the product they would like to buy
    //validate that their input is a valid number
    {
      type: "input",
      message: "Enter the quantity you'd like to buy: ",
      name: "quantity",
      validate: function(answer) {
        if (!(parseInt(answer))) {
          return 'Please enter a valid quantity';
        }
        return true;
      }
    }
  ]).then(function(response) {
  //Select the item requested from the database
    connection.query("SELECT * FROM products WHERE item_id=" + response.productID, function(err, res) {
      if (err) throw err;

      //check if store has enough of the product to meet the customer's request
      if (parseInt(response.quantity) > parseInt(res[0].stock_quantity)) {
        console.log("Insufficient Quantity!");
        promptCustomer();
      } else {

        //update the SQL database to reflect the remaining quantity
        let newQuantity = parseInt(res[0].stock_quantity) - parseInt(response.quantity)
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: newQuantity
          },
          {
            item_id: response.productID
          }
        ], function(err, res) {
          if (err) throw err;
        });
        //Confirm the purchase was successful
        console.log("Purchase successful!");
        //Once the update goes through, show the customer the total cost of their purchase
        console.log("Total price: $" + (res[0].price * response.quantity).toFixed(2));
        connection.end();
      }
    })
  });
}

//Function to display the products for sale and prompt them to select one for purchase
function customerPurchase() {
  console.log("==================PRODCUTS FOR SALE==========================");
  //Select all items available for sale in the database
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    //Display results in a table
    for (i = 0; i < res.length; i++) {
      console.log("| " + res[i].item_id + " | " + res[i].product_name +
        " | $" + res[i].price.toFixed(2) + " | ");
    }
    promptCustomer();

  });
}
