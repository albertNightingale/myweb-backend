import express, { Express } from "express";
import fs from "fs";
import { replaceFile } from "./gcapi";

import scrapeGithub from "./scraper/github";

import GithubContribution from "./endpoints/GithubContribution";
import Project from "./endpoints/Project";

import cors from "cors";

const app = express();

GithubContribution(app);
Project(app);

app.use(cors());

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

setInterval(async () => {
  const data = await scrapeGithub("albertNightingale");
  // write data into file and name it output
  await fs.promises.writeFile("./output.txt", JSON.stringify(data));
  replaceFile("portfolio", "github-contribution", "./output.txt");
}, 3600 * 1000 * 1);
