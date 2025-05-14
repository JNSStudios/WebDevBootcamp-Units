import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  console.log(req);
  res.send("<h1>Hey</h1>\n<p>Whats up</p>");
});

app.get("/contact", (req, res) => {
  console.log(req);
  res.send("<h1>Contact</h1>\n<p>Reach me on BlueSky idk</p>");
});

app.get("/about", (req, res) => {
  console.log(req);
  res.send("<h1>About me</h1>\n<p>I had surgery recently.</p><p>That is the only interesting thing about me.</p>");
});



app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

