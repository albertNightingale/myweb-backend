import getData from "../../aws/S3";

export default async () => {
  const bucket = "portfolio-bucket";
  const key = "projects-s3.txt";
  return getData(bucket, key);
};