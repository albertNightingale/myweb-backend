import { authorize } from "../gcapi/auth";

import fs from "fs";

import scrapeGithub from "../scraper/github";
import { replaceFile } from "../gcapi";

export default () => {
  console.log("Server listening on port 4000");
  authorize(); // authorize google drive api

  // call all event handlers once at the start
  handleGoogleDocs();
  handleGithub();

  // call scrapeGithub every hour to upload data to google drive
  setInterval(handleGithub, 3600 * 1000 * 1); // update every hour
  // call google api to download data from google drive to local memory
  setInterval(handleGoogleDocs, 1000 * 60); // update every minute
}

async function handleGithub() {
  try {
    const data = await scrapeGithub("albertNightingale");
    // write data into file and name it output
    await fs.promises.writeFile("./output.txt", JSON.stringify(data));
    replaceFile("portfolio", "github-contribution", "./output.txt");
  } catch (error) {
    console.log(error);
  }
}

async function handleGoogleDocs() {
  try {

  } catch (error) {
    console.log(error);
  }
}