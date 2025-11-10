FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & lock file
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy everything else
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build NestJS
RUN npm run build

# Expose port
EXPOSE 3000

# Default command (production)
CMD ["node", "dist/main.js"]
