import { authorize } from "./auth";
import { uploadFile } from "./uploadfile";
import { findFile, findFolder } from "./findfiles";
import { deleteFile } from "./deletefile";

export async function replaceFile(folderPath: string, uploadFileName: string, localFilepath: string) {
  const authClient = await authorize();

  // check if the file exists
  const folder = await findFolder(authClient, folderPath);
  if (!folder) {
    console.log(`Folder ${folderPath} not found.`);
    return;
  }
  else {
    console.log(`Folder ${folderPath} found.`);
  }
  const file = await findFile(authClient, uploadFileName);

  if (file) {
    console.log(`File ${uploadFileName} found.`);
    // delete the file
    const deletionSucceed = await deleteFile(authClient, file.id);
    if (!deletionSucceed) {
      console.log(`Failed to delete file ${uploadFileName}.`);
      return;
    }
    else {
      console.log(`File ${uploadFileName} deleted.`);
    }
  }
  else {
    console.log(`File ${uploadFileName} not found.`);
  }

  // upload the file
  console.log(`Uploading ${localFilepath} to ${folderPath}...`);
  await uploadFile(authClient, folderPath, uploadFileName, localFilepath);
}