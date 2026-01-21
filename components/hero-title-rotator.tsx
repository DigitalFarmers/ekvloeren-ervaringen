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
    }, [texts.length])

    return (
        <span className="relative inline-flex flex-col h-[1.1em] overflow-hidden align-bottom w-[280px] sm:w-[350px] justify-center text-red-600">
            {texts.map((text, i) => (
                <span
                    key={text}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${i === index
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-full"
                        }`}
                    aria-hidden={i !== index}
                >
                    {text}
                </span>
            ))}
        </span>
    )
}
