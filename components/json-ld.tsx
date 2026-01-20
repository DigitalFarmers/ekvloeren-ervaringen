export function JsonLd() {
    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://ekvloeren-ervaringen.nl/#website",
                "url": "https://ekvloeren-ervaringen.nl",
                "name": "EK Vloeren Ervaringen",
                "description": "Meldpunt voor ervaringen en klachten over EK Vloeren en Erwin Kooistra.",
                "inLanguage": "nl-NL"
            },
            {
                "@type": "Organization",
                "@id": "https://ekvloeren-ervaringen.nl/#organization",
                "name": "Digital Farmers",
                "url": "https://digitalfarmers.be",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://digitalfarmers.be/logo.png"
                },
                "sameAs": [
                    "https://digitalfarmers.be"
                ]
            },
            {
                "@type": "Person",
                "@id": "https://ekvloeren-ervaringen.nl/#subject",
                "name": "Erwin Kooistra",
                "jobTitle": "Eigenaar",
                "affiliation": {
                    "@type": "Organization",
                    "name": "EK Vloeren"
                },
                "description": "Onderwerp van publieke meldingen betreft EK Vloeren."
            }
        ]
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    )
}
