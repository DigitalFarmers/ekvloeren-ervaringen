"use client"

import { useState, useEffect } from "react"
import { getPublicTotalDamage } from "@/lib/actions/submit-report"

export function TotalDamageCounter() {
    const [count, setCount] = useState(0)
    const [displayCount, setDisplayCount] = useState(0)

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const actualCount = await getPublicTotalDamage()
                setCount(actualCount)
            } catch (error) {
                console.error("Failed to fetch total damage:", error)
                setCount(0)
            }
        }

        fetchCount()
    }, [])

    useEffect(() => {
        if (count === 0) return

        const duration = 2500 // 2.5 seconds
        const steps = 60
        const increment = count / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= count) {
                setDisplayCount(count)
                clearInterval(timer)
            } else {
                setDisplayCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [count])

    return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(displayCount)
}
