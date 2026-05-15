import { Inngest, EventSchemas } from "inngest";

type Events = {
  "envelope.created": {
    data: { envelopeId: string; orgId: string };
  };
  "envelope.send": {
    data: { envelopeId: string };
  };
  "envelope.remind": {
    data: { envelopeId: string; signatoryId: string; attempt: number };
  };
  "envelope.completed": {
    data: { envelopeId: string };
  };
  "envelope.expired": {
    data: { envelopeId: string };
  };
  "notification.deliver": {
    data: {
      notificationId: string;
      channel: "email" | "whatsapp" | "sms";
    };
  };
  "retention.notify": {
    data: { envelopeId: string; daysUntilPurge: number };
  };
  "retention.purge": {
    data: { envelopeId: string };
  };
  "webhook.dispatch": {
    data: { orgId: string; eventType: string; payload: unknown };
  };
};

export const inngest = new Inngest({
  id: "canetaco",
  schemas: new EventSchemas().fromRecord<Events>(),
});
