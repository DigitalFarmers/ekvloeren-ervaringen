"use client"

import { useState, useEffect } from "react"

export function HeroTitleRotator() {
    const [index, setIndex] = useState(0)
    const texts = ["EK Vloeren?", "Erwin Kooistra?"]

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <span className="relative inline-flex justify-start h-[1.2em] align-bottom overflow-hidden">
            {texts.map((text, i) => (
                <span
                    key={i}
                    className={`absolute left-0 top-0 whitespace-nowrap transition-all duration-700 ease-in-out ${i === index
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                        }`}
                    style={{ color: "#dc2626" }} // Explicit safe red (red-600)
                >
                    {text}
                </span>
            ))}
            {/* Invisible spacer to reserve width of the longest text */}
            <span className="invisible whitespace-nowrap font-bold tracking-tight" aria-hidden="true">Erwin Kooistra?</span>
        </span>
    )
}
