import express, { Express } from "express";

import GithubContribution from "./endpoints/GithubContribution";
import Project from "./endpoints/Project";

import onServerStart from "./eventHandler/onServerStart";

import cors from "cors";
import morgan from "morgan";

const app = express();

// insert middleware 
app.use(cors());
app.use(morgan('\n[:date] :method :url', { immediate: true }));
app.use(morgan('[:date] [total-time: :total-time ms] status_code :status\n'));

// add endpoints
GithubContribution(app);
Project(app);
// start server
app.listen(4000, onServerStart);
