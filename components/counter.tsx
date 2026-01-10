"use client"

import { useState, useEffect } from "react"
import { getPublicCounter } from "@/lib/actions/submit-report"

export function Counter() {
  const [count, setCount] = useState(0)
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const actualCount = await getPublicCounter()
        setCount(actualCount)
      } catch (error) {
        console.error("Failed to fetch count:", error)
        setCount(0)
      }
    }

    fetchCount()
  }, [])

  useEffect(() => {
    if (count === 0) return

    const duration = 2000 // 2 seconds
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

  return displayCount.toLocaleString("nl-NL")
}
