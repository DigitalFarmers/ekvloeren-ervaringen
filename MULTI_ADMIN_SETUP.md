# Multi-Admin Setup Instructies

## Stap 1: Database Migratie

Voer de database migratie uit om de nieuwe admin_users tabel en tracking velden toe te voegen:

```sql
-- Kopieer en plak de inhoud van migrations/001_add_multi_admin_support.sql in je Neon database console
```

## Stap 2: Initiële Admin Gebruikers Aanmaken

### Voor Motouzani:
```sql
INSERT INTO admin_users (username, email, password_hash, full_name)
VALUES ('motouzani', 'motouzani@example.com', '', 'Motouzani')
ON CONFLICT (username) DO NOTHING;
```

### Voor Bowien:
```sql
INSERT INTO admin_users (username, email, password_hash, full_name)
VALUES ('bowien', 'bowien@example.com', '', 'Bowien')
ON CONFLICT (username) DO NOTHING;
```

**Belangrijk:** De wachtwoorden moeten nog worden ingesteld via de applicatie omdat ze gehashed moeten worden.

## Stap 3: Wachtwoorden Instellen

Na deployment, ga naar `/admin/setup` (deze route moet nog worden aangemaakt) om:
1. Voor elke gebruiker een wachtwoord in te stellen
2. De wachtwoorden worden automatisch gehashed met bcrypt

## Stap 4: Oude ADMIN_PASSWORD Environment Variable

De oude `ADMIN_PASSWORD` environment variable kan blijven staan als fallback, maar het nieuwe systeem gebruikt de database voor authenticatie.

## Wat is er veranderd:

### Database
- ✅ Nieuwe `admin_users` tabel met username, email, password hash
- ✅ `created_by_admin_id` en `updated_by_admin_id` op reports tabel
- ✅ `updated_at` timestamp op reports tabel
- ✅ Automatische updated_at trigger

### Code
- ✅ `/lib/actions/admin-users.ts` - Admin user management functies
- ✅ bcrypt voor veilige password hashing
- ✅ Tracking van welke admin wat heeft aangemaakt/aangepast

### UI Updates Nodig
- ⏳ Admin dashboard moet current user tonen
- ⏳ Reports moeten "Aangemaakt door" kolom tonen
- ⏳ Admin setup pagina voor eerste wachtwoord instelling

## Volgende Stappen

1. Run de migration in je Neon database
2. Deploy naar Vercel
3. Voeg `bcryptjs` toe aan dependencies (already done in package.json)
4. Test de nieuwe multi-admin functionaliteit
