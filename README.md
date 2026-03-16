# Task Flow

A modern, glassmorphic full-stack Todo application built with the MERN stack (MongoDB, Express, React, Node.js). 

✨ **[Live Demo](https://to-do-list-sigma-taupe-18.vercel.app)** ✨

## 🎨 Design & UI
This version features a premium **Glassmorphism Dark Mode** design with:
- **Frosted Glass Containers**: Using `backdrop-filter: blur()`.
- **Modern Typography**: Powered by Google Fonts (Outfit).
- **Smooth Animations**: Interactive hover effects and transitions.
- **Vibrant Accents**: Indigo and Purple gradients.

## 🚀 Tech Stack

### Backend
- **Node.js** & **Express**: Web server framework.
- **MongoDB** & **Mongoose**: NoSQL database and object modeling.
- **CORS**: Configured for secure local and production access.
- **Dotenv**: Environment variable management.

### Frontend
- **React (v19)**: Modern UI library.
- **Axios**: HTTP client for API requests.
- **CSS3**: Custom glassmorphism implementation (no Tailwind dependencies).

---

## 📁 Project Structure

```text
todoApp/
├── backend/            # Express server and MongoDB models
│   ├── index.js        # Server entry point
│   ├── .env            # Config (PORT, MONGO_URI)
│   └── routes/         # API endpoints
├── frontend/           # React application
│   ├── src/            # React components and App.css
│   └── public/         # index.html with Google Fonts
└── README.md           # Project documentation
```

---

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Recommended for production/backend)

### 1. Backend Setup
1. `cd backend`
2. `npm install`
3. Configure your `.env` file (MONGO_URI and PORT).
4. `npm run dev` (Starts on `http://localhost:8000`)

### 2. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm start` (Starts on `http://localhost:3000` or `3001`)

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
- ✅ **Complete CRUD**: Create, Read, Update, and Delete missions.
- 🌓 **Premium Dark Mode**: Built-in glassmorphic aesthetics.
- 📱 **Responsive**: Optimized for various screen sizes.
- ⚡ **Real-time UX**: Instant UI updates via React state management.
