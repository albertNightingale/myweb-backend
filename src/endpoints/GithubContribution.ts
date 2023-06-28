import { Express } from "express";

import { readBlobContent } from "../gcapi";

export default async (app: Express) => {
  app.get("/githubcontribution", async (req, res) => {
    const result = await readBlobContent("output.txt");
    res.status(200).send(result);
  });
}