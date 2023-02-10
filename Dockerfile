FROM node:18-alpine as builder
WORKDIR /app
COPY --chown=node:node . .
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm build

FROM node:18-alpine
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/.env ./.env

ENV TZ=America/Sao_Paulo
EXPOSE 3000
CMD [ "node", "dist/main.js" ]
