import awsData from "./projects-awsdata";
import devData from "./projects-devdata";

import { isDev } from "../../";

export default async () => {
  if (isDev) {
    return JSON.stringify(devData);
  }
  else {
    return await awsData();
  }
}