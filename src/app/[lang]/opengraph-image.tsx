import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        fontSize: 48,
        background: 'linear-gradient(135deg, #0a0a0a 0%, #7a0000 100%)',
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
      }}>
        <div style={{ 
          fontSize: 72, 
          fontWeight: 900,
          marginBottom: '20px',
          textAlign: 'center',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          FABLES MONSTER
        </div>
        <div style={{ 
          fontSize: 32, 
          textAlign: 'center',
          maxWidth: '80%',
          opacity: 0.9,
          letterSpacing: '0.05em',
        }}>
          Independent Tabletop RPG Content Creation Studio
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
