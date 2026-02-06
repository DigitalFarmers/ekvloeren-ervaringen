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

    // Als het een emergency user is, login DIRECT zonder database check
    if (isEmergencyUser) {
      const cookieStore = await cookies()
      const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax" as const,
        maxAge: 60 * 60 * 24, // 24 uur
      }

      const displayName = username === "motouzani" ? "Motouzani (Admin)" : "Bowien (Admin)"

      cookieStore.set("admin_auth", "true", cookieOptions)
      cookieStore.set("admin_user_id", "emergency-user", cookieOptions)
      cookieStore.set("admin_username", username, cookieOptions)
      cookieStore.set("admin_name", displayName, cookieOptions)

      console.log(`✅ Emergency login successful for: ${username}`)
      return { success: true }
    }

    // Voor niet-emergency users: check database
    if (!process.env.DATABASE_URL) {
      return { success: false, message: "Server-configuratie fout: DATABASE_URL ontbreekt. Gebruik emergency login." }
    }

    try {
      const hashedInput = hashPassword(password)

      // 1. Check admin_users
      const users = await sql`SELECT * FROM admin_users WHERE username = ${username} AND is_active = true LIMIT 1`
      if (users.length > 0) {
        const dbUser = users[0] as any
        if (dbUser.password_hash === hashedInput) {
          const cookieStore = await cookies()
          const cookieOptions = {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax" as const,
            maxAge: 60 * 60 * 24,
          }

          cookieStore.set("admin_auth", "true", cookieOptions)
          cookieStore.set("admin_user_id", String(dbUser.id), cookieOptions)
          cookieStore.set("admin_username", dbUser.username, cookieOptions)
          cookieStore.set("admin_name", dbUser.full_name || dbUser.username, cookieOptions)

          return { success: true }
        }
      }

      // 2. Fallback naar oude users tabel
      const legacyUsers = await sql`SELECT * FROM users WHERE username = ${username} LIMIT 1`
      if (legacyUsers.length > 0) {
        const dbUser = legacyUsers[0] as any
        if (dbUser.password_hash === hashedInput) {
          const cookieStore = await cookies()
          const cookieOptions = {
            httpOnly: true,
            secure: isProd,
            sameSite: "lax" as const,
            maxAge: 60 * 60 * 24,
          }

          cookieStore.set("admin_auth", "true", cookieOptions)
          cookieStore.set("admin_user_id", String(dbUser.id), cookieOptions)
          cookieStore.set("admin_username", dbUser.username, cookieOptions)
          cookieStore.set("admin_name", dbUser.full_name || dbUser.username, cookieOptions)

          return { success: true }
        }
      }
    } catch (dbError: any) {
      console.error("Database error during login:", dbError.message)
      return {
        success: false,
        message: `Database fout: ${dbError.message}. Probeer emergency login: motouzani/admin123 of bowien/bowien123`
      }
    }

    return { success: false, message: "Onjuiste gebruikersnaam of wachtwoord." }
  } catch (error: any) {
    console.error("CRITICAL AUTH ERROR:", error)
    return {
      success: false,
      message: `Systeemfout: ${error?.message || "Onbekend"}. Probeer emergency login: motouzani/admin123`
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
