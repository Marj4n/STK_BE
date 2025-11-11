# ==== BUILD STAGE ====
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files dulu
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy seluruh source code (termasuk prisma/)
COPY . .

# Generate Prisma client
RUN npx prisma generate

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
