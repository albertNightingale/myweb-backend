import getData from "../../aws/S3";

export default async () => {
  const key = "github-contribution";
  return getData(key);
};