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

    // DEFINITIEVE NOOD-INLOG (Prioriteit #1)
    // Deze accounts MOETEN altijd kunnen inloggen om het platform te redden.
    const isEmergencyUser = (username === "motouzani" && password === "admin123") ||
      (username === "bowien" && password === "bowien123")

    let authVerified = isEmergencyUser
    let userId = isEmergencyUser ? "emergency-user" : ""
    let displayName = isEmergencyUser ? (username === "motouzani" ? "Motouzani (Admin)" : "Bowien (Admin)") : username

    // Alleen als het GEEN nood-inlog is OF als we willen syncen met de DB, proberen we de database.
    if (process.env.DATABASE_URL) {
      try {
        const hashedInput = hashPassword(password)

        // 1. Check admin_users
        const users = await sql`SELECT * FROM admin_users WHERE username = ${username} AND is_active = true LIMIT 1`
        if (users.length > 0) {
          const dbUser = users[0] as any
          if (dbUser.password_hash === hashedInput) {
            authVerified = true
            userId = String(dbUser.id)
            displayName = dbUser.full_name || dbUser.username
          }
        }
        // 2. Fallback naar oude users tabel (indien migratie nog niet klaar is)
        else {
          const legacyUsers = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`
          if (legacyUsers.length > 0) {
            const dbUser = legacyUsers[0] as any
            if (dbUser.password_hash === hashedInput) {
              authVerified = true
              userId = String(dbUser.id)
              displayName = dbUser.full_name || dbUser.username
            }
          }
        }
      } catch (dbError: any) {
        console.error("Database connection failed during login:", dbError.message)
        // Als DB faalt, maar identiteit is al bevestigd via emergency -> GO
        if (!authVerified) {
          return {
            success: false,
            message: `Database verbinding mislukt. (Fout: ${dbError.message}). Gebruik NOOD-gegevens als herstelpunt.`
          }
        }
      }
    } else if (!authVerified) {
      return { success: false, message: "Server-configuratie fout: DATABASE_URL ontbreekt." }
    }

    if (authVerified) {
      const cookieStore = await cookies()
      const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24, // 24 uur
      }

      cookieStore.set("admin_auth", "true", cookieOptions)
      cookieStore.set("admin_user_id", userId, cookieOptions)
      cookieStore.set("admin_username", username, cookieOptions)
      cookieStore.set("admin_name", displayName, cookieOptions)

      return { success: true }
    }

    return { success: false, message: "Onjuiste gebruikersnaam of wachtwoord." }
  } catch (error: any) {
    console.error("CRITICAL AUTH ERROR:", error)
    return {
      success: false,
      message: `Fatale systeemfout: ${error?.message || "Onbekend"}. Neem contact op met support.`
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
