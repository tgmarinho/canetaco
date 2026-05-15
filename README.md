# Canetaço

> SaaS brasileiro de assinatura eletrônica de documentos com notificação por email e WhatsApp.

**Domínio:** [canetaco.com.br](https://canetaco.com.br) (em construção)

## Visão

Plataforma de assinatura eletrônica com validade jurídica no Brasil, inspirada no modelo da Autentique (sem KYC obrigatório, validade via robustez de evidências), com WhatsApp nativo desde o dia 1 como diferencial.

Concorrentes diretos: ZapSign, Clicksign, D4Sign, Autentique.

## Base legal

- **MP 2.200-2/2001 §2º** — validade da assinatura eletrônica entre as partes que aceitam o método
- **Lei 14.063/2020** — níveis de assinatura (simples, avançada, qualificada)
- **LGPD (Lei 13.709/2018)** — proteção de dados pessoais

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend + Backend | Next.js 16 (App Router) + TypeScript |
| Hospedagem | Vercel |
| Banco | Supabase Postgres |
| Auth | Supabase Auth |
| ORM | Drizzle |
| Filas | Inngest |
| Storage | Supabase Storage |
| Email | AWS SES |
| WhatsApp | Meta Cloud API |
| PDF | pdf-lib + react-pdf |
| Timestamp | freeTSA (MVP) / Serpro (v2) |
| Observabilidade | Sentry + Axiom |
| Pagamentos | Stripe BR |

## Setup

### Pré-requisitos

- Node.js 22+
- pnpm 10+
- Conta Supabase + projeto criado
- Conta AWS (SES verificado para canetaco.com.br)
- App WhatsApp Business no Meta for Developers
- Conta Inngest
- Conta Stripe BR

### Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha:

```bash
cp .env.example .env.local
```

### Instalação

```bash
pnpm install
```

### Banco de dados

```bash
# Gerar SQL de migration a partir do schema
pnpm db:generate

# Aplicar no banco
pnpm db:migrate

# Abrir Drizzle Studio
pnpm db:studio
```

### Desenvolvimento

```bash
pnpm dev
```

Abre em [http://localhost:3000](http://localhost:3000).

Para rodar o Inngest dev server em paralelo:

```bash
npx inngest-cli@latest dev
```

## Estrutura

```
app/
  (marketing)/          → landing, pricing, páginas legais (privacidade, termos, dpo)
  (app)/dashboard/      → área logada da organização
  (sign)/s/[token]/     → fluxo público de assinatura
  api/
    inngest/            → handler Inngest
    webhooks/
      whatsapp/         → callbacks Meta Cloud API
      stripe/           → callbacks de billing
  actions/              → server actions
lib/
  db/                   → Drizzle schema + client
  supabase/             → clientes Supabase (client, server, middleware)
  pdf/                  → carimbo de assinatura, hash, PAdES
  crypto/               → criptografia AES-256 de PII em repouso
  audit/                → gravador de eventos imutáveis
  notifications/        → email (SES) + WhatsApp (Meta)
  legal/                → versionamento de termos e políticas
  utils/                → helpers (cn, hash, etc)
inngest/
  client.ts             → Inngest client
  functions/            → jobs duráveis (envelope.send, retention.purge, etc)
drizzle/                → migrations geradas
```

## Roadmap

Plano completo em `~/.claude/plans/melhor-nome-entao-seria-radiant-mango.md`. Resumo:

- **Fase 0** — Fundação (scaffolding, CI/CD, páginas legais)
- **Fase 1** — Auth + multi-tenancy + Stripe billing
- **Fase 2** — Documentos + fluxo de assinatura núcleo
- **Fase 3** — WhatsApp OTP + SMS OTP + validação CPF + LGPD compliance
- **Fase 4** — WhatsApp completo (templates HSM, fallback automático)
- **Fase 5** — API pública, white-label, mobile (PWA)
- **v2** — KYC Caf, ICP-Brasil qualificada, Pix como prova de identidade

## Modelo comercial

- **Starter** — R$49/mês · 50 envelopes · trial 14 dias
- **Pro** — R$149/mês · 200 envelopes · API + webhooks
- **Enterprise** — sob consulta · ilimitado · SSO + DPA

**Cofre Canetaço** (storage estendido além dos 30 dias grátis):
- 1 ano — R$0,50/doc
- 5 anos — R$2,00/doc
- 10 anos — R$3,50/doc

## Licença

Proprietário · © Canetaço
