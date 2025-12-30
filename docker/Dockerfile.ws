FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./tsconfig.json ./tsconfig.json
COPY ./package.json ./package.json

COPY ./apps/ws ./apps/ws

RUN pnpm install
RUN pnpm build

EXPOSE 4000
EXPOSE 5000

CMD ["pnpm", "start"]