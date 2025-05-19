import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import credentials from "./credentials.js";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = credentials.bearerToken;
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {

  // GET is like Read in CRUD operations. 

  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.

  // so POST creates a new entry in the secrets api and then returns the created data to confirm its creation.
  // this is basically the Create part of CRUD operations from my database class.

  try {
    // send POST request to /secrets with the req body data and our credentials in config
    const result = await axios.post(API_URL + "/secrets", req.body, config);

    res.render("index.ejs", { content: JSON.stringify(result.data) });

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }

});

app.post("/put-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.

  // so PUT updates a given entry's data, returns it to confirm.
  // but it has to be ALL of the data, not just what you want to change. That's what PATCH does.
  // so PUT is like Update in CRUD operations.

  try {
    const result = await axios.put(API_URL + "/secrets/" + searchId, req.body, config);

    res.render("index.ejs", { content: JSON.stringify(result.data) });

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }


});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.

  // PATCH is like PUT but you only enter the info you want changed, rather than all of it.
  // so PATCH is ALSO like Update in CRUD operations.

  try {
    const result = await axios.patch(API_URL + "/secrets/" + searchId, req.body, config);

    res.render("index.ejs", { content: JSON.stringify(result.data) });

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }

});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.

  // DELETE is exactly what it sounds like. Give it the ID to delete.
  // this is the Delete part of CRUD operations. Obviously.

  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });

  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }

});

app.listen(port, () => {
  // console.log(`Your token is: ${yourBearerToken}`);
  console.log(`Server is running on port ${port}`);
});
