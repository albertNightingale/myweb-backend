import {
  load,
} from "cheerio";

import {
  scrapeContentList, scrapeHeader
} from "./scrape";
import { Project } from "../../types";

export default (content: string): Array<Project> => {
  const $ = load(content);

  const headers = scrapeHeader($);
  const projectList = scrapeContentList<Project>($);

  if (headers.length === projectList.length) {
    return projectList;
  }
  else {
    throw new Error("Headers and components size do not match, please check the google docs!!");
  }
}
