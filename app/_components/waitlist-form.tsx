"use client";

import { useState, useTransition } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";

export function WaitlistForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          const res = await joinWaitlist(formData);
          if (res.ok) setStatus({ ok: true, msg: "Pronto! Você entrou na lista." });
          else setStatus({ ok: false, msg: res.error });
        });
      }}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        name="email"
        required
        placeholder="seu@email.com.br"
        disabled={pending}
        className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {pending ? "Enviando..." : "Entrar na lista"}
      </button>
      {status && (
        <p
          className={`text-sm sm:absolute sm:translate-y-12 ${status.ok ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}
          role="status"
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
