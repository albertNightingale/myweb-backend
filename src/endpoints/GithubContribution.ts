import { Express } from "express";

import getGitContribution from "../data/gitcontributions";

export default async (app: Express) => {
  app.get("/githubContribution", async (req: any, res: any) => {
    try {
      const data = await getGitContribution();
      res.status(200).send(data);
    }
    catch (err: any) {
      console.log(`Error getting contributions: ${err}`)
      const errorCode = Number.parseInt(err.message.substring(0, err.message.indexOf(": ")));
      if ((errorCode === Number.NaN)) {
        res.status(500).send(`Error getting contributions: ${err}`);
      }
      else {
        res.status(errorCode).send(`Error getting contributions: ${err}`);
      }
    }
  });
}