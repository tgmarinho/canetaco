import { inngest } from "../client";

export const retentionPurge = inngest.createFunction(
  { id: "retention-purge", retries: 3 },
  { event: "retention.purge" },
  async ({ event, step }) => {
    const { envelopeId } = event.data;

    // TODO: verificar se envelope está no Cofre (cofreTier !== "none")
    // TODO: se não estiver, deletar PDF assinado do Supabase Storage
    // TODO: marcar envelope como purged (mantendo hashes + audit log)

    await step.run("placeholder", async () => {
      return { envelopeId, status: "purged" };
    });
  },
);
