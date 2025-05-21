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

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  console.log(result.rows);

  res.render("index.ejs", { countries: countries, total: countries.length });
});

// handle adding new countries via form submission
app.post("/add", async (req, res) => {
  const country = req.body.country;
  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [country]
  );

  if (result.rows.length !== 0) {
    const data = result.rows[0];
    const countryCode = data.country_code;

    await db.query(
      "INSERT INTO visited_countries (country_code) VALUES ($1)",
      [countryCode]
    );
  }

  console.log(result);
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
