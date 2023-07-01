import { Express } from "express";
import { readGDocsHTML } from "../gcapi";
import scrapeGDocs from "../scraper/googledocs";

export default async (app: Express) => {
  app.get("/projects", async (req, res) => {

    const gdocsHTML = await readGDocsHTML("projects");
    if (gdocsHTML) {
      try {
        const projects = scrapeGDocs(gdocsHTML);
        res.status(200).send(projects);
      }
      catch (error) {
        res.status(403).send(error);
      }
    }
    else {
      res.status(400).send("issue with google docs api");
    }
  });
}
