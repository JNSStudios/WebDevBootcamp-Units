import express from "express";
import bodyParser from "body-parser";
import credentials from "./credentials.js";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: credentials.user,
  host: credentials.host,
  database: credentials.database,
  password: credentials.password,
  port: credentials.port,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {

  console.log(req.body.username);
  console.log(req.body.password);

  // check if user already exists
  try {
    const userExistsQuery = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [req.body.username]
    );

    if (userExistsQuery.rows.length > 0) {
      console.log("User already exists");
      return res.status(400).send("User already exists");
    }

    // try to add user to database
    try {
      const addUserQuery = await db.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [req.body.username, req.body.password]
      );
      console.log(addUserQuery);
      res.render("secrets.ejs");

    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).send("Internal Server Error");
    }
  } catch (error) {
    console.error("Error checking for user existence:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {

  console.log(req.body.username);
  console.log(req.body.password);

  // try to find user in database to compare info

  try {
    const userExistenceQuery = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [req.body.username, req.body.password]
    );
    console.log(userExistenceQuery.rows);
    if (userExistenceQuery.rows.length > 0) {
      console.log("User exists");
      res.render("secrets.ejs");
    } else {
      console.log("User does not exist");
      res.status(401).send("Incorrect credentials");
    }

  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).send("Internal Server Error");
  }



});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
