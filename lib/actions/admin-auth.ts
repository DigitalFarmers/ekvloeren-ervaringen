"use server"

import { cookies } from "next/headers"
import { sql, type User } from "@/lib/db"
import { createHash } from "crypto"

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex")
}

export interface UserFromSession {
  id: string
  username: string
  name: string | null
}

export async function adminLogin(username: string, password: string): Promise<{ success: boolean; message?: string }> {
  try {
    const isProd = process.env.NODE_ENV === "production"
    const hashedInput = hashPassword(password)

    // NOOD-INLOG (Werkt altijd, zelfs zonder database verbinding)
    // Dit is nodig omdat de live-site momenteel onbereikbaar is door database/dependency issues.
    const isEmergencyUser = (username === "motouzani" && password === "admin123") ||
      (username === "bowien" && password === "bowien123")

    let userFound = false
    let userId = isEmergencyUser ? "emergency-id" : ""
    let displayName = username

    // Probeer database als de URL er is
    if (process.env.DATABASE_URL) {
      try {
        // Probeer admin_users
        const users = await sql`SELECT * FROM admin_users WHERE username = ${username} AND is_active = true LIMIT 1`
        if (users.length > 0) {
          const dbUser = users[0] as any
          if (dbUser.password_hash === hashedInput || isEmergencyUser) {
            userFound = true
            userId = String(dbUser.id)
            displayName = dbUser.full_name || dbUser.username
          }
        } else {
          // Probeer oude users tabel
          const legacyUsers = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`
          if (legacyUsers.length > 0) {
            const dbUser = legacyUsers[0] as any
            if (dbUser.password_hash === hashedInput || isEmergencyUser) {
              userFound = true
              userId = String(dbUser.id)
              displayName = dbUser.full_name || dbUser.username
            }
          }
        }
      } catch (dbError) {
        console.error("Database connection error during login:", dbError)
        // Als de database faalt maar het is een nood-gebruiker, laten we ze toch toe
        if (isEmergencyUser) {
          userFound = true
        }
      }
    } else {
      // Geen DATABASE_URL, check alleen nood-inlog
      if (isEmergencyUser) userFound = true
    }

    if (userFound) {
      const cookieStore = await cookies()
      cookieStore.set("admin_auth", "true", {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
      })

      cookieStore.set("admin_user_id", userId, { httpOnly: true, secure: isProd, sameSite: "lax" })
      cookieStore.set("admin_username", username, { httpOnly: true, secure: isProd, sameSite: "lax" })
      cookieStore.set("admin_name", displayName, { httpOnly: true, secure: isProd, sameSite: "lax" })

      return { success: true }
    }

    return { success: false, message: "Onjuiste gebruikersnaam of wachtwoord" }
  } catch (error: any) {
    console.error("FATAL Login error:", error)
    return {
      success: false,
      message: `Critische fout: ${error?.message || "Onbekende fout"}. Controleer je Database URL.`
    }
  }
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin_auth")
  cookieStore.delete("admin_user_id")
  cookieStore.delete("admin_username")
  cookieStore.delete("admin_name")
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const auth = cookieStore.get("admin_auth")?.value === "true"
  if (!auth) return null

  return {
    id: cookieStore.get("admin_user_id")?.value,
    username: cookieStore.get("admin_username")?.value,
    name: cookieStore.get("admin_name")?.value,
  }
}
