import * as express from "express";

import GithubContribution from "./endpoints/GithubContribution";
import Project from "./endpoints/Project";
import PastExperiences from "./endpoints/PastExperiences";

import * as cors from "cors";
import * as morgan from "morgan";

export let isDev = false;

export default function appConfiguration(isDevelopment: boolean) {
  // set isDev
  isDev = isDevelopment;

  const app = express();

  // insert middleware 
  app.use(cors());
  app.use(morgan('\n[:date] :method :url', { immediate: true }));
  app.use(morgan('[:date] [total-time: :total-time ms] status_code: :status\n'));

  // add endpoints
  GithubContribution(app);
  Project(app);
  PastExperiences(app);

  return app;
}