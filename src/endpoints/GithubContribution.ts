import { Express } from "express";

import { readBlobContent } from "../gcapi";

export default async (app: Express) => {
  app.get("/githubcontribution", async (req, res) => {

    const result = await readBlobContent("output.txt");
    if (result) {
      res.status(200).send(result);
    }
    else {
      res.status(400).send("issue with google docs api");
    }
  });
}