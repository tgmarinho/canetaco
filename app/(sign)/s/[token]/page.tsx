import { notFound } from "next/navigation";

export default async function SignPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!token) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Assinar documento</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Token recebido: <code className="rounded bg-zinc-100 px-2 py-0.5 dark:bg-zinc-900">{token}</code>
      </p>
      <p className="mt-6 text-sm text-zinc-500">
        Fluxo de assinatura em construção — disponível na Fase 2 do roadmap.
      </p>
    </div>
  );
}
