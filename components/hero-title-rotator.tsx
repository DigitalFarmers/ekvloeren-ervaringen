"use client"

import { useState, useEffect } from "react"

export function HeroTitleRotator() {
    const [index, setIndex] = useState(0)
    const [fade, setFade] = useState(true)
    const texts = ["EK Vloeren", "Erwin Kooistra"]

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false) // Start fade out
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % texts.length) // Swap text
                setFade(true) // Start fade in
            }, 500) // Wait for fade out to finish
        }, 4000) // Change every 4 seconds

        return () => clearInterval(interval)
    }, [texts.length])

    return (
        <span className="inline-grid grid-cols-1 align-bottom">
            {/* Height placeholder to prevent layout shift if sizes differ slightly, though mostly handled by layout */}
            <span
                className={`col-start-1 row-start-1 text-red-600 transition-all duration-500 ease-in-out transform ${fade ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
                    }`}
            >
                {texts[index]}
            </span>
            {/* Invisible placeholder for width if needed, but simple block is usually fine */}
        </span>
    )
}
