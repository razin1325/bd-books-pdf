import fs from 'fs';
import path from 'path';

const destDir = 'D:\\HAND NOTE';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// All hand note images from the post & user sequence
const images = [
  {
    name: 'Page-01.jpg',
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXwjWoSU_YpPcnrksbnV-93SAj22As1d-B7TTKVFX8Gl8eAgOKtxtUfyUHtpoB9cz7-l0129DLp1Nx4KtVcNd3wacPnU1bAcEM5fWTnti7NoZqHVFXK1MVvPpV9Kq21gEEY8_0cK1cdMZAzuPZizbrAb_oPmdgCK-lC_Tk3VJNgULmBEX5QgTokOqFjwQ/s1600/01-dl-1dcd50543a35.jpg'
  },
  {
    name: 'Page-02.jpg',
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjlhFpY7YIaJ-ehEccraUDa-3UWVx-BPHD1xWrhx2r0iB-rKltLl_0DYGIGB1dgNCveuVhtgGgoq0TXRb2FMS7yUMjCQDOhDvu-pQF6GdfjnBIMhjVk-pmEKhkj1XswBzkXHmfpizDx_qZqsuI0nC4cH0dQCjiIPvuPFc6X7gROtZoaj7hvV6eWMVbzay8/s1600/02-dl-4e59ce7ba811.jpg'
  },
  {
    name: 'Page-03.jpg',
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi3n7UD7gRCG5K_QyMahxSGUddOFfNHc8b4sl17En_tshAdxTzCO6e4CgZclOZa9H2BsEJ9duGAOIgIBb-EbX3NfbesJjDGl4xoZ1QsO13WMkjUNGvfoO3Tq841kJg9RoZzrBTcNHbD6dp13vZLOZESnpvOYfXGXH0AR1IRgXCcD_BP3Bq35PNSLq9zFv8/s1600/03-dl-25456b42cfac.jpg'
  },
  {
    name: 'Page-04.jpg',
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhoIYxaMEYnI5nxn5yPuHaT1mnOOxB0TrUyqyDRYykCynZPX4Sln_6R6YPlWImuN7xq0Y1mKUg-f8Ia3ujA1CXRmOJ1N3kdcZgCuMPQ4nzR22hRibeISdi79EOKVQtlUdMjb4Jcrt2oKkseSzp4HqpKVtuCx3jQMlMIiW9_4v0XblBiYG8eiibYsreXzp0/s1600/04-dl-989ecc1f1a10.jpg'
  },
  {
    name: 'Page-05.jpg',
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjrb-e8KS7nbZOY7B8EKnuPzaxV9OYf0H-khXpd6oX-9FwNWvRvy06KQ3XTwghsIyVoymyNuFt0a_AU2V0MZ952xZzsjfl_IzxwYvBR1lWlSz1GMBFyDfgLQg3hEwyUTR4gof7HmlFGhBaN51g8iyWNWftkBd8J-xzQMgEZw0Uq6eTe6UE18KDmHGBlW1Q/s1600/05-dl-0243d579d12f.jpg'
  },
  {
    name: 'Page-06.jpg',
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjArMlWxMQnGujlk1BQHN2f6mvqqqYdt2HLcdBnARGdYjfAXmAbldPTZpr3Iehp7YewLXRmhTBgkv67nGcbYMKRazEZNDRKv9ZXsOm2FUGPoHjavSl4fcYoDC5KT_IbdcQdLzbkD8B7j4wC3JyeGlwguLGglwqk3HeZmn5kaAgugDfaiBQdG8OgKfM80ow/s2048/689004886_3158760854307020_6875494899157142946_n.jpg'
  },
  {
    name: 'FB-Post-Media-3158760564307049.jpg',
    url: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=3158760564307049',
    headers: { 'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' }
  },
  {
    name: 'FB-Post-Media-3158761937640245.jpg',
    url: 'https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=3158761937640245',
    headers: { 'User-Agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)' }
  }
];

async function downloadAll() {
  console.log(`Starting download to folder: ${destDir}`);
  for (let i = 0; i < images.length; i++) {
    const item = images[i];
    const targetFile = path.join(destDir, item.name);
    console.log(`[${i + 1}/${images.length}] Downloading ${item.name}...`);
    try {
      const res = await fetch(item.url, { headers: item.headers || {} });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(targetFile, buffer);
      console.log(`  ✓ Saved: ${targetFile} (${(buffer.length / 1024).toFixed(1)} KB)`);
    } catch (e) {
      console.error(`  ✗ Failed ${item.name}: ${e.message}`);
    }
  }
}

downloadAll();
