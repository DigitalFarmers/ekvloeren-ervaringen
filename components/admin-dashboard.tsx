"use client"

import React from "react"

import { useState, useEffect, useTransition } from "react"
import type { Report, ReportFile, ReportStatus } from "@/lib/db"
import { AdminLogout } from "@/components/admin-logout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  getReports,
  updateReportStatus,
  updateReportNotes,
  deleteReport,
  getApprovedCount,
  getCounterAdjustment,
  setCounterAdjustment,
  createManualReport,
} from "@/lib/actions/submit-report"
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Euro,
  CreditCard,
  Paperclip,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Copy,
  Trash2,
  ExternalLink,
  Settings,
  Loader2,
  Plus,
  BarChart,
  KeyRound,
} from "lucide-react"
import Link from "next/link"
import { updateAdminPassword } from "@/lib/actions/admin-users"
import { toast } from "sonner"
import { getAdminSession } from "@/lib/actions/admin-auth"

interface ReportWithFiles extends Report {
  files: ReportFile[]
  created_by_name?: string
  updated_by_name?: string
}

const statusConfig: Record<ReportStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: {
    label: "In behandeling",
    color: "bg-yellow-100 text-yellow-800",
    icon: <AlertCircle className="h-3 w-3" />,
  },
  approved: { label: "Goedgekeurd", color: "bg-green-100 text-green-800", icon: <CheckCircle className="h-3 w-3" /> },
  rejected: { label: "Afgewezen", color: "bg-red-100 text-red-800", icon: <XCircle className="h-3 w-3" /> },
  needs_info: {
    label: "Meer info nodig",
    color: "bg-orange-100 text-orange-800",
    icon: <AlertCircle className="h-3 w-3" />,
  },
  duplicate: { label: "Duplicaat", color: "bg-gray-100 text-gray-800", icon: <Copy className="h-3 w-3" /> },
}

