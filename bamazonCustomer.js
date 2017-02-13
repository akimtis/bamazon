var mysql = require('mysql'); //installed
var inquirer = require('inquirer'); //installed

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'bamazon_db',
});

// connection.connect();
connection.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

connection.end(function(err) {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
});

// function selectTable(table){
//   connection.query('SELECT * from products', function (error, results, fields) {
//     if (error) throw error;
//     console.log(results);
//   });
// }

// connection.query('SELECT * from products', function (error, results, fields)
// {
//   console.log(results);
  // console.log('\n');

  // inquirer.prompt([
  // {type: "input",
  //   name: "products_id",
  //   message: "Type the id of the item you would like to purchase and hit return."}
  // ]).then(function(data){
  //   var purchase = data.products_id;
  //   console.log(data.products_id);

    // connection.query('SELECT * from products', function (error, results, fields) {
    //   console.log(results);
    //   console.log('\n');
    //   inquirer.prompt([
    //   {type: "input",
    //     name: "products_id",
    //     message: "Type the id of the item that you want."}
    //   ]).then(function(data){
    //     //do an insert into mysql 
    //     connection.query('INSERT into sales SET ?', {
    //       beer_id : data.beer_id,
    //       dranker_id : dranker
    //     }, function (error, results, fields) {
    //       console.log('insert complete')
    //     });
    //   });
    // });

  // });
// });
