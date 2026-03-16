import React, { useState, useEffect } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_API_URL || "http://localhost:8000"}/todos`;

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
      setError("Failed to load todos");
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
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
    <div style={{ padding: "2rem" }}>
      <h1>Todo App</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ margin: "0.5rem 0" }}>
            {editingId === todo._id ? (
              <>
                <input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
                <button onClick={() => saveTodo(todo)}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    marginRight: "1rem",
                    cursor: "pointer"
                  }}
                  onClick={() => toggleCompleted(todo)}
                >
                  {todo.title}
                </span>
                <button onClick={() => startEditing(todo)}>Edit</button>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;