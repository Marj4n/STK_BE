# ==== BUILD STAGE ====
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
COPY . .

# Hanya generate Prisma Client (tidak migrate)
RUN npx prisma generate

RUN npm run build

# ==== RUN STAGE ====
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Prisma migrate dijalankan saat container start (DATABASE_URL sudah tersedia)
CMD npx prisma migrate deploy && node dist/main.js
