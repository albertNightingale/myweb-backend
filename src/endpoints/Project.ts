import { Express } from "express";
import { readGDocsHTML } from "../gcapi";
import scrapeGDocs from "../scraper/googledocs";
import storage from "../data";

export default async (app: Express) => {
  app.get("/projects", async (req, res) => {

    try {
      let result = storage["projects"];
      if (!result) {
        console.log("cannot find projects in storage, fetching from google docs");
        const gdocsHTML = await readGDocsHTML("projects");
        const projects = scrapeGDocs(gdocsHTML);
        storage["projects"] = projects;
        result = projects;
      }

      if (result) {
        res.status(200).send(result);
      }
      else {
        res.status(400).send("issue with google docs api");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("issue with google docs api" + error);
    }
  });
}
