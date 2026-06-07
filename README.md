# Canetaço

> A Brazilian e-signature SaaS for legally valid document signing, with email and WhatsApp delivery.

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white)
![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?logo=drizzle&logoColor=black)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?logo=stripe&logoColor=white)

**Domain:** [canetaco.com.br](https://canetaco.com.br) (under construction)

## Vision

An e-signature platform with legal validity in Brazil. It is inspired by Autentique's model: no mandatory KYC, validity through strong evidence. The differentiator is native WhatsApp from day one.

Direct competitors: ZapSign, Clicksign, D4Sign, Autentique.

## Legal basis

The Brazilian law references are kept verbatim. Each one has a short English gloss.

- **MP 2.200-2/2001 §2º**: an electronic signature is valid between parties that accept the method.
- **Lei 14.063/2020**: defines the signature levels, simple, advanced, and qualified.
- **LGPD (Lei 13.709/2018)**: the Brazilian data protection law.

## Stack

| Layer | Technology |
|---|---|
| Frontend + Backend | Next.js 16 (App Router) + TypeScript |
| Hosting | Vercel |
| Database | Supabase Postgres |
| Auth | Supabase Auth |
| ORM | Drizzle |
| Queues | Inngest |
| Storage | Supabase Storage |
| Email | AWS SES |
| WhatsApp | Meta Cloud API |
| PDF | pdf-lib + react-pdf |
| Timestamp | freeTSA (MVP) / Serpro (v2) |
| Observability | Sentry + Axiom |
| Payments | Stripe BR |

## Setup

### Prerequisites

- Node.js 22+
- pnpm 10+
- A Supabase account with a project created
- An AWS account (SES verified for canetaco.com.br)
- A WhatsApp Business app on Meta for Developers
- An Inngest account
- A Stripe BR account

### Environment variables

Copy `.env.example` to `.env.local` and fill it in:

```bash
cp .env.example .env.local
```

### Install

```bash
pnpm install
```

### Database

```bash
# Generate the migration SQL from the schema
pnpm db:generate

# Apply it to the database
pnpm db:migrate

# Open Drizzle Studio
pnpm db:studio
```

### Development

```bash
pnpm dev
```

It opens at [http://localhost:3000](http://localhost:3000).

To run the Inngest dev server in parallel:

```bash
npx inngest-cli@latest dev
```

## Structure

```
app/
  (marketing)/          → landing, pricing, legal pages (privacy, terms, dpo)
  (app)/dashboard/      → logged-in organization area
  (sign)/s/[token]/     → public signing flow
  api/
    inngest/            → Inngest handler
    webhooks/
      whatsapp/         → Meta Cloud API callbacks
      stripe/           → billing callbacks
  actions/              → server actions
lib/
  db/                   → Drizzle schema + client
  supabase/             → Supabase clients (client, server, middleware)
  pdf/                  → signature stamp, hash, PAdES
  crypto/               → AES-256 encryption of PII at rest
  audit/                → immutable event recorder
  notifications/        → email (SES) + WhatsApp (Meta)
  legal/                → versioning of terms and policies
  utils/                → helpers (cn, hash, etc)
inngest/
  client.ts             → Inngest client
  functions/            → durable jobs (envelope.send, retention.purge, etc)
drizzle/                → generated migrations
```

## Roadmap

The full plan lives in `~/.claude/plans/melhor-nome-entao-seria-radiant-mango.md`. Summary:

- **Phase 0**: Foundation (scaffolding, CI/CD, legal pages)
- **Phase 1**: Auth + multi-tenancy + Stripe billing
- **Phase 2**: Documents + core signing flow
- **Phase 3**: WhatsApp OTP + SMS OTP + CPF validation + LGPD compliance
- **Phase 4**: Full WhatsApp (HSM templates, automatic fallback)
- **Phase 5**: Public API, white-label, mobile (PWA)
- **v2**: Caf KYC, ICP-Brasil qualified signature, Pix as proof of identity

## Commercial model

- **Starter**: R$49/month · 50 envelopes · 14-day trial
- **Pro**: R$149/month · 200 envelopes · API + webhooks
- **Enterprise**: on request · unlimited · SSO + DPA

**Cofre Canetaço** (extended storage beyond the free 30 days):
- 1 year: R$0.50/doc
- 5 years: R$2.00/doc
- 10 years: R$3.50/doc

## License

Proprietary · © Canetaço
