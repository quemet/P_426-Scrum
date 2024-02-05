const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "db_cafe"
});

connection.connect((error) => {
    if(error) {
        console.error("Error connecting to MySQL database");
    } else {
        console.log("Connected to MySQL database");
    }
});

connection.end();