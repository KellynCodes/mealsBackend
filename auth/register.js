const express = require("express");
const mysql = require("mysql");
const PORT = process.env.PORT || 5000;
const app = express();
const db = require("../db-config");
const bcrypt = require("bcryptjs");

const Register = () => {
  app.post("/register", (req, res) => {
    const { username, country, phone, email, password } = req.body;

    db.query(
      "SELECT * FROM users WHERE username = ? || email = ?",
      [username, email],
      async (err, result) => {
        if (err) throw err;
        if (result[0]) {
          console.log("Email or Username already exist");
        } else {
          const hashedPassword = await bcrypt.hash(password, 8);
          db.query(
            "INSERT INTO users (username, country, phone, email, password) VALUES(?,?,?,?,?)",
            [username, country, phone, email, hashedPassword],
            (error, results) => {
              if (error) throw error;
              console.log("Registered");
            }
          );
        }
      }
    );
  });
};

module.exports = Register;

// const cookieParser = require("cookie-parser");
// const express = require("express");
// const mysql = require("mysql");
// const PORT = process.env.PORT || 5000;
// const cors = require("cors");
// const app = express();
// const db = require("./db-config");
// const bcrypt = require("bcryptjs");

// app.use(cookieParser());
app.use(cors());
app.use(express.json());

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("db connected");
});

app.post("/register", (req, res) => {
  const { username, country, phone, email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ? || email = ?",
    [username, email],
    async (err, result) => {
      if (err) throw err;
      if (result[0]) {
        console.log("Email or Username already exist");
      } else {
        const hashedPassword = await bcrypt.hash(password, 8);
        db.query(
          "INSERT INTO users (username, country, phone, email, password) VALUES(?,?,?,?,?)",
          [username, country, phone, email, hashedPassword],
          (error, results) => {
            if (error) throw error;
            console.log("Registered");
          }
        );
      }
    }
  );
});

app.listen(PORT);
