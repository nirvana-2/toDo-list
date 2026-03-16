# Todo App

A full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js). This project provides a simple and intuitive interface for managing daily tasks.

## 🚀 Tech Stack

### Backend
- **Node.js** & **Express**: Web server framework.
- **MongoDB** & **Mongoose**: NoSQL database and object modeling.
- **CORS**: Cross-Origin Resource Sharing.
- **Nodemon**: Development tool for automatic server restarts.

### Frontend
- **React (v19)**: Modern UI library.
- **Axios**: HTTP client for API requests.
- **React Scripts**: Modern build setup.

---

## 📁 Project Structure

```text
todoApp/
├── backend/            # Express server and MongoDB models
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── services/       # Business logic
│   └── index.js        # Server entry point
├── frontend/           # React application
│   ├── public/         # Static assets
│   └── src/            # React components and logic
└── README.md           # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Recommended: LTS)
- [MongoDB](https://www.mongodb.com/try/download/community) (Running locally on `mongodb://127.0.0.1:27017/todoDB`)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (Development mode):
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:8000`.

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```
   The app will open in your browser at `http://localhost:3000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **GET** | `/todos` | Fetch all todo items |
| **POST** | `/todos` | Create a new todo |
| **PUT** | `/todos/:id` | Update an existing todo (title/completion) |
| **DELETE** | `/todos/:id` | Remove a todo item |

---

## ✨ Features
- ✅ Create, Read, Update, and Delete Todos.
- 🔄 Real-time updates via React state.
- 💾 Persistent storage with MongoDB.
- 🌐 RESTful API architecture.
