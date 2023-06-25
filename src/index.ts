import express from "express";

const app = express();

app.get("/githubcontribution", (req, res) => {

});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});