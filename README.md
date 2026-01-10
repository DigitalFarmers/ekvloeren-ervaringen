# EK Vloeren Ervaringen

Een website voor het delen van ervaringen en melden van incidenten met EK Vloeren.

## Functies

- **Meldformulier** (`/meld-je`) - Formulier voor het indienen van ervaringen
- **Bestanduploads** - Ondersteuning voor screenshots en PDF's via Vercel Blob
- **Admin Dashboard** (`/admin`) - Beveiligde pagina voor het bekijken van meldingen
- **E-mail bevestigingen** - Optionele bevestigingsmails via Resend

## Vereiste Environment Variables

De volgende environment variables moeten worden ingesteld:

### Database (Vercel Postgres / Neon)

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

Voer het SQL-script uit om de benodigde tabellen aan te maken:

```bash
# Via de v0 interface: klik op "Run" bij scripts/001-create-tables.sql
```

Of handmatig in je database:

```sql
-- Zie scripts/001-create-tables.sql voor de volledige SQL
```

## Tabellen

### `reports`
| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | UUID | Primary key |
| created_at | TIMESTAMP | Aanmaakdatum |
| name | TEXT | Naam (optioneel) |
| contact | TEXT | E-mail of telefoonnummer |
| city | TEXT | Woonplaats (optioneel) |
| date_of_incident | TEXT | Datum incident |
| amount | DECIMAL | Betaald bedrag |
| payment_method | TEXT | Betaalmethode |
| description | TEXT | Beschrijving |
| consent | BOOLEAN | Toestemming gegeven |

### `report_files`
| Kolom | Type | Beschrijving |
|-------|------|--------------|
| id | UUID | Primary key |
| created_at | TIMESTAMP | Uploaddatum |
| report_id | UUID | Foreign key naar reports |
| file_name | TEXT | Bestandsnaam |
| file_url | TEXT | URL in Vercel Blob |
| file_size | DECIMAL | Bestandsgrootte |
| file_type | TEXT | MIME type |

## Gebruik

### Melding Indienen
1. Ga naar `/meld-je`
2. Vul het formulier in
3. Upload optioneel bewijsmateriaal
4. Verstuur de melding

### Admin Dashboard
1. Ga naar `/admin`
2. Voer het admin wachtwoord in (zie `ADMIN_PASSWORD`)
3. Bekijk alle meldingen met bijlagen

## Technologie

- **Framework**: Next.js 14+ (App Router)
- **Database**: Neon (Vercel Postgres compatible)
- **ORM**: Drizzle ORM
- **File Storage**: Vercel Blob
- **Validatie**: Zod
- **E-mail**: Resend
- **Styling**: Tailwind CSS + shadcn/ui
