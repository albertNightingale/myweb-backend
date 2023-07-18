import { authorize } from "./auth";
import { uploadFile } from "./uploadfile";
import { findFile, findFolder } from "./findfiles";
import { deleteFile } from "./deletefile";
import { google } from "googleapis";

export async function replaceFile(folderPath: string, uploadFileName: string, localFilepath: string) {

  const authClient = await authorize();

  // check if the file exists
  const folder = await findFolder(authClient, folderPath);
  if (!folder) {
    throw `Folder ${folderPath} not found.`;
  }

  const file = await findFile(authClient, uploadFileName);

  if (!file) {
    throw `File ${uploadFileName} not found.`;
  }
  console.log(`File ${uploadFileName} found.`);
  // delete the file
  const deletionSucceed = await deleteFile(authClient, file.id);
  if (!deletionSucceed) {
    throw `File ${uploadFileName} deletion failed.`;
  }

  // upload the file
  console.log(`Uploading ${localFilepath} to ${folderPath} as ${uploadFileName}...`);
  await uploadFile(authClient, folderPath, uploadFileName, localFilepath);
}

export async function readBlobContent(uploadFileName: string) {
  try {
    const authClient = await authorize();
    const file = await findFile(authClient, uploadFileName);
    const drive = google.drive({ version: 'v3', auth: authClient });
    const res = await drive.files.get({
      fileId: file.id,
      alt: 'media',
    });

    const data = res.data;
    return data;
  }
  catch (error) {
    console.log("readBlobContent:", error);
    return null;
  }
}

export async function readGDocsHTML(uploadFileName: string): Promise<string> {
  try {
    const authClient = await authorize();
    const file = await findFile(authClient, uploadFileName);
    const drive = google.drive({ version: 'v3', auth: authClient });
    const res = await drive.files.export({
      fileId: file.id,
      mimeType: 'text/html',
    });

    const data = res.data;
    // console.log(data.toString());
    return data.toString();
  } catch (error) {
    console.log("readGDocsHTML:", error);
    return null;
  }
}
