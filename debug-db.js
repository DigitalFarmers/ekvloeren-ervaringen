
import { sql } from "./lib/db/index.js";

async function check() {
    try {
        const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
        console.log("Tables in database:", tables.map(t => t.table_name).join(", "));

        try {
            const adminUsers = await sql`SELECT COUNT(*) FROM admin_users`;
            console.log("admin_users count:", adminUsers[0].count);
        } catch (e) {
            console.log("admin_users table does not exist");
        }

        try {
            const users = await sql`SELECT COUNT(*) FROM users`;
            console.log("users count:", users[0].count);
        } catch (e) {
            console.log("users table does not exist");
        }
    } catch (err) {
        console.error("DB Connection error:", err.message);
    }
}

check();
