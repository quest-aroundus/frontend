FROM --platform=linux/amd64 node:22-alpine AS build_amd64

ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production

RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk add dumb-init
RUN npm install  -g typescript
RUN npm install -g pnpm

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=32768"
COPY . .
RUN pnpm install
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]