import type { Metadata } from "next"
import { getAdminSession } from "@/lib/actions/admin-auth"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Admin | EK Vloeren Ervaringen",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!(await getAdminSession())) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
