import { envelopeSend } from "./envelope-send";
import { retentionPurge } from "./retention-purge";

export const functions = [envelopeSend, retentionPurge];
