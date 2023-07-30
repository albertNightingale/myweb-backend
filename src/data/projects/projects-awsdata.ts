import getData from "../../aws/S3";

export default async () => {
  const key = "projects";
  return getData(key);
};