export function AdminDashboard() {
  const [reports, setReports] = useState<ReportWithFiles[]>([])
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedReport, setSelectedReport] = useState<ReportWithFiles | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false)
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [adminUser, setAdminUser] = useState<any>(null)
  const [duplicateLinkId, setDuplicateLinkId] = useState("")
  const [approvedCount, setApprovedCount] = useState(0)
  const [counterAdjustment, setCounterAdjustmentState] = useState(0)
  const [internalNotes, setInternalNotes] = useState("")
  const [isPending, startTransition] = useTransition()

  const loadData = async () => {
    const [reportsData, approved, adjustment, session] = await Promise.all([
      getReports(statusFilter, searchQuery),
      getApprovedCount(),
      getCounterAdjustment(),
      getAdminSession(),
    ])
    setReports(reportsData)
    setApprovedCount(approved)
    setCounterAdjustmentState(adjustment)
    setAdminUser(session)
  }

  useEffect(() => {
    loadData()
  }, [statusFilter, searchQuery])

  const handleStatusChange = async (reportId: string, newStatus: ReportStatus, linkId?: string) => {
    startTransition(async () => {
      await updateReportStatus(reportId, newStatus, linkId)
      await loadData()
      setSelectedReport(null)
      setShowDuplicateDialog(false)
    })
  }

  const handleNotesUpdate = async (reportId: string) => {
    startTransition(async () => {
      await updateReportNotes(reportId, internalNotes)
      await loadData()
    })
  }

  const handleDelete = async (reportId: string) => {
    startTransition(async () => {
      await deleteReport(reportId)
      await loadData()
      setSelectedReport(null)
      setShowDeleteDialog(false)
    })
  }

  const handleSaveAdjustment = async () => {
    startTransition(async () => {
      await setCounterAdjustment(counterAdjustment)
      setShowSettingsDialog(false)
    })
  }

  const handleCreateReport = async (formData: FormData) => {
    const data = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      city: formData.get("city") as string,
      amount: formData.get("amount") as string,
      dateOfIncident: formData.get("dateOfIncident") as string,
      description: formData.get("description") as string,
      defectCategory: formData.get("defectCategory") as string,
      status: "approved" as ReportStatus, // Default to approved for manual entry
    }

    startTransition(async () => {
      await createManualReport(data)
      await loadData()
      setShowCreateDialog(false)
    })
  }

  const handlePasswordChange = async () => {
    if (!adminUser?.id || !newPassword) return

    startTransition(async () => {
      const result = await updateAdminPassword(adminUser.id, newPassword)
      if (result.success) {
        toast.success(result.message)
        setShowPasswordDialog(false)
        setNewPassword("")
      } else {
        toast.error(result.message)
      }
    })
  }

  const publicCounter = approvedCount + counterAdjustment

  return (
    <main className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              {reports.length} meldingen | Publieke teller: {publicCounter}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/analyse">
                <BarChart className="mr-2 h-4 w-4" />
                Statistieken
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowPasswordDialog(true)}>
              <KeyRound className="mr-2 h-4 w-4" />
              Wachtwoord
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSettingsDialog(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Instellingen
            </Button>
            <Button size="sm" onClick={() => setShowCreateDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nieuwe melding
            </Button>
            <AdminLogout />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Zoeken op contact of plaats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as ReportStatus | "all")}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter op status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle statussen</SelectItem>
              <SelectItem value="pending">In behandeling</SelectItem>
              <SelectItem value="approved">Goedgekeurd</SelectItem>
              <SelectItem value="rejected">Afgewezen</SelectItem>
              <SelectItem value="needs_info">Meer info nodig</SelectItem>
              <SelectItem value="duplicate">Duplicaat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {reports.length === 0 ? (
          <div className="rounded-lg border border-border bg-card p-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-lg font-medium text-foreground">Geen meldingen</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Er zijn geen meldingen die aan de huidige filters voldoen.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="cursor-pointer rounded-lg border border-border bg-card p-6 transition-colors hover:bg-accent/50"
                onClick={() => {
                  setSelectedReport(report)
                  setInternalNotes(report.internal_notes || "")
                }}
              >
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-foreground">{report.name || "Anoniem"}</h2>
                      <Badge className={statusConfig[report.status].color}>
                        {statusConfig[report.status].icon}
                        <span className="ml-1">{statusConfig[report.status].label}</span>
                      </Badge>
                    </div>
                    <p className="mt-1 font-mono text-xs text-muted-foreground">
                      {report.id}
                      {report.created_by_name && (
                        <span className="ml-2 rounded bg-emerald-50 dark:bg-emerald-900/30 px-1 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Gemaakt door: {report.created_by_name}
                        </span>
                      )}
                      {report.updated_by_name && report.updated_by_name !== report.created_by_name && (
                        <span className="ml-2 rounded bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                          Bewerkt door: {report.updated_by_name}
                        </span>
                      )}
                    </p>
                  </div>
                  <time className="text-sm text-muted-foreground">
                    {new Date(report.created_at).toLocaleDateString("nl-NL", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>

                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    {report.contact.includes("@") ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                    <span className="text-foreground">{report.contact}</span>
                  </div>
                  {report.city && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="text-foreground">{report.city}</span>
                    </div>
                  )}
                  {report.amount && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Euro className="h-4 w-4" />
                      <span className="text-foreground">€{Number(report.amount).toFixed(2)}</span>
                    </div>
                  )}
                  {report.files.length > 0 && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Paperclip className="h-4 w-4" />
                      <span className="text-foreground">{report.files.length} bijlage(n)</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Detail Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={(open) => !open && setSelectedReport(null)}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {selectedReport.name || "Anoniem"}
                  <Badge className={statusConfig[selectedReport.status].color}>
                    {statusConfig[selectedReport.status].label}
                  </Badge>
                </DialogTitle>
                <DialogDescription className="flex items-center gap-2 font-mono text-xs flex-wrap">
                  {selectedReport.id}
                  {selectedReport.created_by_name && (
                    <span className="rounded bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      Gemaakt door: {selectedReport.created_by_name}
                    </span>
                  )}
                  {selectedReport.updated_by_name && (
                    <span className="rounded bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Laatst bijgewerkt: {selectedReport.updated_by_name}
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Contact Info */}
                <div className="grid gap-3 text-sm sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    {selectedReport.contact.includes("@") ? (
                      <Mail className="h-4 w-4" />
                    ) : (
                      <Phone className="h-4 w-4" />
                    )}
                    <span>{selectedReport.contact}</span>
                  </div>
                  {selectedReport.city && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedReport.city}</span>
                    </div>
                  )}
                  {selectedReport.date_of_incident && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{selectedReport.date_of_incident}</span>
                    </div>
                  )}
                  {selectedReport.amount && (
                    <div className="flex items-center gap-2">
                      <Euro className="h-4 w-4" />
                      <span>€{Number(selectedReport.amount).toFixed(2)}</span>
                    </div>
                  )}
                  {selectedReport.payment_method && (
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      <span className="capitalize">{selectedReport.payment_method}</span>
                    </div>
                  )}
                  {selectedReport.social_profile_url && (
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      <a
                        href={selectedReport.social_profile_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Social profiel
                      </a>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="mb-2 text-sm font-medium">Beschrijving</h4>
                  <div className="rounded-md bg-muted p-4">
                    <p className="whitespace-pre-wrap text-sm">{selectedReport.description}</p>
                  </div>
                </div>

                {/* Files */}
                {selectedReport.files.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Bijlagen</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedReport.files.map((file) => (
                        <a
                          key={file.id}
                          href={file.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-md bg-muted px-3 py-2 text-sm hover:bg-muted/80"
                        >
                          <FileText className="h-4 w-4" />
                          {file.file_name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Linked Report */}
                {selectedReport.link_to_report_id && (
                  <div className="rounded-md bg-muted p-3">
                    <p className="text-sm">
                      Gemarkeerd als duplicaat van:{" "}
                      <span className="font-mono">{selectedReport.link_to_report_id}</span>
                    </p>
                  </div>
                )}

                {/* Internal Notes */}
                <div>
                  <h4 className="mb-2 text-sm font-medium">Interne notities</h4>
                  <Textarea
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Notities voor intern gebruik..."
                    rows={3}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 bg-transparent"
                    onClick={() => handleNotesUpdate(selectedReport.id)}
                    disabled={isPending}
                  >
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Notities opslaan
                  </Button>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 border-t pt-4">
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(selectedReport.id, "approved")}
                    disabled={isPending || selectedReport.status === "approved"}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Goedkeuren
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(selectedReport.id, "rejected")}
                    disabled={isPending || selectedReport.status === "rejected"}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Afwijzen
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStatusChange(selectedReport.id, "needs_info")}
                    disabled={isPending || selectedReport.status === "needs_info"}
                  >
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Meer info
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowDuplicateDialog(true)} disabled={isPending}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicaat
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog(true)}
                    disabled={isPending}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Verwijderen
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Melding verwijderen</DialogTitle>
            <DialogDescription>
              Weet je zeker dat je deze melding wilt verwijderen? Dit kan niet ongedaan worden gemaakt.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Annuleren
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedReport && handleDelete(selectedReport.id)}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Verwijderen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Duplicate Dialog */}
      <Dialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Markeren als duplicaat</DialogTitle>
            <DialogDescription>
              Voer het ID in van de originele melding waar dit een duplicaat van is.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Bijv. 123e4567-e89b-12d3-a456-426614174000"
            value={duplicateLinkId}
            onChange={(e) => setDuplicateLinkId(e.target.value)}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDuplicateDialog(false)}>
              Annuleren
            </Button>
            <Button
              onClick={() => selectedReport && handleStatusChange(selectedReport.id, "duplicate", duplicateLinkId)}
              disabled={isPending || !duplicateLinkId}
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Markeren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Teller instellingen</DialogTitle>
            <DialogDescription>
              Pas de publieke teller aan. De teller toont: goedgekeurde meldingen + aanpassing.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Goedgekeurde meldingen: {approvedCount}</p>
              <p className="text-sm text-muted-foreground">Huidige aanpassing: {counterAdjustment}</p>
              <p className="text-sm font-medium">Publieke teller: {publicCounter}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Aanpassing</label>
              <Input
                type="number"
                value={counterAdjustment}
                onChange={(e) => setCounterAdjustmentState(Number.parseInt(e.target.value) || 0)}
                className="mt-1"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Positief getal verhoogt de teller, negatief getal verlaagt deze.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
              Annuleren
            </Button>
            <Button onClick={handleSaveAdjustment} disabled={isPending}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Opslaan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Create Manual Report Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nieuwe melding aanmaken</DialogTitle>
            <DialogDescription>
              Voer handmatig een melding in die via andere kanalen is binnengekomen.
            </DialogDescription>
          </DialogHeader>
          <form action={handleCreateReport} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Naam</label>
                <Input name="name" placeholder="Naam slachtoffer" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact (Email/Tel)</label>
                <Input name="contact" placeholder="Email of telefoon" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Stad/Gemeente</label>
                <Input name="city" placeholder="Plaats" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Datum van incident</label>
                <Input name="dateOfIncident" type="date" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bedrag (€)</label>
                <Input name="amount" type="number" step="0.01" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type gebrek</label>
                <Select name="defectCategory" required defaultValue="anders">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kies gebrek..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scheuren">Scheuren</SelectItem>
                    <SelectItem value="loslaten">Loslaten</SelectItem>
                    <SelectItem value="verkleuring">Verkleuring</SelectItem>
                    <SelectItem value="vocht">Vocht</SelectItem>
                    <SelectItem value="oneffenheden">Oneffenheden</SelectItem>
                    <SelectItem value="communicatie">Communicatie</SelectItem>
                    <SelectItem value="anders">Anders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Beschrijving</label>
              <Textarea name="description" placeholder="Wat is er gebeurd?" rows={3} />
            </div>

            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setShowCreateDialog(false)}>
                Annuleren
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                Aanmaken & Goedkeuren
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Wachtwoord wijzigen</DialogTitle>
            <DialogDescription>
              Stel een nieuw wachtwoord in voor jouw account ({adminUser?.username}).
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nieuw wachtwoord</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Annuleren
            </Button>
            <Button onClick={handlePasswordChange} disabled={isPending || !newPassword}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Wachtwoord bijwerken
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main >
  )
}
