import awsData from "./pastexperiences-awsdata";
import devData from "./pastexperiences-devdata";

import { isDev } from "../..";

export default async () => {
  if (isDev) {
    return JSON.stringify(devData);
  }
  else {
    return await awsData();
  }
}