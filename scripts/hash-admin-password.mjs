// Maakt de waarde voor ADMIN_EMERGENCY_PASSWORD_HASH.
// Gebruik: node scripts/hash-admin-password.mjs '<wachtwoord>'
import { randomBytes, scryptSync } from "node:crypto"

const password = process.argv[2]
if (!password || password.length < 16) {
  console.error("Geef een wachtwoord van minstens 16 tekens mee.")
  process.exit(1)
}
const salt = randomBytes(16)
console.log(`scrypt$${salt.toString("hex")}$${scryptSync(password, salt, 32).toString("hex")}`)
