var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "root",
  database: "bamazon_DB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log("Take a look at our latest products!");
  DisplayProduct();
  store();
 // connection.end(); 
});

function store() {
  connection.query("SELECT * from products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
    }

    inquirer
      .prompt([
        {
          name: "select",
          type: "input",
          message: "What would you like to buy? Enter the ID to select the product."
        },
        {
          name: "qnty",
          type: "input",
          message: "How much would you like to purchse?"
        }
      ]).then(function (input) {
        var item = input.select - 1; 
        var howmuch = parseInt(input.qnty);
        var totalcost = parseFloat(((res[item].price) * howmuch).toFixed(2));
        if (res[item].quantity >= howmuch) {
          connection.query("UPDATE products SET ? WHERE ?", [{ quantity: (res[item].quantity - howmuch) }, 
          {id: input.select }], 
          function (err, resu) {
            if(err) throw (err)
            console.log("Your purchase of " + res[item].product_name + " was successful. You will be charged " + totalcost.toFixed(2));
          });
        }
        else {
          console.log("Sorry, not enough in stock."); 
        }
        inquirer
          .prompt([
            {
              name: "cont",
              type: "confirm",
              message: "Would you like to continue shopping?",
              default: true
            }
          ]).then(function(ans){
            if(ans.cont === true){
              store();
            }
            else{
              console.log("Come again soon!");
              connection.end();
            }
          })
      });
    });
}


 
function DisplayProduct() { 
  connection.query("SELECT * from products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].quantity);
      console.log("------------------------");
    }
  })
}