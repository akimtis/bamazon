var mysql = require('mysql'); //installed
var inquirer = require('inquirer'); //installed
var Table = require('cli-table'); //installed
var prompt = require('prompt'); //installed

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db',
  port: 8889

});

// connection.connect();
connection.connect(function(err){
  if(err){
    console.log("error");
    return;
  }
  console.log("connected");
});

var itemsOrdered = []

connection.query('SELECT id, product_name, price FROM products', function(err, result){
  if(err) console.log(err);

//update table with product table information
  var table = new Table({
    head: ['Item Id#', 'Product Name', 'Price'],
    style: {
      compact: false,
      colAligns: ['center'],
    }
  });

  //loops through each item in the priduct table and pushes that information into a new row in the table
  for(var i = 0; i < result.length; i++){
    table.push(
      [result[i].id, result[i].product_name, result[i].price]
    );
  };

  console.log(table.toString());

  orderPlaced();

});

var orderPlaced = function(err, data){

  var recentOrder = {};

  // inquirer.prompt([
  // {type: "input",
  //   name: "products_id",
  //   message: "Type the id of the item you would like to purchase and hit return."},
  // {type: "input",
  //   name: "quantity_purchased",
  //   message: "How many would you like to purchase?"}
  // ]).then(function(data){
  //   var recentOrder = {
  //     id: data.products_id,
  //     quantity: data.quantity_purchased};
  //   console.log(recentOrder);
  // });
  
  var transactionEntry = {
    properties: {
      id:{
        message: "Type the id of the item you would like to purchase"
      },
      quantity:{
        message: "How many would you like to purchase?"
      }
    }
  };

  prompt.start();

  prompt.get(transactionEntry, function(err, response){

    //places these responses in the variable recentOrder

    var recentOrder = {
      id: response.id,
      quantity: response.quantity
    };
    
  itemsOrdered.push(recentOrder);
  console.log(recentOrder);
  console.log(itemsOrdered);

  connection.query('SELECT * FROM products WHERE id=?', itemsOrdered[0].id, function(err, result){
      console.log(result);
      if (err){console.log("error")

      }
      console.log(itemsOrdered[0]);
      if (result.stock_quantity < itemsOrdered[0].quantity){
        console.log("insufficient quanity in stock");
        
        connection.end(function(err) {
          console.log("transaction ended")
        });

      }else {

        console.log("your order has been placed");
        
        connection.end(function(err) {
          console.log("transaction ended")
        }); 
      };//else if
  });//connection.query 

  }); //prompt.get
}; //var orderPlaced


//if new quanity =< 0 return return insufficient quanity


// connection.end(function(err) {
//   console.log("transaction ended")
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });


  
