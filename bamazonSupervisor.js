// Bamazon - Supervisor
// =================================================================================================

// npm install mysql or npm install mysqljs/mysql
var mysql = require('mysql');

// npm install inquirer
var inquirer = require('inquirer');

// npm install cli-table
var Table = require('cli-table');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'password',
	database: 'Bamazon-DeptDB'
}); // End var connection = mysql.createConnection({})

connection.connect(function(err) {

	if (err) throw err;

	console.log("connected as id " + connection.threadId);

	supervisorPrompt();

}); // End connection.connect(function(err) {})

function supervisorPrompt() {

	inquirer.prompt([

		{

			name: 'choice',

			type: 'list',

			message: 'What would you like to do?',

			choices: ['View Product Sales by Department', 'Add a Department', 'End']

		}

		]).then(function(user) {

			if (user.choice === 'View Product Sales by Department') {

				productSales();

			} else if (user.choice === 'Add a Department') {

				addDepartment();

			} else if (user.choice === 'End') {

				connection.end();

			} // End if else statement

		}); // .then(function(user))

}; // End function supervisorPrompt()

function productSales() {

	var table = new Table({

		head: ['ID', 'Dept', 'Cost', 'Total Sales', 'Total Profit']

	}); // End var table = new Table

	connection.query('SELECT * FROM Depts', function(err, results) {

		if (err) throw err;

		for (var i = 0; i < results.length; i++) {

			var id = res[i].ID;

			var dept = res[i].Depts

			var cost = res[i].Cost;
				cost = Cost.toFixed(2);

			var sales = res[i].Sales;
				sales = Sales.toFixed(2);

			var profit = Sales - Cost;
				profit = Profit.toFixed(2);

			table.push([id, dept, '$' + cost + sales, '$' + profit]);

		} // End for loop

		console.log(table.toString());

		supervisorPrompt();

	}); // End connection.query()

}; // End function productSales()

function addDepartment() {
	inquirer.prompt([
		{
			name: 'name',
			type: 'text',
			message: 'Department Name?'
		},
		{
			name: 'Cost',
			type: 'text',
			message: 'Overhead for new Department?',
			validate: function(string) {
				if (isNaN(parseInt(str))) {
					console.log('Error!');
					return false;
				} else {
					return true;
				} // End if else statement
			} // End validate: function(string)
		} // End prompts
	]).then(function(user) {
		var OverHead = parseInt(user.Cost);
		var department = {
			Depts: user.name,
			OverHead: OverHead,
			Sales: 0
		} // var department

		connection.query('INSERT INTO Depts SET=?', department, function(err) {
			if (err) throw err;
			console.log(department.Depts + ' has been successfully added to the department table. ');
		
			supervisorPrompt();
		}); // End connection.query() 
	}); // End .then(function(user) {}) 
}; // End function addDepartment() {}