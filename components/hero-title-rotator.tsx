"use client"

import { useState, useEffect } from "react"

export function HeroTitleRotator() {
    const [index, setIndex] = useState(0)
    const texts = ["EK Vloeren", "Erwin Kooistra"]

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <span className="relative inline-block min-w-[280px] text-left">
            {texts.map((text, i) => (
                <span
                    key={i}
                    className={`absolute left-0 top-0 transition-all duration-700 ease-in-out ${i === index
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                        }`}
                    style={{ color: "hsl(var(--destructive))" }}
                >
                    {text}
                </span>
            ))}
            <span className="invisible" aria-hidden="true">{texts[0]}</span>
        </span>
    )
}
