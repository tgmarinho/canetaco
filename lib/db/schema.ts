import {
  pgTable,
  text,
  varchar,
  timestamp,
  uuid,
  jsonb,
  integer,
  boolean,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

// =============================================================================
// Enums
// =============================================================================

export const orgPlan = pgEnum("org_plan", ["starter", "pro", "enterprise"]);
export const orgRole = pgEnum("org_role", ["owner", "admin", "member"]);

export const envelopeStatus = pgEnum("envelope_status", [
  "draft",
  "sent",
  "in_progress",
  "completed",
  "cancelled",
  "expired",
]);

export const signatoryStatus = pgEnum("signatory_status", [
  "pending",
  "viewed",
  "signed",
  "declined",
  "expired",
]);

export const signatureLevel = pgEnum("signature_level", [
  "simple",
  "reinforced",
  "advanced",
  "qualified",
]);

export const authFactor = pgEnum("auth_factor", [
  "email",
  "whatsapp_otp",
  "sms_otp",
  "cpf_receita",
  "selfie",
  "in_person_validation",
  "kyc_provider",
  "pix",
]);

export const notificationChannel = pgEnum("notification_channel", [
  "email",
  "whatsapp",
  "sms",
]);

export const notificationStatus = pgEnum("notification_status", [
  "queued",
  "sending",
  "delivered",
  "failed",
  "bounced",
]);

export const cofreTier = pgEnum("cofre_tier", ["none", "1y", "5y", "10y"]);

// =============================================================================
// Tenant: organizações e usuários
// =============================================================================

export const organizations = pgTable("organizations", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  legalName: varchar("legal_name", { length: 200 }),
  cnpj: varchar("cnpj", { length: 14 }),
  slug: varchar("slug", { length: 80 }).notNull().unique(),
  plan: orgPlan("plan").notNull().default("starter"),
  stripeCustomerId: text("stripe_customer_id"),
  brandColor: varchar("brand_color", { length: 7 }),
  logoUrl: text("logo_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    fullName: varchar("full_name", { length: 200 }),
    avatarUrl: text("avatar_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)],
);

export const orgMembers = pgTable(
  "org_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: orgRole("role").notNull().default("member"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("org_members_org_user_idx").on(t.orgId, t.userId),
    index("org_members_user_idx").on(t.userId),
  ],
);

// =============================================================================
// Documentos e envelopes
// =============================================================================

export const documents = pgTable(
  "documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 300 }).notNull(),
    storagePath: text("storage_path").notNull(),
    hashOriginal: varchar("hash_original", { length: 64 }).notNull(),
    sizeBytes: integer("size_bytes").notNull(),
    pageCount: integer("page_count"),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("documents_org_idx").on(t.orgId)],
);

export const envelopes = pgTable(
  "envelopes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 300 }).notNull(),
    message: text("message"),
    status: envelopeStatus("status").notNull().default("draft"),
    requiredLevel: signatureLevel("required_level").notNull().default("reinforced"),
    requiredFactors: jsonb("required_factors").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    orderedSigning: boolean("ordered_signing").notNull().default(false),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    purgeAt: timestamp("purge_at", { withTimezone: true }),
    cofreTier: cofreTier("cofre_tier").notNull().default("none"),
    signedDocumentPath: text("signed_document_path"),
    signedHash: varchar("signed_hash", { length: 64 }),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("envelopes_org_idx").on(t.orgId),
    index("envelopes_status_idx").on(t.status),
    index("envelopes_purge_idx").on(t.purgeAt),
  ],
);

export const envelopeDocuments = pgTable(
  "envelope_documents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    envelopeId: uuid("envelope_id")
      .notNull()
      .references(() => envelopes.id, { onDelete: "cascade" }),
    documentId: uuid("document_id")
      .notNull()
      .references(() => documents.id, { onDelete: "restrict" }),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [uniqueIndex("envelope_documents_idx").on(t.envelopeId, t.documentId)],
);

