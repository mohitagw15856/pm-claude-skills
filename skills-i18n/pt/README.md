# Português (pt) — traduções em português

**Status: estrutura inicial.** Os textos das skills ainda não foram traduzidos. O índice de pacotes abaixo foi **redigido por máquina e precisa de revisão por um falante nativo** antes de ser usado — veja *Como contribuir*.

Por que português: Brasil e Portugal somam um público enorme que se encaixa exatamente nos pacotes mais humanos da biblioteca — `pm-newcomer`, `pm-hardship`, `pm-caregiving`, `pm-family`. Comece pelos **pacotes**, não pelas 1.170+ skills.

## Pacotes de skills — índice (rascunho)

| Pacote | Em uma linha |
|---|---|
| 🍼 Pais de primeira viagem | A logística que ninguém explica — papelada, creche ou ficar em casa, sono |
| 💼 Acabei de ser demitido | As duas primeiras semanas, na ordem certa — entender a rescisão, estabilizar o dinheiro, depois a busca |
| 🌍 Novo no país | Construir uma vida do zero — os primeiros passos, crédito, reconhecimento de diplomas |
| 👵 Cuidando de um pai ou mãe | Quando você passa a ser o responsável — consultas, equipe de cuidado, esgotamento |
| 🕊️ Perdendo alguém | A papelada e o lado humano — quem avisar, o discurso de despedida, o primeiro ano |
| 💸 Dinheiro em crise | Estancar a sangria — qual conta pagar primeiro, o que dizer a cobradores, seus direitos |
| 🔑 Recomeçando | Os primeiros 90 dias após a prisão — antecedentes, trabalho, moradia, reaproximar-se da família |
| 🤖 Levando a IA a sério | Usar bem a IA — biblioteca de prompts, delegar, detectar erros |

> ⚠️ Estas skills são informação educativa — não são aconselhamento jurídico, médico ou financeiro. As regras variam por país e região; confirme as suas.

## Como contribuir (procuramos falantes nativos)
1. Escolha uma skill de um pacote acima. Copie `skills/<nome>/SKILL.md` para `skills-i18n/pt/<nome>/SKILL.md` (mesma convenção de pasta por skill que `es/`).
2. Traduza **o sentido, não as palavras** — mantenha a estrutura, o modelo de saída, as verificações de qualidade e o aviso de "não é aconselhamento". Português claro e cotidiano; indique `pt-BR` ou `pt-PT` no PR se fizer diferença.
3. Não altere `name:` (é o identificador); traduza `description:`.
4. Rode `node scripts/skillcheck.mjs` e `node tests/i18n-parity.mjs` e abra um PR com o título `i18n(pt): <skill>`.

Skills de alto risco (dinheiro, jurídico, saúde) devem passar por um **revisor da área** que leia português antes de serem marcadas como concluídas — veja `docs/EXPERT-REVIEW-PROGRAM.md`.
