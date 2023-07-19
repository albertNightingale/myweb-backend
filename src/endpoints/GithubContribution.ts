import { Express } from "express";

import { readBlobContent } from "../gcapi";

import storage from "../data";

export default async (app: Express) => {
  app.get("/githubContribution", async (req, res) => {
    try {
      let result = storage["github-contribution"];
      if (!result) {
        console.log("cannot find github contribution in storage, fetching from google drive");
        const result = await readBlobContent("github-contribution");
        storage["github-contribution"] = result;
      }

      if (result) {
        res.status(200).send(result);
      }
      else {
        res.status(400).send("issue with github");
      }
    } catch (error) {
      console.log(error);
      res.status(400).send("issue with github" + error);
    }
  });
}