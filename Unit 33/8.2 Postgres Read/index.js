import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import credentials from "./credentials.js";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: credentials.username,
  host: "localhost",
  database: "world",
  password: credentials.password,
  port: credentials.port,
});

// console.log(db);

db.connect();

let quiz = [];

db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("ERR: \" SELECT * FROM flags\" query failed.", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});


let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  // console.log(`currentQuestion: ${currentQuestion} id: ${currentQuestion.id}, name: ${currentQuestion.name}, capital: ${currentQuestion.capital}`);
  if (currentQuestion.name.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
