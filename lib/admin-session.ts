import { createHmac, scryptSync, timingSafeEqual } from "node:crypto"

// Getekende admin-sessie: base64url(JSON payload met exp) + "." + HMAC-SHA256.
// Puur (geen next/headers) zodat het los te toetsen is.

export const ADMIN_SESSION_COOKIE = "admin_session"
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24 // 24 uur, in seconden
const MIN_SECRET_LENGTH = 32

export interface AdminSession {
  id: string
  username: string
  name: string
}

interface SignedPayload extends AdminSession {
  exp: number // unix seconden
}

export class AdminConfigError extends Error {}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < MIN_SECRET_LENGTH) {
    throw new AdminConfigError(
      `ADMIN_SESSION_SECRET ontbreekt of is korter dan ${MIN_SECRET_LENGTH} tekens; admin-login staat dicht.`,
    )
  }
  return secret
}

function hmac(data: string, secret: string): Buffer {
  return createHmac("sha256", secret).update(data).digest()
}

export function signAdminSession(session: AdminSession, nowMs = Date.now()): string {
  const payload: SignedPayload = { ...session, exp: Math.floor(nowMs / 1000) + ADMIN_SESSION_MAX_AGE }
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url")
  return `${body}.${hmac(body, getSecret()).toString("base64url")}`
}

// Geeft de sessie terug, of null bij elk probleem (ontbrekend geheim, foute handtekening, verlopen).
export function verifyAdminSession(token: string | undefined, nowMs = Date.now()): AdminSession | null {
  if (!token) return null
  const [body, sig, ...rest] = token.split(".")
  if (!body || !sig || rest.length > 0) return null

  let secret: string
  try {
    secret = getSecret()
  } catch {
    return null
  }

  const expected = hmac(body, secret)
  const given = Buffer.from(sig, "base64url")
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null

  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SignedPayload
    if (typeof p.exp !== "number" || p.exp * 1000 <= nowMs) return null
    if (typeof p.id !== "string" || typeof p.username !== "string") return null
    return { id: p.id, username: p.username, name: typeof p.name === "string" ? p.name : p.username }
  } catch {
    return null
  }
}

export const adminCookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: ADMIN_SESSION_MAX_AGE,
}

// Nood-login enkel via env. Hash-formaat: scrypt$<salt hex>$<hash hex>
// (aanmaken met: node scripts/hash-admin-password.mjs '<wachtwoord>').
export function checkEmergencyLogin(username: string, password: string): boolean {
  const envUser = process.env.ADMIN_EMERGENCY_USERNAME
  const envHash = process.env.ADMIN_EMERGENCY_PASSWORD_HASH
  if (!envUser || !envHash) return false

  const [scheme, saltHex, hashHex] = envHash.split("$")
  if (scheme !== "scrypt" || !saltHex || !hashHex) return false

  const expected = Buffer.from(hashHex, "hex")
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length)
  const userOk = username.length === envUser.length && timingSafeEqual(Buffer.from(username), Buffer.from(envUser))
  return timingSafeEqual(actual, expected) && userOk
}
