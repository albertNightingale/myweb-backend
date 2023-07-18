import { Express } from "express";

import { readBlobContent } from "../gcapi";

export default async (app: Express) => {
  app.get("/githubContribution", async (req, res) => {
    const result = await readBlobContent("github-contribution");
    if (result) {
      console.log("request for github contribution approved");
      res.status(200).send(result);
    }
    else {
      console.log("request for github contribution rejected");
      res.status(400).send("issue with github");
    }
  });
}