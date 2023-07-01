import express, { Express } from "express";
import fs from "fs";
import { replaceFile } from "./gcapi";

import scrapeGithub from "./scraper/github";

import GithubContribution from "./endpoints/GithubContribution";
import Project from "./endpoints/Project";

import cors from "cors";
import { authorize } from "./gcapi/auth";

const app = express();
app.use(cors());
authorize();

GithubContribution(app);
Project(app);

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

setInterval(async () => {

  try {
    const data = await scrapeGithub("albertNightingale");
    // write data into file and name it output
    await fs.promises.writeFile("./output.txt", JSON.stringify(data));
    replaceFile("portfolio", "github-contribution", "./output.txt");
  } catch (error) {
    console.log(error);
  }

}, 3600 * 1000 * 1);
