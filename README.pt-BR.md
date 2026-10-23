<sub>[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [한국어](README.ko.md) · [日本語](README.ja.md) · [Español](README.es.md) · **Português (BR)**</sub>

# 🧠 PM Skills: Agent Skills profissionais

> Esta tradução foi preparada com auxílio de máquina. Correções de falantes nativos são bem-vindas via PR; veja como em [CONTRIBUTING.md](CONTRIBUTING.md).

> **Um pedido à sua IA, uma entrega pronta de volta:** o PRD, o informe para stakeholders e a decisão difícil, no padrão de um product manager sênior.

Instale e cole isto no seu assistente:

```text
Aqui estão minhas anotações brutas de seis conversas com clientes: [cole suas notas].
Transforme em um PRD de uma página, um registro de riscos com responsáveis
e um informe para a liderança que eu possa enviar hoje.
```

Seu assistente carrega [user-interview-synthesis](skills/user-interview-synthesis/SKILL.md), [prd-template](skills/prd-template/SKILL.md) e [stakeholder-update](skills/stakeholder-update/SKILL.md) e devolve os três documentos, não conselhos sobre como escrevê-los.

PM Skills é uma biblioteca open source com 1310 Agent Skills: arquivos Markdown (SKILL.md) que ensinam um assistente de IA a executar uma tarefa profissional no nível de alguém sênior, de escrever um PRD a decifrar um contrato de aluguel. Cada skill traz o framework, um template de saída, checagens de qualidade e antipadrões. Licença MIT; funciona com Claude, ChatGPT, Gemini, Cursor e Codex. (PM significa Professional, não só product manager.)

## ⚡ Instalação em 30 segundos

```bash
npx pm-claude-skills add          # qualquer ferramenta: Cursor, Codex, Windsurf…
# No Claude Code:  /plugin → busque "pm-skills" (diretório oficial da Anthropic)
npx pm-claude-skills setup        # guiado: detecta seus agentes, mostra o plano, faz backup
```

Uma skill é só um arquivo Markdown que sua IA lê: instalar copia arquivos de texto e desinstalar os apaga; nada quebra o seu ambiente. Instruções por ferramenta: [docs/installation.md](docs/installation.md)

## 🗺 O que você pode fazer

| Sua tarefa esta semana | Bundle | O que você recebe | O que você traz |
|---|---|---|---|
| Transformar pesquisa em decisão | [pm-discovery](plugins/pm-discovery/) | Roteiros de entrevista, síntese com citações e prevalência | Transcrições ou anotações |
| Escrever o PRD e os informes | [pm-essentials](plugins/pm-essentials/) | PRD, atas, informes a stakeholders, análise competitiva | Um briefing e suas metas |
| Planejar o trimestre | [pm-planning](plugins/pm-planning/) | OKRs, priorização RICE/MoSCoW/Kano, narrativa de roadmap | Backlog e meta da empresa |
| Entregar o sprint e o lançamento | [pm-delivery](plugins/pm-delivery/) | Planos de sprint, specs técnicas, testes A/B, checklists | Histórias, capacidade, datas |
| Ler os números | [pm-data](plugins/pm-data/) | Frameworks de métricas, análise de coorte e churn | Suas métricas ou um CSV |
| Tomar a decisão difícil | [pm-decisions](plugins/pm-decisions/) | Decisões tipadas com probabilidades (ship-or-slip, renew-or-churn) | O estado real da decisão |
| Ler antes de assinar | [pm-decoders](plugins/pm-decoders/) | Aluguéis, contas e contratos decifrados, com as contas feitas | O próprio documento |
| Conseguir o próximo emprego | [pm-jobsearch](plugins/pm-jobsearch/) | Decifrar a vaga, outreach, preparação de entrevista | A vaga e o seu currículo |

Os 153 bundles com comandos de instalação: [docs/catalogue.md](docs/catalogue.md) · todas as skills: [SKILLS.md](SKILLS.md)

## ✅ Confiança e qualidade

- Toda mudança passa pelo CI: estrutura (SkillCheck L3, as 1310 skills), auditoria de segurança, checagem de duplicatas, paridade das traduções e uma bateria de injeção de prompt.
- 389 das 1310 skills têm casos de avaliação; 28 têm notas às cegas publicadas. O que não foi medido é declarado como não medido.
- Skills jurídicas, fiscais e trabalhistas terminam com um aviso claro e indicam qual profissional procurar; não substituem um.
- Privacidade: tudo roda localmente. As skills, a CLI e os exports não enviam nada. Detalhes: [docs/TELEMETRY.md](docs/TELEMETRY.md) · [SECURITY.md](SECURITY.md) · licença: [MIT](LICENSE)

## 🤝 Participe

Adicione uma skill via PR ([o padrão](SKILL-AUTHORING-STANDARD.md), [CONTRIBUTING](CONTRIBUTING.md)), [peça uma](https://github.com/mohitagw15856/pm-claude-skills/issues/new?labels=skill-request&title=Skill:%20) e vote no [tech tree](https://mohitagw15856.github.io/pm-claude-skills/tech-tree/), ou compartilhe um resultado no [Show and Tell](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=show-and-tell.yml).

Projeto: https://github.com/mohitagw15856/pm-claude-skills
