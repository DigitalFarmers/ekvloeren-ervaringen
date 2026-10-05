"use server"

import { cookies } from "next/headers"
import { sql, type AdminUser } from "@/lib/db"
import { createHash } from "crypto"
import { ADMIN_SESSION_COOKIE, adminCookieOptions, signAdminSession } from "@/lib/admin-session"
import { getAdminSession } from "./admin-auth"

function hashPassword(password: string): string {
    return createHash("sha256").update(password).digest("hex")
}

export async function createAdminUser(
    username: string,
    email: string,
    password: string,
    fullName?: string
): Promise<{ success: boolean; message: string; userId?: string }> {
    try {
        if (!(await getAdminSession())) return { success: false, message: "Ongeautoriseerd" }

        // Hash password with SHA256
        const passwordHash = hashPassword(password)

        // Insert admin user
        const result = await sql`
      INSERT INTO users (username, email, password_hash, full_name)
      VALUES (${username}, ${email}, ${passwordHash}, ${fullName || null})
      RETURNING id
    `

        if (result.length === 0) {
            return { success: false, message: "Kon gebruiker niet aanmaken" }
        }

        return {
            success: true,
            message: "Admin gebruiker succesvol aangemaakt",
            userId: result[0].id,
        }
    } catch (error: any) {
        console.error("Error creating admin user:", error)

        if (error.message?.includes("unique")) {
            return { success: false, message: "Gebruikersnaam of email bestaat al" }
        }

        return { success: false, message: "Er is een fout opgetreden" }
    }
}

export async function adminLoginWithUser(
    username: string,
    password: string
): Promise<{ success: boolean; message?: string; user?: { id: string; username: string; fullName: string | null } }> {
    try {
        // Get user from database
        const users = await sql`
      SELECT * FROM users 
      WHERE username = ${username} AND is_active = true
      LIMIT 1
    ` as AdminUser[]

        if (users.length === 0) {
            return { success: false, message: "Ongeldige gebruikersnaam of wachtwoord" }
        }

        const user = users[0]

        // Verify password with SHA256
        const hashedInput = hashPassword(password)
        const isValid = hashedInput === user.password_hash

        if (!isValid) {
            return { success: false, message: "Ongeldige gebruikersnaam of wachtwoord" }
        }

        // Update last login
        await sql`
      UPDATE users 
      SET last_login = NOW() 
      WHERE id = ${user.id}
    `

        // Getekende sessie (gooit als ADMIN_SESSION_SECRET ontbreekt: login faalt dicht)
        const token = signAdminSession({ id: String(user.id), username: user.username, name: user.full_name || user.username })
        const cookieStore = await cookies()
        cookieStore.set(ADMIN_SESSION_COOKIE, token, adminCookieOptions)

        return {
            success: true,
            user: {
                id: user.id,
                username: user.username,
                fullName: user.full_name,
            },
        }
    } catch (error) {
        console.error("Admin login error:", error)
        return { success: false, message: "Login fout" }
    }
}

export async function getCurrentAdminUser(): Promise<AdminUser | null> {
    try {
        const userId = (await getAdminSession())?.id

        if (!userId) {
            return null
        }

        const users = await sql`
      SELECT * FROM users 
      WHERE id = ${userId} AND is_active = true
      LIMIT 1
    ` as AdminUser[]

        return users[0] || null
    } catch (error) {
        console.error("Error getting current admin user:", error)
        return null
    }
}

export async function getAllAdminUsers(): Promise<AdminUser[]> {
    try {
        if (!(await getAdminSession())) return []
        const users = await sql`
      SELECT id, username, email, full_name, created_at, last_login, is_active
      FROM users
      ORDER BY created_at DESC
    ` as AdminUser[]

        return users
    } catch (error) {
        console.error("Error fetching admin users:", error)
        return []
    }
}

export async function updateAdminPassword(
    userId: string,
    newPassword: string
): Promise<{ success: boolean; message: string }> {
    try {
        const session = await getCurrentAdminUser()
        if (!session || (session.id !== userId)) {
            return { success: false, message: "Ongeautoriseerd" }
        }

        const passwordHash = hashPassword(newPassword)

        await sql`
            UPDATE users 
            SET password_hash = ${passwordHash} 
            WHERE id = ${userId}
        `

        return { success: true, message: "Wachtwoord succesvol gewijzigd" }
    } catch (error) {
        console.error("Error updating admin password:", error)
        return { success: false, message: "Er is een fout opgetreden" }
    }
}
