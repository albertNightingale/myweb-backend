import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";

import { isDev } from "..";

function getClient(): S3Client {
  const region = "us-east-1";
  try {
    if (isDev) {
      return new S3Client({
        region: region,
        credentials: fromIni({ profile: "default" }),
      });
    } else {
      return new S3Client({
        region: region,
      });
    }
  }
  catch (err) {
    throw new Error(`Error getting client: ${err}`);
  }
}

export default async (key: string) => {
  const client = getClient();
  const bucketName = "portfolio-bucket-albert";

  try {
    const body = await getData(client, bucketName, key);

    if (!body) {
      throw new Error(`404: No body in response from S3 for ${key} in bucket ${bucketName}`);
    }

    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
    const str = await body.transformToString();
    console.log(str);
    return str;
  } catch (err) {
    throw new Error(`500: Error getting object from S3 for ${key} in bucket ${bucketName}: ${err}`);
  }
};

async function getData(client: S3Client, bucketName: string, key: string) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });
  const response = await client.send(command);

  return response.Body;
}