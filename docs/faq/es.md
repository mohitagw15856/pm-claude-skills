# Preguntas frecuentes

[English](README.md) · [简体中文](zh-CN.md) · [繁體中文](zh-TW.md) · [日本語](ja.md) · [한국어](ko.md) · Español · [Português](pt-BR.md)

## ¿Qué es una skill y en qué se diferencia de preguntarle al modelo directamente?

Una skill es un archivo Markdown sencillo, `SKILL.md`, que enseña a un asistente de IA a hacer una tarea profesional al nivel de alguien con experiencia. Si preguntas al modelo directamente, responde de memoria, con una estructura y una profundidad distintas cada vez. Con una skill cargada, el modelo sigue un procedimiento escrito: pide los datos que le faltan, produce una estructura fija y revisa su propio trabajo con una lista. Los números van con su cálculo. La skill no sustituye al modelo. Le da un método.

## ¿Es gratis? ¿Puedo usarla en el trabajo?

Sí. La biblioteca tiene licencia MIT. Puedes usarla con fines comerciales, modificarla y meterla en las herramientas de tu empresa. El único coste es lo que cobre tu proveedor de modelos por los tokens que envíes.

## ¿Se sube algo a algún sitio?

No. Tras la instalación, las skills son archivos Markdown en tu ordenador. No hay runtime, ni cuenta, ni telemetría por defecto. Tus conversaciones solo van a la herramienta de IA y al modelo que elegiste, bajo sus políticas de privacidad. En el playground en línea, tu clave de API se queda en tu navegador y las peticiones van directas al proveedor. El subcomando `run` de la línea de comandos tiene un contador de uso opcional que envía solo el nombre de la skill, y solo si defines `PM_SKILLS_TELEMETRY=1`.

## ¿Con qué herramientas funciona?

Claude Code, Claude Desktop y Cowork, Claude.ai, Cursor, Codex, Windsurf, Cline, Zed, Gemini CLI y cualquier herramienta que lea reglas en Markdown o hable MCP. `npx pm-claude-skills add --agent <herramienta>` escribe los archivos donde cada herramienta los espera. Las skills se activan por su descripción, así que no se cargan todas en cada conversación.

## ¿Cómo lo instalo?

- **Cualquier herramienta:** `npx pm-claude-skills add` y sigue las indicaciones.
- **Claude Code:** abre `/plugin`, busca pm-skills en el directorio oficial e instala los paquetes que quieras.
- **Python:** `pip install pm-skills`
- **MCP:** añade `npx -y -p pm-claude-skills@latest pm-claude-skills-mcp` a tu configuración MCP.
- **Sin instalar nada:** el [playground](https://mohitagw15856.github.io/pm-claude-skills/) ejecuta cualquier skill en tu navegador.

## No programo. ¿Puedo usarlo igual?

Sí. Abre el [playground](https://mohitagw15856.github.io/pm-claude-skills/), elige una skill y di lo que necesitas con tus palabras. Quienes usan Claude.ai pueden subir una skill como ZIP desde los botones Add-to-Claude. Las aplicaciones de escritorio con soporte MCP, como Claude Desktop, permiten añadir el servidor MCP desde una pantalla de ajustes, sin terminal.

## La skill no se activa. ¿Qué hago?

Sé explícito: nombra la tarea como lo hace la descripción de la skill, por ejemplo "Escribe un PRD para..." en lugar de "ayúdame con esto". Comprueba que está instalada con `npx pm-claude-skills doctor`. Si sigue sin activarse, [abre un informe de error](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml) con la frase exacta que usaste.

## ¿Cómo actualizo?

Ejecuta de nuevo el comando de instalación. `npx pm-claude-skills doctor` muestra qué está instalado y qué está desactualizado. En Claude Code, abre `/plugin` y actualiza el marketplace pm-claude-skills. En Python, `pip install -U pm-skills`. Si hiciste un fork del repositorio, el workflow `sync-fork.yml` incluido adelanta tu `main` cada semana; mira [fork-sync.md](../fork-sync.md).

## ¿Puedo confiar en las respuestas legales, fiscales y de RR. HH.?

Trátalas como preparación, no como asesoramiento. Estas skills muestran su cálculo, listan las cifras que debes verificar y nombran a quién consultar: un tribunal, la agencia tributaria, un abogado. Las normas cambian según el lugar y a menudo. Un vigilante semanal avisa de cambios en las fuentes oficiales detrás de las skills reguladas, pero la norma local más reciente siempre manda.

## ¿Puedo usarlo dentro de mi empresa, con skills privadas?

Sí. La Org Edition corre como contenedor, `docker run -p 8080:8080 ghcr.io/mohitagw15856/pm-skills`, y montas tus skills privadas junto a las públicas. Mantén las skills privadas en su propia carpeta o repositorio para que tu copia de esta biblioteca siga siendo actualizable.

## ¿Cómo pido una skill, informo de un error o contribuyo?

Usa los formularios de issues: [petición de skill](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=skill-request.yml), [informe de error](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=bug-report.yml) o [pregunta](https://github.com/mohitagw15856/pm-claude-skills/issues/new?template=question-feedback.yml). Para añadir una skill, lee [CONTRIBUTING.md](../../CONTRIBUTING.md) y abre un pull request. Las peticiones con más 👍 se construyen primero.
