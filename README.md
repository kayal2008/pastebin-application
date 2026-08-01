# PasteBin - Modern Code & Text Sharing Platform

A full-stack, production-ready PasteBin web application engineered with React 19, TypeScript, Express.js, MongoDB with Mongoose, Prism.js syntax highlighting, JWT authentication, and Docker multi-container deployment.

---

## 🚀 Key Features

- **JWT Authentication**: User registration, login, protected routes, and Bcrypt password hashing.
- **Snippet Creation & Editing**: Create and edit code or text pastes with title, description, language selection, visibility, password encryption, and custom expiration timers.
- **Syntax Highlighting**: Supports TypeScript, JavaScript, Python, Java, C++, C#, Go, Rust, SQL, JSON, YAML, Bash, HTML, CSS, Markdown, PHP, Ruby, and Plain Text.
- **Privacy Controls**:
  - `Public`: Searchable in community explore feed.
  - `Unlisted`: Accessible only via unique direct link or QR code.
  - `Private`: Restricted strictly to author profile.
  - `Password Protected`: Password verification required for unlocking.
- **Interactive Dashboard**: Real-time stats KPI cards, top languages breakdown, view counts, and recent paste activity.
- **Developer Documentation**: Integrated Swagger OpenAPI 3.0 documentation frame at `/api/docs` and interactive Mermaid architecture diagram.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Lucide Icons
- **Backend**: Node.js + Express.js + Mongoose ORM + Zod Validation + Helmet + CORS
- **Database**: MongoDB (with fallback in-memory database engine for instant sandbox execution)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt Password Hashing
- **DevOps**: Dockerfile, Docker Compose, and Cloud Run production bundling via esbuild CJS bundle

---

## 🏃 Getting Started Locally

```bash
# 1. Clone repo & install dependencies
npm install

# 2. Run dev server (Express API + Vite Middleware on Port 3000)
npm run dev

# 3. Production build
npm run build

# 4. Start production container
npm start
```

---

## 🐳 Docker Deployment

```bash
# Spin up MongoDB and App containers
docker-compose up --build -d
```

Access application at `http://localhost:3000` and API docs at `http://localhost:3000/api/docs`.
