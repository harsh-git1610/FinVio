import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'FinVio - AI Invoice Generator'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
                    color: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    letterSpacing: '-0.05em',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Logo representation */}
                    <div style={{
                        width: '120px',
                        height: '120px',
                        background: 'white',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '80px'
                    }}>F</div>
                    <span style={{ fontWeight: 800 }}>FinVio</span>
                </div>
                <div style={{ fontSize: 40, marginTop: 40, fontWeight: 500, opacity: 0.8, letterSpacing: 'normal' }}>
                    Professional AI Invoicing
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
