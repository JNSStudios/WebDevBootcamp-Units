import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;
var name = "";

app.use(bodyParser.urlencoded({ extended: true }));

function infoGetter(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  name = req.body["street"] + req.body["pet"];
  next();
}

app.use(infoGetter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send(`<h1>Your band name is</h1><h2>${name}</h2><p>...maybe don't quit your day job.</p>`);

});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
