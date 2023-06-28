import { Express } from "express";
import { readGDocsHTML } from "../gcapi";
import scrapeGDocs from "../scraper/googledocs";

export default async (app: Express) => {
  app.get("/projects", async (req, res) => {
    const gdocsHTML = await readGDocsHTML("projects");

    if (gdocsHTML) {
      const projects = scrapeGDocs(gdocsHTML);
      res.status(200).send(projects);
    }
    else {
      res.status(400).send("No data found");
    }
  });
}
