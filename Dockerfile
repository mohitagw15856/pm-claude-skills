# The Org Edition as a container: your company's skill library in one command.
#   docker run -p 8080:8080 ghcr.io/mohitagw15856/pm-skills
# Private skills: mount them —
#   docker run -p 8080:8080 -v ./my-skills:/app/org/private-skills ghcr.io/mohitagw15856/pm-skills
FROM node:20-alpine
WORKDIR /app
COPY org/ ./org/
COPY web/ ./web/
COPY skills/ ./skills/
COPY workflows.json package.json ./
EXPOSE 8080
USER node
CMD ["node", "org/server.mjs", "--port", "8080"]
