import {
  scrapeDataForAllYears
} from "./scrape";
import fs from "fs";

export default async (username: string) => {
  const format = "flat";
  const data = await scrapeDataForAllYears(username, format);

  return data;
}
