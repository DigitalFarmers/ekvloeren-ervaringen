# EK Vloeren Ervaringen

Een website voor het delen van ervaringen en melden van incidenten met EK Vloeren.

## Functies

- **Meldformulier** (`/meld-je`) - Formulier voor het indienen van ervaringen
- **Bestanduploads** - Ondersteuning voor screenshots en PDF's via Vercel Blob
- **Admin Dashboard** (`/admin`) - Beveiligde pagina voor het bekijken en beheren van meldingen
- **E-mail bevestigingen** - Optionele bevestigingsmails via Resend
- **Automatische moderatie** - Detectie van bedreigingen, scheldwoorden en volledige adressen
- **Publieke teller** - Toont aantal goedgekeurde meldingen + aanpasbare correctie

## Vereiste Environment Variables

### Database (Neon / Vercel Postgres)

```
DATABASE_URL=postgresql://...
```

### Vercel Blob Storage

```
BLOB_READ_WRITE_TOKEN=vercel_blob_...
```

### Admin Toegang

```
ADMIN_PASSWORD=jouw_veilige_wachtwoord
```

### E-mail (Optioneel)

```
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@jouwdomein.nl
```

## Database Setup

Voer de SQL-scripts uit in volgorde:

1. `scripts/001-create-tables.sql` - Basis tabellen
2. `scripts/002-update-schema.sql` - Status, moderatie en instellingen

## Tabellen

### `reports`
| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | UUID | Primary key |
| created_at | TIMESTAMP | Aanmaakdatum |
| status | TEXT | pending/approved/rejected/needs_info/duplicate |
| name | TEXT | Naam (optioneel) |
| contact | TEXT | E-mail of telefoonnummer |
| city | TEXT | Woonplaats (optioneel) |
| date_of_incident | TEXT | Datum incident |
| amount | DECIMAL | Betaald bedrag |
| payment_method | TEXT | Betaalmethode |
| description | TEXT | Beschrijving |
| social_profile_url | TEXT | Link naar social media profiel |
| consent | BOOLEAN | Toestemming gegeven |
| link_to_report_id | UUID | Link naar duplicaat (FK) |
| internal_notes | TEXT | Interne notities voor admin |

### `report_files`
| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | UUID | Primary key |
| report_id | UUID | Foreign key naar reports |
| file_name | TEXT | Bestandsnaam |
| file_url | TEXT | URL in Vercel Blob |
| file_size | DECIMAL | Bestandsgrootte |
| file_type | TEXT | MIME type |
| created_at | TIMESTAMP | Uploaddatum |

### `settings`
| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | UUID | Primary key |
| key | TEXT | Instelling sleutel (unique) |
| value | TEXT | Instelling waarde |
| updated_at | TIMESTAMP | Laatst gewijzigd |

## Admin Dashboard

Ga naar `/admin` en log in met het `ADMIN_PASSWORD`. Functies:

- **Filteren** op status en zoeken op contact/plaats
- **Detailweergave** met alle informatie en bijlagen
- **Acties**: Goedkeuren, Afwijzen, Meer info nodig, Markeren als duplicaat, Verwijderen
- **Interne notities** per melding
- **Teller aanpassing** via Instellingen

## Publieke Teller

De teller op de homepage toont:
```
Publieke teller = Aantal goedgekeurde meldingen + Admin aanpassing
```

De aanpassing kan positief of negatief zijn en is instelbaar via de admin.

## Automatische Moderatie

Meldingen worden automatisch gemarkeerd als "needs_info" bij detectie van:
- Bedreigingen of gewelddadige taal
- Scheldwoorden
- Volledige adressen (straat + huisnummer + postcode)
- Losse postcodes (voor privacy-review)

## Technologie

- **Framework**: Next.js 16+ (App Router)
- **Database**: Neon (via @neondatabase/serverless)
- **File Storage**: Vercel Blob
- **Validatie**: Zod
- **E-mail**: Resend
- **Styling**: Tailwind CSS + shadcn/ui
