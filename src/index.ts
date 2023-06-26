import express from "express";
import scraper from "./scraper";
import { downloadFiles } from "./gcapi";

const app = express();

app.get("/githubcontribution", async (req, res) => {
  const result = await downloadFiles("output.txt");
  res.status(200).send(result);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

setInterval(async () => {
  await scraper();
}, 3600 * 1000 * 1);