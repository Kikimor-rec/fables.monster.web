import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const chalkFont = readFile(join(process.cwd(), 'public/fonts/chalk-regular.ttf'));

export default async function Image() {
  const fontData = await chalkFont;
  return new ImageResponse(
    (
      <div style={{
        fontSize: 48,
        background: 'linear-gradient(135deg, #000000 0%, #7a0000 100%)',
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontFamily: 'Chalk',
        fontWeight: 'bold',
      }}>
        <div style={{ 
          fontSize: 80, 
          marginBottom: '20px',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(255, 0, 0, 0.5)'
        }}>
          FABLES MONSTER
        </div>
        <div style={{ 
          fontSize: 36, 
          textAlign: 'center',
          maxWidth: '80%',
          lineHeight: '1.4'
        }}>
          Tabletop RPG Adventures & Content
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Chalk', data: fontData }]
    }
  );
}
