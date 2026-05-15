"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { waitlist } from "@/lib/db/schema";

const schema = z.object({
  email: z.string().email("Email inválido"),
  name: z.string().min(2).max(200).optional(),
  company: z.string().max(200).optional(),
  source: z.string().max(80).optional(),
});

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };

export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    name: formData.get("name") ?? undefined,
    company: formData.get("company") ?? undefined,
    source: formData.get("source") ?? "landing",
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" };
  }

  try {
    await db.insert(waitlist).values(parsed.data).onConflictDoNothing();
    return { ok: true };
  } catch (err) {
    console.error("waitlist insert failed", err);
    return { ok: false, error: "Não foi possível salvar agora. Tente novamente." };
  }
}
