// Bamazon - Online StoreFront
// ===========================================================================================

// npm install inquirer
var inquirer = require('inquirer');

// npm install mysql or npm install mysqljs/mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'BamazonDB'
}); // End var connection

function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please Enter a Whole, Non-Zero, number: ';
	} // End if else statement
}; // End function validateInput(value)

function userPrompt() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'ID',
			message: 'Plese Enter the Product Number you would like to Purchase',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'ID',
			message: 'Enter the quantity you would like to purchase',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		var item = input.ID;
		var quantity = input.Stock;
		var queryStr = 'SELECT * FROM Products WHERE=?';
		connection.query(queryStr, {ID: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Product Number, Please Select Valid Product. ');
				displayInventory();
			} else {
				var productData = data[0];

				if (Stock <= productData.Stock) {
					console.log('Thank You for your Purchase!!');

					var updateQueryStr = 'UPDATE Products SET Stock = ' + (productData.Stock - quantity) 
						+ 'WHERE ID = ' + item; 

					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;
						console.log("Your order has been placed! The total is $" + productData.Price * quantity);
						console.log("Thank You for Your Purchase!");
						console.log("\n=============================================================");
						displayInventory();

					}); // End connection.query(updateQueryStr, function(err, data))
				} // End if (Stock <= productData.Stock)
			} // End if else statment
		}); // End connection.query(queryStr, {ID: item}, function(err, data))
	}); // End .then(function(input))
}; // End function userPrompt()

function displayInventory() {
	queryStr = 'SELECT * FROM Products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;
		console.log('Current Inventory: ');
		console.log('=====================================\n');

		var strOut = ' ';
		for (var i = 0; i < data.length; i++) {
			strOut = ' ';
			strOut += 'Product ID: ' + data[i].ID + ' // ';
			strOut += 'Product: ' + data[i].Product + ' // ';
			strOut += 'Department: ' + data[i].Dept + ' // ';
			strOut += 'Price: $' + data[i].Price + '\n';

			console.log(strOut);
		}; // End for loop

		console.log("====================================================================\n");
		userPrompt();

	}); // End connection.query(queryStr, function(err, data))
}; // End function displayInventory()

function runBamazon() {
	displayInventory();
}; // End function runBamazon()

runBamazon();