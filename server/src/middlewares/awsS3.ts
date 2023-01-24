import { S3 } from "aws-sdk";

const aws = require('aws-sdk')
const s3 = new aws.S3()

export async function deleteFromS3(
  params: S3.DeleteObjectRequest
): Promise<any> {
  console.info("---- DELETE FROM S3", JSON.stringify(params, null, 2));
  try {
    return await s3.deleteObject(params).promise();
  } catch (error) {
    console.log(error);
  }
}

