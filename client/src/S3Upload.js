import { uploadFile } from "react-s3";
import S3 from "react-aws-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: "photos",
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS,
  secretAccessKey: process.env.REACT_APP_SECRET,
};

export const ReactS3Client = new S3(config);
