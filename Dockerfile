# Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copy package.json & lock file
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build

# Expose backend port
EXPOSE 3000

# Default command (production)
CMD ["node", "dist/main.js"]
