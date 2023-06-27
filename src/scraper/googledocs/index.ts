import {
  load,
} from "cheerio";

import {
  scrapeContentList, scrapeHeader
} from "./scrape";

export default (content: string) => {
  const $ = load(content);

  const headers = scrapeHeader($);
  const components = scrapeContentList<any>($);

  const map = new Map<string, any>();
  if (headers.length === components.length) {
    headers.forEach((el, index) => map.set(el, components[index]));
  }
  return map;
}