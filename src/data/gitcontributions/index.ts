import awsData from "./gitcontributions-awsdata";
import devData from "./gitcontributions-devdata";

import { isDev } from "../../";

export default async () => {
  if (isDev) {
    return JSON.stringify(devData);
  }
  else {
    return await awsData();
  }
}