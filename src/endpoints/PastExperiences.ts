import { Express } from "express";

import getPastExperiences from "../data/pastexperiences";

export default async (app: Express) => {
  app.get("/pastExperiences", async (req: any, res: any) => {
    try {
      const data = await getPastExperiences();
      res.status(200).send(data);
    }
    catch (err: any) {
      console.log(`Error getting past experiences: ${err}`)
      const errorCode = Number.parseInt(err.message.substring(0, err.message.indexOf(": ")));
      if ((errorCode === Number.NaN)) {
        res.status(500).send(`Error getting past experiences: ${err}`);
      }
      else {
        res.status(errorCode).send(`Error getting past experiences: ${err}`);
      }
    }
  });
}