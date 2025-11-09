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
