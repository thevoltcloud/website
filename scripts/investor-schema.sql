-- Investor data-room access: magic-link auth + allowlist + audit log.
-- Apply once against the Postgres database (Vercel Postgres / Neon):
--   psql "$POSTGRES_URL" -f scripts/investor-schema.sql
-- Safe to re-run (IF NOT EXISTS / idempotent).

-- Approved/known investors. An email must reach status='approved' before any
-- magic link is issued. status flow: pending -> approved -> revoked.
CREATE TABLE IF NOT EXISTS investors (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  name        TEXT,
  firm        TEXT,
  status      TEXT NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending', 'approved', 'revoked')),
  is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
  notes       TEXT,
  approved_by TEXT,
  approved_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS investors_email_idx ON investors (lower(email));

-- Single-use, short-lived magic-link tokens. We store only a hash of the token;
-- the raw token lives only in the emailed URL.
CREATE TABLE IF NOT EXISTS magic_tokens (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL,
  token_hash  TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ,
  ip          TEXT,
  ua          TEXT
);
CREATE INDEX IF NOT EXISTS magic_tokens_email_idx ON magic_tokens (email);

-- Active browser sessions. The cookie carries a session id + HMAC signature;
-- the authoritative state (revoked? expired?) lives here so we can kill access.
CREATE TABLE IF NOT EXISTS sessions (
  id            BIGSERIAL PRIMARY KEY,
  email         TEXT NOT NULL,
  session_hash  TEXT NOT NULL UNIQUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at    TIMESTAMPTZ NOT NULL,
  revoked_at    TIMESTAMPTZ,
  ip            TEXT,
  ua            TEXT
);
CREATE INDEX IF NOT EXISTS sessions_email_idx ON sessions (email);

-- Append-only audit trail. One row per meaningful event so you can reconstruct
-- exactly who looked at what, from where, and when.
CREATE TABLE IF NOT EXISTS access_log (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT,
  event       TEXT NOT NULL,  -- request | link_sent | verified | denied | page_view | download | approved | revoked | logout
  doc_key     TEXT,           -- for download events
  ip          TEXT,
  ua          TEXT,
  referer     TEXT,
  geo_country TEXT,
  geo_city    TEXT,
  meta        JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS access_log_email_idx ON access_log (email);
CREATE INDEX IF NOT EXISTS access_log_created_idx ON access_log (created_at DESC);
