import fs from 'fs';
import path from 'path';

async function uploadToImgur(filePath) {
  const absPath = path.resolve(filePath);
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

  console.log('Imgur Upload Success!');
  console.log('Direct Image Link:', json.data.link);
  return json.data.link;
}

const file = process.argv[2] || 'public/images/somaj-seba-circular.svg';
uploadToImgur(file)
  .then((link) => console.log('SUCCESS_URL:', link))
  .catch((err) => console.error('ERROR:', err.message));
