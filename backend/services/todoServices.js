const Todo = require("../models/todo");

// Get all todos
const getAllTodos = async () => {
  return await Todo.find();
};

// Create a new todo
const createNewTodo = async (title) => {
  return await Todo.create({ title });
};

// Update todo by ID
const updateTodoById = async (id, data) => {
  return await Todo.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Delete todo by ID
const deleteTodoById = async (id) => {
  return await Todo.findByIdAndDelete(id);
};

module.exports = {
  getAllTodos,
  createNewTodo,
  updateTodoById,
  deleteTodoById
};
