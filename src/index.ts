import { replaceFile } from "./gcapi";
import {
  scrapeDataForAllYears
} from "./scrape";
import fs from "fs";

async function start() {
  const username = "albertNightingale";
  const format = "flat";
  const data = await scrapeDataForAllYears(username, format);

  // write data into file and name it output
  fs.promises.writeFile("./output.txt", JSON.stringify(data));

  replaceFile("portfolio", "github-contribution", "./output.txt");
}

start();