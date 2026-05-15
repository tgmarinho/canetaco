import { inngest } from "../client";

export const envelopeSend = inngest.createFunction(
  { id: "envelope-send", retries: 3 },
  { event: "envelope.send" },
  async ({ event, step }) => {
    const { envelopeId } = event.data;

    // TODO: carregar envelope + signatários do DB
    // TODO: para cada signatário, agendar notification.deliver (email + whatsapp)
    // TODO: agendar envelope.remind em D+1, D+3, D+7
    // TODO: agendar envelope.expired no expiresAt

    await step.run("placeholder", async () => {
      return { envelopeId, status: "queued" };
    });
  },
);
