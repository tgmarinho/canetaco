import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Canetaço trata seus dados pessoais conforme a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <article className="prose prose-zinc mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Política de Privacidade</h1>
      <p className="text-sm text-zinc-500">
        Última atualização: em breve · Versão: 0.1 (rascunho)
      </p>

      <h2>1. Quem somos</h2>
      <p>
        Canetaço é um serviço de assinatura eletrônica de documentos com validade jurídica
        no Brasil. Esta política descreve como tratamos seus dados pessoais de acordo com a
        Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018).
      </p>

      <h2>2. Encarregado de Dados (DPO)</h2>
      <p>
        Você pode entrar em contato com nosso Encarregado pelo email{" "}
        <a href="mailto:dpo@canetaco.com.br">dpo@canetaco.com.br</a>.
      </p>

      <h2>3. Quais dados tratamos e por quê</h2>
      <ul>
        <li>
          <strong>Dados cadastrais</strong> (nome, email, CPF, CNPJ) — execução de contrato.
        </li>
        <li>
          <strong>Documentos enviados para assinatura</strong> — execução de contrato; ficam
          armazenados por 30 dias após conclusão da assinatura (ou pelo período contratado
          via Cofre Canetaço).
        </li>
        <li>
          <strong>Selfie no momento da assinatura</strong> — consentimento explícito;
          criptografada em repouso (AES-256).
        </li>
        <li>
          <strong>Trilha de auditoria</strong> (IP, geolocalização, user-agent, timestamp) —
          cumprimento de obrigação legal e exercício regular de direito em processo.
        </li>
      </ul>

      <h2>4. Seus direitos como titular</h2>
      <p>
        Você pode solicitar acesso, correção, anonimização ou exclusão dos seus dados a
        qualquer momento através de <a href="mailto:dpo@canetaco.com.br">dpo@canetaco.com.br</a>.
      </p>

      <p className="mt-12 rounded-md bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-200">
        Esta página é um rascunho inicial. A versão final será revisada por advogado
        especializado em LGPD antes do lançamento.
      </p>
    </article>
  );
}
