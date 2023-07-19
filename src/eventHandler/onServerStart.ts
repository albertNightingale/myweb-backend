import { authorize } from "../gcapi/auth";

import scrapeGithub from "../scraper/github";
import scrapeGDocs from "../scraper/googledocs";

import { replaceFile, readGDocsHTML } from "../gcapi";

import storage from "../data";

export default async () => {
  console.log("*** Server listening on port 4000");
  authorize(); // authorize google drive api

  // call all event handlers once at the start
  await handleGoogleDocs();
  await handleGithub();
  console.log("*** server started");

  // call scrapeGithub every hour to upload data to google drive
  setInterval(handleGithub, 1000 * 60 * 60 * 24 * 7); // update every 7 days
  // call google api to download data from google drive to local memory
  setInterval(handleGoogleDocs, 1000 * 60 * 60); // update every hour
}

async function handleGithub() {
  try {
    const data = await scrapeGithub("albertNightingale");
    storage["github-contribution"] = data;
    // write data into file and name it output
    replaceFile("portfolio", "github-contribution", JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

async function handleGoogleDocs() {
  try {
    const gdocsHTML = await readGDocsHTML("projects");
    const projects = scrapeGDocs(gdocsHTML);
    storage["projects"] = projects;
  } catch (error) {
    console.log(error);
  }
}