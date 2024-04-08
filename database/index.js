// Get the client
const mysql = require('mysql')

// Create the connection to database
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_management'
});

conn.connect((err) => {
  if(err) console.log("Error in connection.")
  else console.log("Connected!")
})

module.exports = conn