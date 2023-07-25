require('dotenv').config();

import * as express from "express";
import * as process from "process";

import GithubContribution from "./endpoints/GithubContribution";
import Project from "./endpoints/Project";

import onServerStart from "./eventHandler/onServerStart";

import * as cors from "cors";
import * as morgan from "morgan";
import { Environment } from "../types";

console.log("process.env.environment", process.env.environment);
const app = express();

// insert middleware 
app.use(cors());
app.use(morgan('\n[:date] :method :url', { immediate: true }));
app.use(morgan('[:date] [total-time: :total-time ms] status_code :status\n'));

// add endpoints
app.get("/githubContribution", GithubContribution);
app.get("/projects", Project);

if (process.env.environment === Environment.development) {
  app.listen(4000, onServerStart);
}

export default app;