import awsData from "./projects-awsdata";
import devData from "./projects-devdata";
import { Environment } from "../../../types";

export default async () => {
  if (process.env.environment === Environment.development) {
    return devData;
  }
  else {
    return await awsData();
  }
}