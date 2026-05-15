import Link from "next/link";
import { WaitlistForm } from "./_components/waitlist-form";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
              ✍️
            </span>
            <span className="text-lg">Canetaço</span>
          </Link>
          <nav className="hidden gap-6 text-sm text-zinc-600 dark:text-zinc-400 sm:flex">
            <Link href="#como-funciona" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Como funciona
            </Link>
            <Link href="#precos" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Preços
            </Link>
            <Link href="/dpo" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Privacidade
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:ring-emerald-900">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Beta privado · entre na lista
            </span>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-6xl">
              Assinatura eletrônica que vai e volta pelo <span className="text-emerald-600 dark:text-emerald-400">WhatsApp</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Envie documentos para assinar, receba de volta com validade jurídica, e notifique
              quem precisa assinar por email <strong>e</strong> WhatsApp. Feito no Brasil, em
              conformidade com a MP 2.200-2/2001, Lei 14.063/2020 e LGPD.
            </p>
            <div className="mt-10 max-w-md">
              <WaitlistForm />
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              Sem spam. Avisamos quando abrir o cadastro.
            </p>
          </div>
        </section>

        <section id="como-funciona" className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold tracking-tight">Como funciona</h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {[
                { n: "1", t: "Suba o documento", d: "PDF, define quem assina, em que ordem, e quais fatores de autenticação aplicar (selfie, WhatsApp OTP, CPF)." },
                { n: "2", t: "A gente notifica", d: "Email + WhatsApp com link único. Lembretes automáticos. Janela de 24h do WhatsApp gerenciada por nós." },
                { n: "3", t: "Documento assinado + trilha", d: "PDF carimbado, hash registrado, trilha de auditoria imutável, pronto para apresentar em juízo." },
              ].map((s) => (
                <div key={s.n} className="rounded-2xl bg-white dark:bg-zinc-950 p-6 ring-1 ring-zinc-200 dark:ring-zinc-800">
                  <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Passo {s.n}</div>
                  <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="precos" className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <h2 className="text-3xl font-semibold tracking-tight">Preços diretos, sem pegadinha</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Trial de 14 dias. WhatsApp incluído em todos os planos. Storage grátis por 30 dias depois da assinatura.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {[
                { name: "Starter", price: "R$ 49", period: "/mês", limit: "50 envelopes/mês", feats: ["Email + WhatsApp", "Trilha de auditoria", "Selfie + foto do RG", "Suporte por email"] },
                { name: "Pro", price: "R$ 149", period: "/mês", highlight: true, limit: "200 envelopes/mês", feats: ["Tudo do Starter", "API pública + webhooks", "White-label opcional", "Suporte prioritário"] },
                { name: "Enterprise", price: "Sob consulta", period: "", limit: "Ilimitado", feats: ["SSO + DPA", "ICP-Brasil opcional", "Volume customizado", "SLA dedicado"] },
              ].map((p) => (
                <div
                  key={p.name}
                  className={`rounded-2xl p-6 ring-1 ${p.highlight ? "bg-emerald-50 ring-emerald-300 dark:bg-emerald-950/40 dark:ring-emerald-800" : "bg-white dark:bg-zinc-950 ring-zinc-200 dark:ring-zinc-800"}`}
                >
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold tracking-tight">{p.price}</span>
                    <span className="text-zinc-500">{p.period}</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{p.limit}</p>
                  <ul className="mt-6 space-y-2 text-sm">
                    {p.feats.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Canetaço · Feito no Brasil</div>
          <div className="flex gap-4">
            <Link href="/termos" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Termos
            </Link>
            <Link href="/privacidade" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Privacidade
            </Link>
            <Link href="/dpo" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              Encarregado (DPO)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
