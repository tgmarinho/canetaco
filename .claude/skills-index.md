# Skills Index — família gstack

Resumo das skills disponíveis em `.claude/skills/`, agrupadas por categoria.

## 🧠 Planejamento & Revisão

- **plan-ceo-review** — Revisão modo CEO/founder: expande escopo, busca o produto "10 estrelas", desafia premissas.
- **plan-eng-review** — Revisão modo eng manager: trava arquitetura, fluxo de dados, edge cases, testes.
- **plan-design-review** — Olho de designer para o plano: nota 0-10 por dimensão e mostra como chegar a 10.
- **plan-devex-review** — Auditoria de DX em plano (APIs, CLIs, SDKs, docs) — personas, benchmarks, fricção.
- **plan-tune** — Auto-ajuste da sensibilidade de perguntas e perfil psicográfico do dev.
- **autoplan** — Pipeline que roda CEO + design + eng + DX em sequência com auto-decisões.
- **office-hours** — YC Office Hours: 6 perguntas forçantes ou brainstorming de design thinking.

## 🎨 Design & UI

- **design-consultation** — Cria `DESIGN.md` (tipografia, cor, layout, motion) — fonte da verdade visual.
- **design-shotgun** — Gera múltiplas variantes de design para comparar.
- **design-html** — Finaliza design em HTML/CSS production-ready (Pretext).
- **design-review** — QA visual em site live: inconsistência, hierarquia, "AI slop" — e corrige.

## 🚀 Ship / Deploy

- **ship** — Workflow completo: testes → VERSION → CHANGELOG → commit → push → PR.
- **land-and-deploy** — Merge do PR, espera CI/deploy, verifica produção.
- **landing-report** — Dashboard read-only da fila de PRs e slots de VERSION.
- **setup-deploy** — Configuração de deploy.
- **canary** — Monitora app live pós-deploy (erros de console, performance, regressões).

## 🔍 QA & Debug

- **qa** — Testa app + corrige bugs iterativamente, commits atômicos, re-verifica.
- **qa-only** — Mesmo QA, mas só reporta (não corrige).
- **investigate** — Debug sistemático em 4 fases (Iron Law: sem fix sem root cause).
- **review** — Revisão pré-merge de PR (SQL safety, LLM trust, side effects).
- **health** — Dashboard de qualidade (lint, types, dead code) com score 0-10 e tendências.
- **retro** — Retrospectiva semanal de engenharia.

## 🌐 Browser / Scraping

- **browse / gstack** — Browser headless rápido para QA e dogfooding (~100ms/comando).
- **open-gstack-browser** — Chromium visível com sidebar extension.
- **connect-chrome** — Conecta ao Chrome.
- **scrape** — Extrai dados de páginas; primeira chamada prototipa, depois codifica.
- **skillify** — Codifica último `/scrape` bem-sucedido em browser-skill permanente.
- **setup-browser-cookies** — Importa cookies do seu Chromium real para sessão headless.
- **pair-agent** — Pareia agente remoto com seu browser via setup key.

## 🔐 Segurança & Safety

- **cso** — Auditoria security (OWASP, STRIDE, supply chain, LLM/AI security).
- **careful** — Avisa antes de comandos destrutivos (`rm -rf`, `DROP TABLE`, force-push).
- **freeze / unfreeze** — Restringe edits a um diretório específico.
- **guard** — Combina `careful` + `freeze` (safety máxima).

## 📚 Documentação

- **document-release** — Sincroniza docs pós-ship (Diataxis, CHANGELOG, README).
- **document-generate** — Gera docs do zero (tutorial/how-to/reference/explanation).
- **make-pdf** — Markdown → PDF publication-quality (margens, page breaks, cover).

## 🤖 IA & Modelos

- **codex** — Wrapper do OpenAI Codex CLI: review, challenge, consult (segunda opinião).
- **benchmark-models** — Compara Claude vs GPT vs Gemini lado a lado (latência, custo, qualidade).
- **benchmark** — Performance de páginas (Core Web Vitals, bundle size, regressões).

## 🧰 Infra / Contexto

- **context-save / context-restore** — Salva/restaura estado de trabalho entre sessões/workspaces.
- **learn** — Gerencia aprendizados do projeto (review, busca, prune, export).
- **setup-gbrain / sync-gbrain** — Setup e sincronização do gbrain (índice de código).
- **devex-review** — Auditoria de DX em site live (TTHW, onboarding, CLI help).
- **gstack-upgrade** — Atualiza o gstack para a versão mais recente.
