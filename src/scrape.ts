
import {
  load,
} from "cheerio";
import _ from "lodash";
import { getProfilePage, getProfileForSpecificYear } from "./api";

const COLOR_MAP = {
  0: "#ebedf0",
  1: "#9be9a8",
  2: "#40c463",
  3: "#30a14e",
  4: "#216e39"
};

interface YearType {
  href: string;
  year: string;
}

interface ContributionType {
  year: string;
  total: number;
  range: {
    start: string;
    end: string;
  };
  contributions: any;
}

/**
 * 
 * @param username 
 * @returns Promise<Array<{
 *  href: string; the url of that year
 *  year: string; the year numnber
 * }>>
 */
async function scrapeYears(username: string): Promise<Array<YearType>> {
  // scrape the user profile page 
  const data = await getProfilePage(username);
  const $ = load(data);
  return $(".js-year-link")
    .get()
    .map((a) => {
      const $a = $(a);
      return {
        href: $a.attr("href"),
        year: $a.text().trim()
      };
    });
}


/**
 * 
 * @param url year.href
 * @param year year.text
 * @param format "nested" | "flat"
 * @returns 
 */
async function scrapeDataForYear(url: string, year: string, format: string): Promise<ContributionType> {
  // scrape the github following the url
  const data = await getProfileForSpecificYear(url);
  const $ = load(data);
  const $days = $("svg.js-calendar-graph-svg rect.ContributionCalendar-day");
  const contribText = $(".js-yearly-contributions h2")
    .text()
    .trim()
    .match(/^([0-9,]+)\s/);
  let contribCount: number;
  if (contribText) {
    contribCount = parseInt(contribText[0].replace(/,/g, ""), 10);
  }

  return {
    year,
    total: contribCount || 0,
    range: {
      start: $($days.get(0)).attr("data-date"),
      end: $($days.get($days.length - 1)).attr("data-date")
    },
    contributions: (() => {
      const parseDay = (day: cheerio.Cheerio) => {
        const $day = $(day);
        const date = $day
          .attr("data-date")
          .split("-")
          .map((d) => parseInt(d, 10));
        const color = COLOR_MAP[$day.attr("data-level")];
        const value = {
          date: $day.attr("data-date"),
          count: parseInt($day.text().split(" ")[0], 10) || 0,
          color,
          intensity: $day.attr("data-level") || 0
        };
        return { date, value };
      };

      if (format !== "nested") {
        return $days.get().map((day) => parseDay(day).value);
      }

      return $days.get().reduce((o, day) => {
        const { date, value } = parseDay(day);
        const [y, m, d] = date;
        if (!o[y]) o[y] = {};
        if (!o[y][m]) o[y][m] = {};
        o[y][m][d] = value;
        return o;
      }, {});
    })()
  };
}

export async function scrapeDataForSpecificYear(username: string, year: string, format: string) {
  const yearObjs = await scrapeYears(username);
  const yearObj = yearObjs.find((y) => y.year === year);
  if (!yearObj) {
    throw new Error(`Year ${year} not found`);
  }
  const yearData = await scrapeDataForYear(yearObj.href, yearObj.year, format);

  return {
    years: getYears([yearData], format),
    contributions: getContribution([yearData], format)
  };
}

function getYears(yearDatas: ContributionType[], format: string) {
  const obj = {};
  const arr = yearDatas.map((year) => {
    const { contributions, ...rest } = year;
    _.setWith(obj, [rest.year], rest, Object);
    return rest;
  });
  return format === "nested" ? obj : arr;
}

function getContribution(yearDatas: ContributionType[], format: string) {
  if (format === "nested") {
    return yearDatas.reduce((acc, curr) => _.merge(acc, curr.contributions))
  }

  return yearDatas
    .reduce((list, curr) => [...list, ...curr.contributions], [])
    .sort((a, b) => {
      if (a.date < b.date) return 1;
      else if (a.date > b.date) return -1;
      return 0;
    });
}

/**
 * 
 * @param username 
 * @param format nested | flat
 * @returns 
 */
export async function scrapeDataForAllYears(username: string, format: string) {
  const yearObjs = await scrapeYears(username);
  const yearDatas = await Promise.all(yearObjs.map((yearObj: YearType) => scrapeDataForYear(yearObj.href, yearObj.year, format)));

  return {
    years: getYears(yearDatas, format),
    contributions: getContribution(yearDatas, format)
  };
}