"use server"

import { cookies } from "next/headers"

export async function adminLogin(password: string): Promise<{ success: boolean; message?: string }> {
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set")
    return { success: false, message: "Server configuratiefout" }
  }

  if (password === adminPassword) {
    const cookieStore = await cookies()
    cookieStore.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    })
    return { success: true }
  }

  return { success: false, message: "Onjuist wachtwoord" }
}

export async function adminLogout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin_auth")
}
