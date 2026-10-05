"use server"

import { cookies } from "next/headers"
import { sql } from "@/lib/db"
import { createHash, timingSafeEqual } from "crypto"
import {
  ADMIN_SESSION_COOKIE,
  AdminConfigError,
  adminCookieOptions,
  checkEmergencyLogin,
  signAdminSession,
  verifyAdminSession,
  type AdminSession,
} from "@/lib/admin-session"

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex")
}

function sameHash(stored: unknown, given: string): boolean {
  if (typeof stored !== "string" || stored.length !== given.length) return false
  return timingSafeEqual(Buffer.from(stored), Buffer.from(given))
}

export interface UserFromSession {
  id: string
  username: string
  name: string | null
}

// Oude, ongetekende koekjes: bij login en logout opruimen.
const LEGACY_COOKIES = ["admin_auth", "admin_user_id", "admin_username", "admin_name"]

async function startSession(session: AdminSession): Promise<void> {
  const token = signAdminSession(session) // gooit AdminConfigError zonder geheim
  const cookieStore = await cookies()
  for (const name of LEGACY_COOKIES) cookieStore.delete(name)
  cookieStore.set(ADMIN_SESSION_COOKIE, token, adminCookieOptions)
}

export async function adminLogin(username: string, password: string): Promise<{ success: boolean; message?: string }> {
  try {
    // Faal dicht als het sessiegeheim ontbreekt, nog voor we iets nakijken.
    signAdminSession({ id: "probe", username: "probe", name: "probe" })

    if (checkEmergencyLogin(username, password)) {
      await startSession({ id: "emergency-user", username, name: `${username} (nood-login)` })
      return { success: true }
    }

    if (!process.env.DATABASE_URL) {
      return { success: false, message: "Server-configuratie fout: DATABASE_URL ontbreekt." }
    }

    const hashedInput = hashPassword(password)
    // 1. admin_users, 2. fallback naar de oude users-tabel (zelfde volgorde als voorheen)
    const users = await sql`SELECT * FROM admin_users WHERE username = ${username} AND is_active = true LIMIT 1`
    const legacyUsers = await sql`SELECT * FROM users WHERE username = ${username} AND is_active = true LIMIT 1`
    const dbUser = [users[0], legacyUsers[0]].find((u: any) => u && sameHash(u.password_hash, hashedInput)) as any

    if (dbUser) {
      await startSession({
        id: String(dbUser.id),
        username: dbUser.username,
        name: dbUser.full_name || dbUser.username,
      })
      return { success: true }
    }

    return { success: false, message: "Onjuiste gebruikersnaam of wachtwoord." }
  } catch (error: any) {
    if (error instanceof AdminConfigError) {
      console.error("Admin-login dicht:", error.message)
      return { success: false, message: "Admin-login staat dicht: ADMIN_SESSION_SECRET is niet ingesteld op de server." }
    }
    console.error("Admin-login fout:", error?.message)
    return { success: false, message: "Er ging iets mis bij het inloggen. Probeer het later opnieuw." }
  }
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_SESSION_COOKIE)
  for (const name of LEGACY_COOKIES) cookieStore.delete(name)
}

// De enige plek waar de admin-sessie gelezen wordt. Elke admin-pagina en admin-actie roept dit aan.
export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies()
  return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value)
}
