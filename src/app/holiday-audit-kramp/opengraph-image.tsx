import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        fontSize: 48,
        background: 'linear-gradient(135deg, #000000 0%, #166534 50%, #7f1d1d 100%)',
        color: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        fontWeight: 'bold',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ 
          fontSize: 120, 
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          🎅
        </div>
        <div style={{ 
          fontSize: 60, 
          marginBottom: '20px',
          textAlign: 'center',
          color: '#22c55e',
          textShadow: '0 0 20px #22c55e',
        }}>
          HOLIDAY AUDIT
        </div>
        <div style={{ 
          fontSize: 80, 
          marginBottom: '30px',
          textAlign: 'center',
          color: '#ef4444',
          textShadow: '0 0 20px #ef4444',
        }}>
          KRAMP.EXE
        </div>
        <div style={{ 
          fontSize: 24, 
          textAlign: 'center',
          color: '#d1d5db',
          maxWidth: '800px',
          lineHeight: 1.3,
        }}>
          Christmas Eve gone catastrophically wrong in space
        </div>
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          fontSize: 20,
          color: '#9ca3af',
        }}>
          Fables Monster Studio
        </div>
        
        {/* Christmas lights effect */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 40px',
        }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: i % 4 === 0 ? '#ef4444' : i % 4 === 1 ? '#22c55e' : i % 4 === 2 ? '#3b82f6' : '#eab308',
                boxShadow: `0 0 10px ${i % 4 === 0 ? '#ef4444' : i % 4 === 1 ? '#22c55e' : i % 4 === 2 ? '#3b82f6' : '#eab308'}`,
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
