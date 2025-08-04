const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'todouser', // TODO: Change to your database username
  password: 'password', // TODO: Change to your database password
  database: 'tododb'
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
