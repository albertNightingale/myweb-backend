import { Express } from "express";

import getData from "../data/gitcontributions";

export default async (app: Express) => {
  app.get("/githubContribution", async (req: any, res: any) => {
    try {
      const data = await getData();
      res.send(data);
    }
    catch (err: any) {
      console.log(`Error getting projects: ${err}`)
      const errorCode = Number.parseInt(err.message.substring(0, err.message.indexOf(": ")));
      if ((errorCode === Number.NaN)) {
        res.status(500).send(`Error getting projects: ${err}`);
      }
      else {
        res.status(errorCode).send(`Error getting projects: ${err}`);
      }
    }
  });
}