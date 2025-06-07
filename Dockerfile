FROM node:20-alpine AS deps
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
ARG PUBLIC_API_HOST_URL
ENV PUBLIC_API_HOST_URL=$PUBLIC_API_HOST_URL
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "build"]
