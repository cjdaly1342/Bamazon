// Bamazon - Manager
// ===========================================================================================

// npm install inquirer
var inquirer = require('inquirer');

// npm install mysql or npm install mysqljs/mysql
var mysql = require('mysql');

// localhost connection
var connection = mysql.createConnection({
	// localhost
	host: 'localhost',
	
	port: 3306,
	
	user: 'root',
	
	password: 'password',
	
	database: 'BamazonDB'

}); // End var connection = mysql.createConnection({})

// Bamazon Manager prompt, gives the list of choices
function managerPrompt() {
	// inquirer prompt
	inquirer.prompt([
		
		{
		
			type: 'list',

			name: 'option',
		
			message: 'Please Select an Option: ',
		
			choices: ['View Products for Sale', 'Inventory', 'Add to Inventory', 'Add New Product'],
		
			filter: function(value) {

				if (value === 'View Products for Sale') {
		
					return 'sale';
		
				} else if (value === 'Inventory') {
		
					return 'Inventory';
		
				} else if (value === 'Add to Inventory') {
		
					return 'addInventory';
		
				} else if (value === 'Add New Product') {
		
					return 'newProduct';
		
				} else {
		
					console.log('Error, Unsupported Operation!');
		
					exit(1);
		
				} // End else {}

			} // End filter: function(value)

		} // End inquirer.prompt 

		// this function calls the different functions available based on the users choice
	]).then(function(input) {
		
		if (input.option === 'sale') {
		
			displayInventory();
		
		} else if (input.option === 'Inventory') {
		
			displayLowInventory();
		
		} else if (input.option === 'addInventory') {
		
			addInventory();
		
		} else if (input.option === 'newProduct') {
		
			createNewProduct();
		
		} else {
		
			console.log('Error, Unsupported Operation!');
		
			exit(1);
		} // End if else statement
	}); // End .then(function(input) {}) 
}; // End function managerPrompt()

// Displays the current inventory
function displayInventory() {
	
	queryStr = 'SELECT * FROM Products';
	
	connection.query(queryStr, function(err, data) {
	
		if (err) throw err;

		console.log('Existing Inventory: ');
		
		console.log('====================================\n');

		var strOut = ' ';
		
		for (var i = 0; i < data.length; i++) {

			strOut = ' ';
			
			strOut += 'Product ID: ' + data[i].ID + ' // ';
			
			strOut += 'Product Name: ' + data[i].Product + ' // ';
			
			strOut += 'Department: ' + data[i].Dept + ' // ';
			
			strOut += 'Price: $' + data[i].Price + ' // ';
			
			strOut += 'Quantity: ' + data[i].Stock + ' \n ';

			console.log(strOut);
		} // End for loop

		console.log("=====================================================\n");

		connection.end();
	}); // End connection.query(queryStr, function(err, data) {})
}; // End function displayInventory()

// displays items with an stock lower than 10
function displayLowInventory() {
	queryStr = 'SELECT * FROM Products WHERE Stock < 10';

	connection.query(queryStr, function(err, data) {
	
		if (err) throw err;
	
		console.log('Low Inventory Items (below 10): ');
	
		console.log('=======================================================\n');
	
		var strOut = ' ';
	
		for (var i = 0; i < data.length; i++) {
	
			strOut = ' ';
	
			strOut += 'Item ID: ' + data[i].ID + ' // ';
	
			strOut += 'Product Name: ' + data[i].Product + ' // ';
	
			strOut += 'Department: ' + data[i].Dept + ' // ';
	
			strOut += 'Price: $' + data[i].Price + ' // ';
	
			strOut += 'Quantity: ' + data[i].Stock + '\n';

			console.log(strOut);
		} // End for loop

		console.log('========================================================\n');

		connection.end();
	}); // End connection.query(queryStr, function(err, data))
}; // End function displayLowInventory()

// function to validate integers
function validateInteger(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please Enter a Non-Zero Number.';
	} // End if else statement
}; // End function validateInteger(value) {}

function validateNumeric(value) {
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Please enter a Positive, Non-Zero, number for the Item Price.'
	} // End if else statement
}; // End function validateNumeric(value) {}

// function used to add an item to the inventory
function addInventory() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'Product ID',
			message: 'Please enter the product ID for Stock Update.',
			validate: validateInteger,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to Add?',
			validate: validateInteger,
			filter: Number
		} // End inquirer.prompt([{}])

	]).then(function(input) {

		var item = input.ID;
		
		var addQuantity = input.Stock;
		
		var queryStr = 'SELECT * FROM Products WHERE=?';
		
		connection.query(queryStr, {ID: item}, function(err, data) {
		
			if (err) throw err;
		
			if (data.length === 0) {
		
				console.log('Error: Invalid Product ID. Please Select a Valid Product ID.');
		
				addInventory();
		
			} else {
		
				var productData = data[0];
		
				console.log('Updating Inventory...');
		
				var updateQueryStr = 'UPDATE Products SET Stock = ' + (productData.Stock + addQuantity) + 'WHERE ID = ' + item;
		
				connection.query(updateQueryStr, function(err, data) {
		
					if (err) throw err;
		
					console.log('Stock count for Product ID ' + item + ' has been updated to ' + (productData.Stock + addQuantity) + ',');
		
					console.log('=========================================\n');
		
					connection.end();
		
				}); // End connection.query(updateQueryStr, function(err, data))
			} // End if else statement
		}); // End connection.query(queryStr, {ID: item}, function(err, data))
	}); // End .then(function(input))
}; // End function addInventory()

// creates a new product to add to the inventory
function createNewProduct() {
	
	inquirer.prompt([
	
		{
			type: 'input',
			name: 'Product',
			message: 'Please enter the new product name.',
		},
	
		{
			type: 'input',
			name: 'Dept',
			message: 'Which department does this new product belong to?',
		},
	
		{
			type: 'input',
			name: 'Price',
			message: 'What is the price per unit?',
			validate: validateNumeric
		},
	
		{
			type: 'input',
			name: 'Stock',
			message: 'How many units are in stock?',
			validate: validateInteger
		} 
	
	]).then(function(input) {
	
		console.log('Adding New Item: \n');
	
		console.log('Product Name: ' + input.Product + '\n');
	
		console.log('Department: ' + input.Dept + '\n');
	
		console.log('Price: ' + input.Price + '\n');
	
		console.log('Quantity: ' + input.Stock);

		var queryStr = 'INSERT INTO Products SET=?';

		connection.query(queryStr, input, function(error, results, fields) {
			if (err) throw err;

			console.log('New Product Details: ');
	
			console.log('Product ID: ' + results.insertID + '\n');
	
			console.log('Product Name: ' + results.insertProduct + '\n');
	
			console.log('Price: ' + results.insertPrice + '\n');
	
			console.log('Quantity: ' + results.insertStock + '\n');
		}); // End connection.query(queryStr, input, function(error, results, fields))
	}); // End .then(function(input))
}; // End function createNewProduct()

// The final function that is required to run this entier program
function runBamazon() {

	managerPrompt();

}; // End function runBamazon()

runBamazon();