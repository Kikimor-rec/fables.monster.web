import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        fontSize: 48,
        background: 'linear-gradient(135deg, #000000 0%, #1a0038 100%)',
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
      }}>
        <div style={{ 
          fontSize: 80, 
          marginBottom: '20px',
          textAlign: 'center',
          textShadow: '0 0 20px rgba(128, 0, 128, 0.7)'
        }}>
          THE LOST MARK
        </div>
        <div style={{ 
          fontSize: 36, 
          textAlign: 'center',
          maxWidth: '80%',
          lineHeight: '1.4'
        }}>
          Sci-Fi Horror Adventure for Mothership RPG
        </div>
        <div style={{
          marginTop: '30px',
          fontSize: 24,
          textAlign: 'center',
          color: '#ff6b6b'
        }}>
          Fables Monster Studio
        </div>
      </div>
    ),
    size
  );
}
