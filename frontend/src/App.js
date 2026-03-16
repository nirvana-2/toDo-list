import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = `${process.env.REACT_APP_API_URL || "http://localhost:8000"}/todos`;

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [error, setError] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await axios.get(API);
      setTodos(res.data);
    } catch (err) {
      setError("Failed to load todos. Make sure backend is running.");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return setError("Todo title cannot be empty");

    try {
      const res = await axios.post(API, { title: newTodo });
      setTodos([...todos, res.data]);
      setNewTodo("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.title || "Failed to add todo");
      console.error(err.response?.data || err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err.response?.data || err.message);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditingText(todo.title);
  };

  const saveTodo = async (todo) => {
    if (!editingText.trim()) return setError("Todo title cannot be empty");

    try {
      const res = await axios.put(`${API}/${todo._id}`, {
        title: editingText,
        completed: todo.completed
      });
      setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
      setEditingId(null);
      setEditingText("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.title || "Failed to save todo");
      console.error(err.response?.data || err.message);
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const res = await axios.put(`${API}/${todo._id}`, {
        title: todo.title,
        completed: !todo.completed
      });
      setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
    } catch (err) {
      setError("Failed to toggle todo");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="app-container">
      <h1>Task Flow</h1>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={addTodo} className="input-group">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button type="submit" className="btn-primary">Add Task</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            {editingId === todo._id ? (
              <div className="edit-mode-input">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  autoFocus
                />
                <button onClick={() => saveTodo(todo)} className="action-btn">
                  <SaveIcon />
                </button>
              </div>
            ) : (
              <>
                <div className="todo-content">
                  <div
                    className={`custom-checkbox ${todo.completed ? 'checked' : ''}`}
                    onClick={() => toggleCompleted(todo)}
                  >
                    <CheckIcon />
                  </div>
                  <span
                    className={`todo-text ${todo.completed ? "completed" : ""}`}
                    onClick={() => toggleCompleted(todo)}
                  >
                    {todo.title}
                  </span>
                </div>
                <div className="todo-actions">
                  <button onClick={() => startEditing(todo)} className="action-btn" title="Edit">
                    <EditIcon />
                  </button>
                  <button onClick={() => deleteTodo(todo._id)} className="action-btn delete-btn" title="Delete">
                    <TrashIcon />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;