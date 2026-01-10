"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { adminLogout } from "@/lib/actions/admin-auth"
import { LogOut } from "lucide-react"

export function AdminLogout() {
  const router = useRouter()

  const handleLogout = async () => {
    await adminLogout()
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout} className="bg-transparent">
      <LogOut className="mr-2 h-4 w-4" />
      Uitloggen
    </Button>
  )
}
