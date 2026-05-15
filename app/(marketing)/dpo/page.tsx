import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Encarregado de Dados (DPO)",
  description: "Contato do Encarregado pelo tratamento de dados pessoais do Canetaço.",
};

export default function DPOPage() {
  return (
    <article className="prose prose-zinc mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Encarregado de Dados Pessoais</h1>
      <p>
        Em cumprimento à Lei Geral de Proteção de Dados (Lei 13.709/2018), o Canetaço
        designa um Encarregado (Data Protection Officer — DPO) responsável por receber
        solicitações dos titulares de dados e mediar a comunicação com a Autoridade
        Nacional de Proteção de Dados (ANPD).
      </p>

      <h2>Contato</h2>
      <p>
        Email: <a href="mailto:dpo@canetaco.com.br">dpo@canetaco.com.br</a>
      </p>

      <h2>Direitos do titular</h2>
      <p>Você pode solicitar a qualquer momento:</p>
      <ul>
        <li>Confirmação da existência de tratamento</li>
        <li>Acesso aos dados</li>
        <li>Correção de dados incompletos, inexatos ou desatualizados</li>
        <li>Anonimização, bloqueio ou eliminação de dados</li>
        <li>Portabilidade dos dados</li>
        <li>Eliminação de dados tratados com base em consentimento</li>
        <li>Informações sobre compartilhamento</li>
        <li>Revogação do consentimento</li>
      </ul>
    </article>
  );
}
