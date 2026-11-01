# Perguntas frequentes

[English](README.md) · [简体中文](zh-CN.md) · [繁體中文](zh-TW.md) · [日本語](ja.md) · [한국어](ko.md) · [Español](es.md) · Português

## O que é uma skill e qual a diferença de simplesmente perguntar ao modelo?

Uma skill é um arquivo Markdown simples, `SKILL.md`, que ensina um assistente de IA a fazer uma tarefa profissional no nível de alguém experiente. Se você pergunta ao modelo diretamente, ele responde de memória, com estrutura e profundidade diferentes a cada vez. Com uma skill carregada, o modelo segue um procedimento escrito: pede os dados que faltam, produz uma estrutura fixa e revisa o próprio trabalho com uma lista. Os números vêm com o cálculo. A skill não substitui o modelo. Ela dá um método a ele.

## É grátis? Posso usar no trabalho?

Sim. A biblioteca tem licença MIT. Você pode usar comercialmente, modificar e colocar nas ferramentas da sua empresa. O único custo é o que o seu provedor de modelo cobra pelos tokens que você envia.

## Alguma coisa é enviada para algum lugar?

Não. Depois da instalação, as skills são arquivos Markdown no seu computador. Não há runtime, conta nem telemetria por padrão. Suas conversas vão apenas para a ferramenta de IA e o modelo que você escolheu, sob as políticas de privacidade deles. No playground online, sua chave de API fica no navegador e as requisições vão direto ao provedor. O subcomando `run` da linha de comando tem um contador de uso opcional que envia só o nome da skill, e só se você definir `PM_SKILLS_TELEMETRY=1`.

## Com quais ferramentas funciona?

Claude Code, Claude Desktop e Cowork, Claude.ai, Cursor, Codex, Windsurf, Cline, Zed, Gemini CLI e qualquer ferramenta que leia regras em Markdown ou fale MCP. `npx pm-claude-skills add --agent <ferramenta>` grava os arquivos onde cada ferramenta espera. As skills são acionadas pela descrição, então não são todas carregadas em cada conversa.

## Como instalo?

- **Qualquer ferramenta:** `npx pm-claude-skills add` e siga as instruções.
- **Claude Code:** abra `/plugin`, procure pm-skills no diretório oficial e instale os pacotes que quiser.
- **Python:** `pip install pm-skills`
- **MCP:** adicione `npx -y -p pm-claude-skills@latest pm-claude-skills-mcp` à sua configuração MCP.
- **Sem instalar nada:** o [playground](https://mohitagw15856.github.io/pm-claude-skills/) roda qualquer skill no navegador.

## Não programo. Ainda assim posso usar?

Sim. Abra o [playground](https://mohitagw15856.github.io/pm-claude-skills/), escolha uma skill e diga o que precisa com suas palavras. Quem usa Claude.ai pode enviar uma skill como ZIP pelos botões Add-to-Claude. Aplicativos de desktop com suporte a MCP, como o Claude Desktop, permitem adicionar o servidor MCP por uma tela de configurações, sem terminal.

## A skill não é acionada. E agora?

Seja explícito: nomeie a tarefa como a descrição da skill faz, por exemplo "Escreva um PRD para..." em vez de "me ajude com isso". Confira se está instalada com `npx pm-claude-skills doctor`. Se ainda não funcionar, [abra um relato de bug](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml) com a frase exata que você usou.

## Como atualizo?

Rode o comando de instalação de novo. `npx pm-claude-skills doctor` mostra o que está instalado e o que está desatualizado. No Claude Code, abra `/plugin` e atualize o marketplace pm-claude-skills. Em Python, `pip install -U pm-skills`. Se você fez um fork do repositório, o workflow `sync-fork.yml` incluído avança seu `main` toda semana; veja [fork-sync.md](../fork-sync.md).

## Posso confiar nas respostas jurídicas, tributárias e de RH?

Trate como preparação, não como aconselhamento. Essas skills mostram o cálculo, listam os números que você precisa verificar e indicam a quem consultar: um tribunal, a Receita, um advogado. As regras mudam conforme o lugar e com frequência. Um monitor semanal avisa sobre mudanças nas fontes oficiais por trás das skills regulamentadas, mas a regra local mais recente sempre prevalece.

## Posso usar dentro da minha empresa, com skills privadas?

Sim. A Org Edition roda como contêiner, `docker run -p 8080:8080 ghcr.io/mohitagw15856/pm-skills`, e você monta suas skills privadas ao lado das públicas. Mantenha as skills privadas em uma pasta ou repositório próprio para que sua cópia desta biblioteca continue atualizável.

## Como peço uma skill, relato um bug ou contribuo?

Use os formulários de issue: [pedido de skill](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.yml), [relato de bug](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml) ou [pergunta](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=question-feedback.yml). Para adicionar uma skill, leia [CONTRIBUTING.md](../../CONTRIBUTING.md) e abra um pull request. Os pedidos com mais 👍 são construídos primeiro.
