# PasteBin - Code & Text Sharing Platform

A full-stack PasteBin platform for creating, sharing, and managing code and text snippets with authentication, privacy controls, syntax highlighting, and Docker-based deployment.

---

## 🚀 Key Features

- **JWT Authentication**: User registration, login, protected routes, and secure password hashing with Bcrypt.
- **Snippet Creation & Editing**: Create and edit code or text pastes with titles, descriptions, language selection, visibility settings, password protection, and custom expiration timers.
- **Syntax Highlighting**: Supports TypeScript, JavaScript, Python, Java, C++, C#, Go, Rust, SQL, JSON, YAML, Bash, HTML, CSS, Markdown, PHP, Ruby, and Plain Text.
- **Privacy Controls**:
  - `Public`: Searchable through the community explore feed.
  - `Unlisted`: Accessible through a unique direct link or QR code.
  - `Private`: Restricted to the author.
  - `Password Protected`: Requires password verification before access.
- **Interactive Dashboard**: View statistics, popular programming languages, paste view counts, and recent paste activity.
- **API Documentation**: Integrated Swagger OpenAPI 3.0 documentation available through `/api/docs`.
- **Architecture Documentation**: Includes an interactive Mermaid architecture diagram.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express.js
- Mongoose
- Zod Validation
- Helmet
- CORS

### Database
- MongoDB
- In-memory database fallback for local/sandbox execution

### Authentication & Security
- JSON Web Tokens (JWT)
- Bcrypt password hashing

### DevOps
- Docker
- Docker Compose
- esbuild

---

## 🏃 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/kayal2008/pastebin-application.git
cd pastebin-application
