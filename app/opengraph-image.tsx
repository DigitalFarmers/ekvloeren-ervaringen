import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'EK Vloeren Ervaringen - Meldpunt voor gedupeerden'
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
                    background: '#09090b',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {/* Background gradient */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at center, #18191c 0%, #09090b 100%)',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 10,
                    }}
                >
                    {/* Icons/Logo */}
                    <div style={{ display: 'flex', marginBottom: 40 }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="120"
                            height="120"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#dc2626"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                        </svg>
                    </div>

                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: 20,
                            textAlign: 'center',
                            lineHeight: 1.1,
                        }}
                    >
                        Geld kwijt aan <br />
                        <span style={{ color: '#dc2626' }}>EK Vloeren?</span>
                    </h1>

                    <p
                        style={{
                            fontSize: 32,
                            color: '#a1a1aa',
                            marginTop: 10,
                            textAlign: 'center',
                            maxWidth: 800,
                        }}
                    >
                        Meld je ervaring. Samen staan we sterk.
                    </p>

                    <div style={{
                        display: 'flex',
                        marginTop: 40,
                        background: '#22c55e',
                        color: 'black',
                        padding: '12px 32px',
                        borderRadius: 50,
                        fontSize: 24,
                        fontWeight: 600
                    }}>
                        ekvloeren-ervaringen.nl
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
