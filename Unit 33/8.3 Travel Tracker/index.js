import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import credentials from "./credentials.js";

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

app.get("/", async (req, res) => {

  const result = await db.query("SELECT country_code FROM visited_countries");
  db.end();

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  console.log(result.rows);

  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
