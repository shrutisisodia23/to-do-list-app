const mysql = require("mysql2");
const dotenv = require('dotenv')
dotenv.config();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "todo_app"
});

db.getConnection((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
  } else {
    console.log("MySQL connected");
  }
});

module.exports = db;