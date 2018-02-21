var mysql = require("mysql");
var inquirer = require("inquirer");
var fs = require("fs");

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
  manageProducts();
});

//function asks the user what action they want to perform
function manageProducts(){
  inquirer.prompt([
    {
      type: 'list',
      name: 'selectManagerAction',
        message: 'What do you want to do?',
        choices: [
          'View Products for Sale',
          'View Low Inventory',
          'Add to Inventory',
          'Add New Product',
          'Exit'
        ]
    }
  ]).then(function(response){
  //chooses the correct Manager function to run based on user input
    switch (response.selectManagerAction) {
      case 'View Products for Sale':
        viewProducts();
        break;
      case 'View Low Inventory':
        viewLowInventory();
        break;
      case 'Add to Inventory':
        addToInventory();
        break;
      case `Add New Product`:
        addNewProduct();
        break;
      case `Exit`:
        connection.end();
        break;
      default:
        console.log('Please select an option!');
    }
  })
}

//View Products function
//list every available item: the item IDs, names, prices, and quantities
function viewProducts(){
  console.log("===================PRODCUTS FOR SALE===========================");
  console.log("| ID |  Product Name  |  Price  |  Quantity  |");
  console.log("---------------------------------------------------------------");
  //Select all items available for sale in the database
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    //Display results in a table
    for (i = 0; i < res.length; i++) {
      console.log("| " + res[i].item_id + " | " + res[i].product_name +
        " | $" + res[i].price.toFixed(2) + " | " + res[i].stock_quantity + " |");
    }
    manageProducts();
  });

}

//View Low Inventory function
//list all items with an inventory count lower than five
function viewLowInventory(){
  console.log("==================LOW INVENTORY PRODUCTS=======================");
  console.log("| ID |  Product Name  |  Quantity  |");
  console.log("---------------------------------------------------------------");
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
    if(err) throw err;
    for (i=0; i < res.length; i++) {
      console.log("| " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].stock_quantity + " |");
    }
  manageProducts();
  });
}

//Add to Inventory function
//display a prompt that will let the manager "add more" of any item currently in the store
function addToInventory(){
  console.log("===================PRODCUTS FOR SALE===========================");
  console.log("| ID |  Product Name  |  Quantity  |");
  console.log("---------------------------------------------------------------");
  //Select all items available for sale in the database
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    //Display results in a table
    for (i = 0; i < res.length; i++) {
      console.log("| " + res[i].item_id + " | " + res[i].product_name +
        " | " + res[i].stock_quantity + " |");
    }
  });
//allow manager to select the item by its id number
//validate it's a variable
  inquirer.prompt([
    {
      type: "input",
      message: "Enter product ID number: ",
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
      message: "Enter the quantity you'd like to add: ",
      name: "quantity",
      validate: function(answer) {
        if (!(parseInt(answer))) {
          return 'Please enter a valid quantity';
        }
        return true;
      }
    }
  ]).then(function(response){
  //create a variable to hold the amount the user wants to add
      let addedInventory = parseInt(response.quantity)
  //From the database, select the correct item by id input by the user, and add the new inventory
      connection.query("UPDATE products SET stock_quantity = stock_quantity + " + addedInventory
      + " WHERE item_id =" + response.productID, function(err, res) {
        if (err) throw err;
        //Confirm the added inventory was successful
        console.log("Inventory update successful!");
        manageProducts();
      });

    })
  };

//Add New Product Function
//Allows the manager to add a completely new product to the store
function addNewProduct(){
  //walk user through prompts to get the new item info: name, department, price, and stock
  inquirer.prompt([
    {
      name:"productName",
      type:"input",
      message:"Product Name:"
    },
    {
      name:"department",
      type:"input",
      message:"Department:"
    },
    {
      name:"price",
      type:"input",
      message:"Price: ",
      validate: function(answer) {
        if (!(parseInt(answer))) {
          return 'Please enter a valid price';
        }
        return true;
      }
    },
    {
      name:"quantity",
      type:"input",
      message:"Quantity: ",
      validate: function(answer) {
        if (!(parseInt(answer))) {
          return 'Please enter a valid quantity';
        }
        return true;
      }
    }
  ]).then(function(response){
    let productName = response.productName;
    let department = response.department;
    let productPrice = parseFloat(response.price).toFixed(2);
    let quantity = parseInt(response.quantity);
    connection.query("INSERT INTO products SET ?",
      {
        product_name: productName,
        department_name: department,
        price: productPrice,
        stock_quantity: quantity
      },
      function(res, err){
      console.log("Product Added");
      manageProducts();
    })
  })
}
