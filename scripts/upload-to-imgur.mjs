import fs from 'fs';
import path from 'path';

export async function uploadToImgur(filePath) {
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    throw new Error(`File not found: ${absPath}`);
  }

  const fileData = fs.readFileSync(absPath);
  const base64Image = fileData.toString('base64');

  const formData = new URLSearchParams();
  formData.append('image', base64Image);
  formData.append('type', 'base64');

  const response = await fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: 'Client-ID 546c25a59c58ad7',
    },
    body: formData,
  });

  const json = await response.json();
  if (!json.success) {
    throw new Error(json.data?.error || 'Imgur upload failed');
  }

  console.log(`[Imgur Upload Success] ${path.basename(absPath)} -> ${json.data.link}`);
  return json.data.link;
}

// CLI runner
if (process.argv[1] && process.argv[1].includes('upload-to-imgur.mjs')) {
  const target = process.argv[2];
  if (!target) {
    console.log('Usage: node scripts/upload-to-imgur.mjs <file-path>');
    process.exit(1);
  }

  uploadToImgur(target)
    .then((url) => console.log('SUCCESS_URL:', url))
    .catch((err) => {
      console.error('Upload Error:', err.message);
      process.exit(1);
    });
}
