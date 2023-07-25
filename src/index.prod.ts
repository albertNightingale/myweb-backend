import * as serverless from "serverless-http";
import app from "./";

export const handler = serverless(app);