export const signatories = pgTable(
  "signatories",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    envelopeId: uuid("envelope_id")
      .notNull()
      .references(() => envelopes.id, { onDelete: "cascade" }),
    fullName: varchar("full_name", { length: 200 }).notNull(),
    cpf: varchar("cpf", { length: 11 }),
    email: varchar("email", { length: 320 }).notNull(),
    whatsapp: varchar("whatsapp", { length: 20 }),
    role: varchar("role", { length: 80 }).notNull().default("party"),
    sortOrder: integer("sort_order").notNull().default(0),
    status: signatoryStatus("status").notNull().default("pending"),
    accessTokenHash: varchar("access_token_hash", { length: 64 }).notNull(),
    inPersonValidation: jsonb("in_person_validation").$type<{
      validatedBy: string;
      validatedAt: string;
      idDocumentPath?: string;
      declaration?: string;
    } | null>(),
    signedAt: timestamp("signed_at", { withTimezone: true }),
    declinedAt: timestamp("declined_at", { withTimezone: true }),
    declineReason: text("decline_reason"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("signatories_envelope_idx").on(t.envelopeId),
    index("signatories_status_idx").on(t.status),
    uniqueIndex("signatories_token_idx").on(t.accessTokenHash),
  ],
);

// =============================================================================
// Evidências de assinatura e trilha de auditoria
// =============================================================================

export const signatureEvents = pgTable(
  "signature_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    envelopeId: uuid("envelope_id")
      .notNull()
      .references(() => envelopes.id, { onDelete: "cascade" }),
    signatoryId: uuid("signatory_id").references(() => signatories.id, { onDelete: "set null" }),
    eventType: varchar("event_type", { length: 40 }).notNull(),
    ipAddress: varchar("ip_address", { length: 45 }),
    geoLocation: jsonb("geo_location").$type<{
      country?: string;
      region?: string;
      city?: string;
      lat?: number;
      lon?: number;
    } | null>(),
    userAgent: text("user_agent"),
    timestampNtp: timestamp("timestamp_ntp", { withTimezone: true }).notNull().defaultNow(),
    timestampToken: text("timestamp_token"),
    selfieHash: varchar("selfie_hash", { length: 64 }),
    selfieStoragePath: text("selfie_storage_path"),
    payload: jsonb("payload").$type<Record<string, unknown>>(),
    eventHash: varchar("event_hash", { length: 64 }).notNull(),
    previousEventHash: varchar("previous_event_hash", { length: 64 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("signature_events_envelope_idx").on(t.envelopeId),
    index("signature_events_signatory_idx").on(t.signatoryId),
    index("signature_events_type_idx").on(t.eventType),
  ],
);

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orgId: uuid("org_id").references(() => organizations.id, { onDelete: "set null" }),
    actorUserId: uuid("actor_user_id").references(() => users.id, { onDelete: "set null" }),
    actorType: varchar("actor_type", { length: 40 }).notNull(),
    action: varchar("action", { length: 80 }).notNull(),
    resourceType: varchar("resource_type", { length: 40 }).notNull(),
    resourceId: uuid("resource_id"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    ipAddress: varchar("ip_address", { length: 45 }),
    userAgent: text("user_agent"),
    eventHash: varchar("event_hash", { length: 64 }).notNull(),
    previousEventHash: varchar("previous_event_hash", { length: 64 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("audit_logs_org_idx").on(t.orgId),
    index("audit_logs_resource_idx").on(t.resourceType, t.resourceId),
    index("audit_logs_created_idx").on(t.createdAt),
  ],
);

// =============================================================================
// Consentimento (LGPD)
// =============================================================================

export const consents = pgTable(
  "consents",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    subjectEmail: varchar("subject_email", { length: 320 }).notNull(),
    subjectCpf: varchar("subject_cpf", { length: 11 }),
    purpose: varchar("purpose", { length: 100 }).notNull(),
    termsVersion: varchar("terms_version", { length: 20 }).notNull(),
    privacyVersion: varchar("privacy_version", { length: 20 }).notNull(),
    biometricConsent: boolean("biometric_consent").notNull().default(false),
    legalBasis: varchar("legal_basis", { length: 60 }).notNull(),
    ipAddress: varchar("ip_address", { length: 45 }).notNull(),
    userAgent: text("user_agent"),
    acceptedAt: timestamp("accepted_at", { withTimezone: true }).notNull().defaultNow(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (t) => [index("consents_subject_idx").on(t.subjectEmail)],
);

// =============================================================================
// Notificações (driven by Inngest)
// =============================================================================

export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    envelopeId: uuid("envelope_id").references(() => envelopes.id, { onDelete: "cascade" }),
    signatoryId: uuid("signatory_id").references(() => signatories.id, { onDelete: "cascade" }),
    channel: notificationChannel("channel").notNull(),
    templateKey: varchar("template_key", { length: 80 }).notNull(),
    recipientAddress: varchar("recipient_address", { length: 320 }).notNull(),
    status: notificationStatus("status").notNull().default("queued"),
    attempts: integer("attempts").notNull().default(0),
    providerMessageId: text("provider_message_id"),
    inngestRunId: text("inngest_run_id"),
    errorMessage: text("error_message"),
    sentAt: timestamp("sent_at", { withTimezone: true }),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("notifications_envelope_idx").on(t.envelopeId),
    index("notifications_status_idx").on(t.status),
  ],
);

// =============================================================================
// API keys e webhooks dos clientes
// =============================================================================

export const apiKeys = pgTable(
  "api_keys",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 80 }).notNull(),
    keyPrefix: varchar("key_prefix", { length: 12 }).notNull(),
    keyHash: varchar("key_hash", { length: 64 }).notNull(),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdBy: uuid("created_by").references(() => users.id),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("api_keys_org_idx").on(t.orgId),
    uniqueIndex("api_keys_hash_idx").on(t.keyHash),
  ],
);

