import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { NextResponse } from 'next/server';

const isAcceptedMimeType = (mimeType: string) => {
  if (!mimeType) return false;
  if (mimeType === 'application/pdf') return true;
  return mimeType.startsWith('image/');
};

const safeExtensionFromName = (name: string) => {
  const ext = path.extname(name || '').toLowerCase();
  if (!ext) return '';
  if (!/^\.[a-z0-9]+$/i.test(ext)) return '';
  return ext;
};

export async function POST(request: Request, context: { params: { patientId: string } }) {
  try {
    const { patientId } = context.params;
    if (!patientId) {
      return NextResponse.json({ error: 'Missing patient id.' }, { status: 400 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file.' }, { status: 400 });
    }

    if (!isAcceptedMimeType(file.type)) {
      return NextResponse.json({ error: 'Only PDF and image files are allowed.' }, { status: 400 });
    }

    const originalName = file.name || 'upload';
    const ext = safeExtensionFromName(originalName);
    const storedName = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${ext}`;

    const relativeDir = path.join('uploads', 'patients', patientId);
    const absoluteDir = path.join(process.cwd(), 'public', relativeDir);
    await mkdir(absoluteDir, { recursive: true });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const absolutePath = path.join(absoluteDir, storedName);
    await writeFile(absolutePath, buffer);

    const url = `/${relativeDir.replace(/\\/g, '/')}/${storedName}`;

    return NextResponse.json({
      url,
      originalName,
      storedName,
      mimeType: file.type,
      size: file.size,
    });
  } catch {
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
