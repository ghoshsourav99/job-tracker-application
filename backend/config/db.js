const mysql = require('mysql2');

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YourNewPassword123",
  database: "job_tracker"
});

// connected to database
db.connect((err) => {
    if(err){
        console.error("Database connection failed", err);
    } else {
        console.log("MySql connected successfully");
    }
});

module.exports = db;