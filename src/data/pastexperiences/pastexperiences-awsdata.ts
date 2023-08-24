import getData from "../../aws/S3";

export default async () => {
  const key = "past-experiences";
  return getData(key);
};