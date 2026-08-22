import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqospi6h7';
    const apiKey = process.env.CLOUDINARY_API_KEY || '965783923269875';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'CiHZL7_EhvHe62DMUVBXcMvFTjE';

    // Convert file to array buffer and base64 string
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Generate Cloudinary Signature
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = 'bd_books_covers';
    const paramsToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

    // Prepare Cloudinary Upload Form Data
    const uploadData = new FormData();
    uploadData.append('file', base64File);
    uploadData.append('api_key', apiKey);
    uploadData.append('timestamp', timestamp.toString());
    uploadData.append('folder', folder);
    uploadData.append('signature', signature);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: uploadData,
      }
    );

    const data = await cloudinaryRes.json();

    if (!cloudinaryRes.ok) {
      return NextResponse.json(
        { error: data.error?.message || 'Cloudinary upload failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.secure_url || data.url });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string' || !url.includes('cloudinary.com')) {
      return NextResponse.json(
        { error: 'অকার্যকর Cloudinary URL প্রদান করা হয়েছে' },
        { status: 400 }
      );
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqospi6h7';
    const apiKey = process.env.CLOUDINARY_API_KEY || '965783923269875';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'CiHZL7_EhvHe62DMUVBXcMvFTjE';

    // Extract public_id e.g., bd_books_covers/ks6glbcr1ckggu5lvgbk
    const parts = url.split('/upload/');
    if (parts.length < 2) {
      return NextResponse.json(
        { error: 'Cloudinary URL গঠন সঠিক নয়' },
        { status: 400 }
      );
    }

    const pathAfterUpload = parts[1];
    const pathNoVersion = pathAfterUpload.replace(/^v\d+\//, '');
    const publicId = pathNoVersion.replace(/\.[^/.]+$/, '');

    const timestamp = Math.floor(Date.now() / 1000);
    const paramsToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(paramsToSign).digest('hex');

    const deleteData = new URLSearchParams();
    deleteData.append('public_id', publicId);
    deleteData.append('api_key', apiKey);
    deleteData.append('timestamp', timestamp.toString());
    deleteData.append('signature', signature);

    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: deleteData.toString(),
      }
    );

    const data = await cloudinaryRes.json();

    if (!cloudinaryRes.ok || data.result !== 'ok') {
      return NextResponse.json(
        { error: data.result || data.error?.message || 'Cloudinary থেকে মুছে ফেলা সম্ভব হয়নি' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: 'Cloudinary থেকে ছবিটি স্থায়ীভাবে মুছে ফেলা হয়েছে!' });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal delete error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
