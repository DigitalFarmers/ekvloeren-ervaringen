/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    DATABASE_URL: 'postgresql://neondb_owner:npg_CRlU5J8ipvyT@ep-wispy-lab-ageuxc3j-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ADMIN_PASSWORD: 'EKVLOEREN2026!!',
    RESEND_API_KEY: 'your_resend_api_key_here',
    RESEND_FROM_EMAIL: 'mo@digitalfarmers.be',
    BLOB_READ_WRITE_TOKEN: 'vercel_blob_npg_CRlU5J8ipvyT',
  },
}

export default nextConfig