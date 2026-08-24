import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

const KEY_FILE = path.resolve(process.cwd(), 'gdrive-service-account.json');
const DEFAULT_FOLDER_ID = '153spsAH5aAa4DJFdPFBSidJMug9t48T2';

async function getDriveClient() {
  if (!fs.existsSync(KEY_FILE)) {
    throw new Error(`Service account key file missing at ${KEY_FILE}`);
  }
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  return google.drive({ version: 'v3', auth });
}

export async function uploadFileToDrive(filePath, folderId = DEFAULT_FOLDER_ID) {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }

  const drive = await getDriveClient();
  const fileName = path.basename(absPath);

  console.log(`Uploading ${fileName} to Google Drive folder: ${folderId}...`);

  const fileMetadata = {
    name: fileName,
    parents: folderId ? [folderId] : [],
  };

  const media = {
    body: fs.createReadStream(absPath),
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: 'id, name, webViewLink, webContentLink',
    supportsAllDrives: true,
  });

  const fileId = response.data.id;

  // Make file publicly readable
  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    },
    supportsAllDrives: true,
  });

  const directUrl = `https://lh3.googleusercontent.com/d/${fileId}`;
  console.log(`Successfully uploaded! File ID: ${fileId}`);
  console.log(`Direct Image URL: ${directUrl}`);
  return { fileId, directUrl, fileName };
}

// CLI usage: node scripts/upload-to-gdrive.mjs <file-path> [folder-id]
if (process.argv[1] && process.argv[1].includes('upload-to-gdrive.mjs')) {
  const fileArg = process.argv[2];
  const folderArg = process.argv[3] || DEFAULT_FOLDER_ID;
  if (!fileArg) {
    console.log('Usage: node scripts/upload-to-gdrive.mjs <file-path> [folder-id]');
    process.exit(1);
  }
  uploadFileToDrive(fileArg, folderArg)
    .then((res) => {
      console.log('RESULT:', JSON.stringify(res, null, 2));
    })
    .catch((err) => {
      console.error('Upload Error:', err);
      process.exit(1);
    });
}
