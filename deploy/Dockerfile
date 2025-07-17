FROM --platform=linux/amd64 node:22-alpine AS build_amd64

ENV NEXT_TELEMETRY_DISABLED=1 NODE_ENV=production

RUN apk update && apk upgrade && apk add --no-cache libc6-compat && apk add dumb-init
RUN npm install  -g typescript
RUN npm install -g pnpm

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=32768"

# ARG로 빌드 시점에 환경변수 받기
ARG NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN}
ARG NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

# ENV로 설정하여 빌드 시점에 사용 가능하도록 설정
ENV NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

COPY . .
RUN pnpm install
RUN NEXT_PUBLIC_MAPBOX_TOKEN=${NEXT_PUBLIC_MAPBOX_TOKEN} NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL} pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]