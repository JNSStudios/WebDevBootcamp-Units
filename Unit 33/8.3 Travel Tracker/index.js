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

async function getVisitedCountries() {
  const result = await db.query("SELECT country_code FROM visited_countries");

  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });

  console.log(result.rows);
  return countries; 

}



app.get("/", async (req, res) => {
  const countries = await getVisitedCountries();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

// handle adding new countries via form submission
app.post("/add", async (req, res) => {
  const country = req.body.country;

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'",
      [country]
    );
    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
      const countries = await getVisitedCountries();
      res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added, try again.",
      });
    }

  } catch (error) {
    console.log(error);
    const countries = await getVisitedCountries();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }




});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
