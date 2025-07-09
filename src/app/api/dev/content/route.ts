import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: 'File parameter required' }, { status: 400 });
  }

  const allowedFiles = ['site-content.json', 'terminal-content.json'];
  
  if (!allowedFiles.includes(file)) {
    return NextResponse.json({ error: 'File not allowed' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'content', file);
    const content = fs.readFileSync(filePath, 'utf8');
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { file, content } = body;

    if (!file || !content) {
      return NextResponse.json({ error: 'File and content required' }, { status: 400 });
    }

    const allowedFiles = ['site-content.json', 'terminal-content.json'];
    
    if (!allowedFiles.includes(file)) {
      return NextResponse.json({ error: 'File not allowed' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public', 'content', file);
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}
