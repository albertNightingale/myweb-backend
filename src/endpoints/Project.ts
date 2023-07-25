import { Express } from "express";
import getProjects from "../data/projects";

export default async (req: any, res: any) => {
  try {
    const projects = await getProjects();
    res.status(200).send(projects);
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
};