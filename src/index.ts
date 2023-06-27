import express from "express";
import fs from "fs";
import { readBlobContent, readGDocsHTML, replaceFile } from "./gcapi";

import scrapeGithub from "./scraper/github";
import scrapeGDocs from "./scraper/googledocs";

const app = express();

app.get("/githubcontribution", async (req, res) => {
  const result = await readBlobContent("output.txt");
  res.status(200).send(result);
});

app.get("/project", async (req, res) => {
  const gdocsHTML = await readGDocsHTML("projects");

  if (gdocsHTML) {
    scrapeGDocs(gdocsHTML);
    res.status(200).send(gdocsHTML);
  }
  else {
    res.status(400).send("No data found");
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

setInterval(async () => {
  const data = await scrapeGithub("albertNightingale");
  // write data into file and name it output
  await fs.promises.writeFile("./output.txt", JSON.stringify(data));
  replaceFile("portfolio", "github-contribution", "./output.txt");
}, 3600 * 1000 * 1);
