import getData from "../../aws/S3";

export default async () => {
  const bucket = "portfolio-bucket";
  const key = "gitcontributions-s3.txt";
  return getData(bucket, key);
};