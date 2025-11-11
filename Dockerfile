# ==== BUILD STAGE ====
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files dulu
COPY package*.json ./

# Install dependencies tanpa postinstall Prisma
RUN npm install --ignore-scripts

# Copy seluruh source code (termasuk prisma/)
COPY . .

# Jalankan prisma setelah file schema sudah ada
RUN npx prisma generate
RUN npx prisma migrate deploy || true

# Build NestJS app
RUN npm run build

# ==== RUN STAGE ====
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# Copy only necessary files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main.js"]
