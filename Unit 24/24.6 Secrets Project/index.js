//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var authenticated = false;

app.use(express.urlencoded({ extended: true }));

function verifyPass(req, res, next) {
  if (req.body.password === "ILoveProgramming") {
    authenticated = true;
  } 
  next();
}

app.use(verifyPass);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", verifyPass, (req, res) => {
    console.log(req.body);
    if(authenticated) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});