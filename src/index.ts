import express, { Express } from "express";

import GithubContribution from "./endpoints/GithubContribution";
import Project from "./endpoints/Project";

import cors from "cors";
import onServerStart from "./eventHandler/onServerStart";

const app = express();
// insert middleware 
app.use(cors());
// add endpoints
GithubContribution(app);
Project(app);
// start server
app.listen(4000, onServerStart);
