import awsData from "./gitcontributions-awsdata";
import devData from "./gitcontributions-devdata";
import { Environment } from "../../../types";

export default async () => {
  if (process.env.environment === Environment.development) {
    return devData;
  }
  else {
    return await awsData();
  }
}