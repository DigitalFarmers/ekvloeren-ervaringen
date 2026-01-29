"use server"

import { cookies } from "next/headers"
import { sql, type User } from "@/lib/db"
import bcrypt from "bcryptjs"

export interface UserFromSession {
  id: string
  username: string
  name: string | null
}

export async function adminLogin(username: string, password: string): Promise<{ success: boolean; message?: string }> {
  try {
    const users = await sql`SELECT * FROM admin_users WHERE username = ${username} AND is_active = true LIMIT 1`
    const user = users[0] as any

    if (!user) {
      return { success: false, message: "Onjuiste gebruikersnaam of wachtwoord" }
    }

    const isValid = await bcrypt.compare(password, user.password_hash)
    if (isValid) {
      const cookieStore = await cookies()
      cookieStore.set("admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      // Update last login
      await sql`UPDATE admin_users SET last_login = NOW() WHERE id = ${user.id}`

      // Also store user info
      cookieStore.set("admin_user_id", user.id, { httpOnly: true, secure: true, sameSite: "strict" })
      cookieStore.set("admin_username", user.username, { httpOnly: true, secure: true, sameSite: "strict" })
      cookieStore.set("admin_name", user.full_name || user.username, { httpOnly: true, secure: true, sameSite: "strict" })

      return { success: true }
    }

    return { success: false, message: "Onjuiste gebruikersnaam of wachtwoord" }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "Er is een serverfout opgetreden" }
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
