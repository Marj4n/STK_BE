# 🍱 Menu Management API (NestJS + Prisma + MySQL)

A RESTful API for managing hierarchical menu structures (parent-child menus) built with **NestJS** and **Prisma ORM**.

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Copy the example environment file and update it with your own database credentials:

```bash
cp .env.example .env
```

Then open `.env` and edit:

```env
DATABASE_URL="mysql://username:password@localhost:3306/your_database"
PORT=3000
```

### 3. Run Prisma migration

```bash
npx prisma migrate dev --name init
```

---

## 🚀 Run the app

### Development mode

```bash
npm run start:dev
```

### Production mode

```bash
npm run build
npm run start:prod
```

### Testing

```bash
npm run test
```

---

## 📚 API Docs

Swagger UI available at:  
👉 [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧩 Tech Stack

- **NestJS** — Framework for scalable server-side apps
- **Prisma ORM** — Database ORM for MySQL
- **Swagger** — API documentation
- **Jest** — Unit testing

## 🐳 Docker Setup

You can also run the backend using Docker and Docker Compose.

### 1. Create a Dockerfile

`backend/Dockerfile`:

```Dockerfile
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

```

### 2. Update `.env` for Docker

If using Docker Compose with MySQL container, point the `DATABASE_URL` to the MySQL service::

```env
DATABASE_URL="mysql://admin:admin123@mysql:3306/menu_db"
PORT=3000
```

### 3. Docker Compose example

```yaml
version: '3.9'

services:
  mysql:
    image: mysql:8.0
    container_name: menu-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root123
      MYSQL_DATABASE: menu_db
      MYSQL_USER: admin
      MYSQL_PASSWORD: admin123
    ports:
      - '3306:3306'
    volumes:
      - mysql-data:/var/lib/mysql
    healthcheck:
      test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost']
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: .
    container_name: menu-backend
    ports:
      - '3000:3000'
    env_file:
      - .env
    depends_on:
      mysql:
        condition: service_healthy
    # Use volumes for development only; comment out in production
    volumes:
      - .:/app # source code
      - /app/node_modules # keep container node_modules
      - /app/dist # keep container build output
    command: >
      sh -c "npm install && npx prisma generate && npm run start:dev"

volumes:
  mysql-data:
```

### 4. Run with Docker Compose

```bash
docker-compose up --build
```

- Backend API will be available at `http://localhost:3000/api`.
- MySQL database will be exposed at port 3306.

### 5. Stop containers

```bash
docker-compose down
```
