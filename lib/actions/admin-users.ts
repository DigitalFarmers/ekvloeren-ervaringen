"use server"

import { cookies } from "next/headers"
import { sql, type AdminUser } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function createAdminUser(
    username: string,
    email: string,
    password: string,
    fullName?: string
): Promise<{ success: boolean; message: string; userId?: string }> {
    try {
        // Hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // Insert admin user
        const result = await sql`
      INSERT INTO admin_users (username, email, password_hash, full_name)
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
      SELECT * FROM admin_users 
      WHERE username = ${username} AND is_active = true
      LIMIT 1
    ` as AdminUser[]

        if (users.length === 0) {
            return { success: false, message: "Ongeldige gebruikersnaam of wachtwoord" }
        }

        const user = users[0]

        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash)

        if (!isValid) {
            return { success: false, message: "Ongeldige gebruikersnaam of wachtwoord" }
        }

        // Update last login
        await sql`
      UPDATE admin_users 
      SET last_login = NOW() 
      WHERE id = ${user.id}
    `

        // Set auth cookie with user info
        const cookieStore = await cookies()
        cookieStore.set("admin_auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        })

        cookieStore.set("admin_user_id", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        })

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
        const cookieStore = await cookies()
        const userId = cookieStore.get("admin_user_id")?.value

        if (!userId) {
            return null
        }

        const users = await sql`
      SELECT * FROM admin_users 
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
        const users = await sql`
      SELECT id, username, email, full_name, created_at, last_login, is_active
      FROM admin_users
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

        const passwordHash = await bcrypt.hash(newPassword, 10)

        await sql`
            UPDATE admin_users 
            SET password_hash = ${passwordHash} 
            WHERE id = ${userId}
        `

        return { success: true, message: "Wachtwoord succesvol gewijzigd" }
    } catch (error) {
        console.error("Error updating admin password:", error)
        return { success: false, message: "Er is een fout opgetreden" }
    }
}
