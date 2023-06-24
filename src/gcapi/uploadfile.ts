import fs from 'fs';
import path from 'path'
import { google, Auth } from 'googleapis';
import { findFolder } from './findfiles';

export async function uploadFile(authClient: Auth.OAuth2Client, folderName: string, fileName: string, localFilepath: string) {
  const folder = await findFolder(authClient, folderName);
  if (!folder) {
    console.log(`Folder ${folderName} not found.`);
    return;
  }

  const requestBody = {
    name: fileName,
    parents: [folder.id],
  };

  const absolutePath = path.join(path.resolve("."), localFilepath);
  const media = {
    mimeType: 'text/plain',
    body: fs.createReadStream(absolutePath),
  };

  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.create({ requestBody, media });
  if (res.status !== 200) {
    console.log(`Failed to upload ${localFilepath} to ${folder.name}.`);
    return;
  }
}


