import * as serverless from "serverless-http";
import appConfiguration from "./src/";

export const handler = serverless(appConfiguration(false));