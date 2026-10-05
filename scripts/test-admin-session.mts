// Toets voor de getekende admin-sessie. Draaien: node scripts/test-admin-session.mts
// Optioneel HTTP-deel tegen een LOKALE server: ADMIN_TEST_URL=http://localhost:3917 node scripts/test-admin-session.mts
// Verwacht dan ook ADMIN_SESSION_SECRET gelijk aan die van de lokale server.
import { randomBytes, scryptSync } from "node:crypto"
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  checkEmergencyLogin,
  signAdminSession,
  verifyAdminSession,
} from "../lib/admin-session.ts"

let failed = 0
function check(label: string, ok: boolean) {
  console.log(`${ok ? "OK  " : "FOUT"} ${label}`)
  if (!ok) failed++
}

process.env.ADMIN_SESSION_SECRET ||= randomBytes(32).toString("hex")
const who = { id: "42", username: "tester", name: "Tester" }
const now = Date.now()
const token = signAdminSession(who, now)

check("correct getekend koekje wordt aanvaard", verifyAdminSession(token, now)?.id === "42")
check("letterlijk 'true' (oud koekje) wordt geweigerd", verifyAdminSession("true", now) === null)
check("leeg koekje wordt geweigerd", verifyAdminSession(undefined, now) === null)

const [body, sig] = token.split(".")
const flipped = sig.slice(0, -2) + (sig.endsWith("AA") ? "BB" : "AA")
check("gewijzigde handtekening wordt geweigerd", verifyAdminSession(`${body}.${flipped}`, now) === null)

const forgedBody = Buffer.from(JSON.stringify({ ...who, id: "1", exp: 9999999999 })).toString("base64url")
check("gewijzigde inhoud met oude handtekening wordt geweigerd", verifyAdminSession(`${forgedBody}.${sig}`, now) === null)

check("verlopen koekje wordt geweigerd", verifyAdminSession(token, now + (ADMIN_SESSION_MAX_AGE + 1) * 1000) === null)

const savedSecret = process.env.ADMIN_SESSION_SECRET
process.env.ADMIN_SESSION_SECRET = randomBytes(32).toString("hex")
check("koekje getekend met ander geheim wordt geweigerd", verifyAdminSession(token, now) === null)
delete process.env.ADMIN_SESSION_SECRET
let threw = false
try {
  signAdminSession(who, now)
} catch {
  threw = true
}
check("zonder ADMIN_SESSION_SECRET faalt tekenen dicht", threw)
check("zonder ADMIN_SESSION_SECRET wordt niets aanvaard", verifyAdminSession(token, now) === null)
process.env.ADMIN_SESSION_SECRET = savedSecret

// Nood-login via env
delete process.env.ADMIN_EMERGENCY_USERNAME
delete process.env.ADMIN_EMERGENCY_PASSWORD_HASH
check("nood-login uit zonder env", checkEmergencyLogin("iemand", "eender-wat") === false)
const salt = randomBytes(16)
const pw = randomBytes(12).toString("hex")
process.env.ADMIN_EMERGENCY_USERNAME = "nood"
process.env.ADMIN_EMERGENCY_PASSWORD_HASH = `scrypt$${salt.toString("hex")}$${scryptSync(pw, salt, 32).toString("hex")}`
check("nood-login met juist wachtwoord", checkEmergencyLogin("nood", pw) === true)
check("nood-login met fout wachtwoord", checkEmergencyLogin("nood", pw + "x") === false)
check("nood-login met foute naam", checkEmergencyLogin("iemand", pw) === false)

// HTTP-deel: echte /admin-pagina op een lokale server
const base = process.env.ADMIN_TEST_URL
if (base) {
  if (!/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(base)) throw new Error("ADMIN_TEST_URL moet lokaal zijn")
  const isDashboard = async (cookie?: string) => {
    const res = await fetch(`${base}/admin`, { headers: cookie ? { cookie } : {} })
    return (await res.text()).includes("Admin Dashboard")
  }
  const mode = process.env.ADMIN_TEST_EXPECT // "oud" of "nieuw"
  const forged = await isDashboard("admin_auth=true")
  console.log(`HTTP: zelfgezet admin_auth=true geeft dashboard: ${forged}`)
  if (mode === "oud") check("OUD: zelfgezet admin_auth=true geeft toegang (het lek)", forged)
  if (mode === "nieuw") {
    check("NIEUW: zelfgezet admin_auth=true wordt geweigerd", !forged)
    check("NIEUW: zelfgezet admin_session=true wordt geweigerd", !(await isDashboard(`${ADMIN_SESSION_COOKIE}=true`)))
    check("NIEUW: geknoeide handtekening wordt geweigerd", !(await isDashboard(`${ADMIN_SESSION_COOKIE}=${body}.${flipped}`)))
    const expired = signAdminSession(who, now - (ADMIN_SESSION_MAX_AGE + 5) * 1000)
    check("NIEUW: verlopen koekje wordt geweigerd", !(await isDashboard(`${ADMIN_SESSION_COOKIE}=${expired}`)))
    check("NIEUW: correct getekend koekje geeft toegang", await isDashboard(`${ADMIN_SESSION_COOKIE}=${signAdminSession(who)}`))
  }
}

console.log(failed === 0 ? "ALLES GROEN" : `${failed} FOUT(EN)`)
process.exit(failed === 0 ? 0 : 1)