export const webhookEndpoints = pgTable(
  "webhook_endpoints",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orgId: uuid("org_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    url: text("url").notNull(),
    secret: varchar("secret", { length: 64 }).notNull(),
    events: jsonb("events").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    active: boolean("active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("webhook_endpoints_org_idx").on(t.orgId)],
);

// =============================================================================
// Billing (Stripe)
// =============================================================================

export const billingSubscriptions = pgTable("billing_subscriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  orgId: uuid("org_id")
    .notNull()
    .references(() => organizations.id, { onDelete: "cascade" })
    .unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  status: varchar("status", { length: 40 }).notNull(),
  plan: orgPlan("plan").notNull(),
  currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
  trialEnd: timestamp("trial_end", { withTimezone: true }),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// =============================================================================
// Lista de espera (pré-lançamento)
// =============================================================================

export const waitlist = pgTable(
  "waitlist",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).notNull().unique(),
    name: varchar("name", { length: 200 }),
    company: varchar("company", { length: 200 }),
    source: varchar("source", { length: 80 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("waitlist_email_idx").on(t.email)],
);

// =============================================================================
// Relations
// =============================================================================

export const organizationsRelations = relations(organizations, ({ many, one }) => ({
  members: many(orgMembers),
  documents: many(documents),
  envelopes: many(envelopes),
  subscription: one(billingSubscriptions),
}));

export const envelopesRelations = relations(envelopes, ({ one, many }) => ({
  organization: one(organizations, {
    fields: [envelopes.orgId],
    references: [organizations.id],
  }),
  signatories: many(signatories),
  events: many(signatureEvents),
  documents: many(envelopeDocuments),
}));

export const signatoriesRelations = relations(signatories, ({ one, many }) => ({
  envelope: one(envelopes, {
    fields: [signatories.envelopeId],
    references: [envelopes.id],
  }),
  events: many(signatureEvents),
}));
