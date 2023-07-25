import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default async (bucketName: string, key: string) => {
  try {
    const body = await getData(bucketName, key);

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

async function getData(bucketName: string, key: string) {
  const client = new S3Client({})
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  });
  const response = await client.send(command);

  return response.Body;
}