import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso da plataforma Canetaço.",
};

export default function TermosPage() {
  return (
    <article className="prose prose-zinc mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Termos de Uso</h1>
      <p className="text-sm text-zinc-500">
        Última atualização: em breve · Versão: 0.1 (rascunho)
      </p>

      <h2>1. Aceite</h2>
      <p>
        Ao usar a Canetaço você concorda com estes termos. Se você está assinando um
        documento via Canetaço, seu aceite a estes termos junto com a Política de
        Privacidade constitui manifestação de vontade e expressão do seu consentimento ao
        método de assinatura eletrônica, nos termos da Medida Provisória 2.200-2/2001, §2º.
      </p>

      <h2>2. Validade jurídica</h2>
      <p>
        Os documentos assinados via Canetaço têm validade jurídica entre as partes que
        aceitarem o método, conforme a MP 2.200-2/2001 e Lei 14.063/2020.
      </p>

      <h2>3. Retenção de documentos</h2>
      <p>
        Documentos assinados ficam disponíveis para download por 30 dias após a conclusão da
        assinatura. Após esse período, são excluídos automaticamente do nosso servidor, a
        menos que a organização contrate o add-on Cofre Canetaço para armazenamento
        estendido. Trilha de auditoria e hashes são preservados além desse prazo por
        cumprimento de obrigação legal.
      </p>

      <p className="mt-12 rounded-md bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
        Esta página é um rascunho inicial. A versão final será revisada por advogado
        especializado antes do lançamento.
      </p>
    </article>
  );
}
