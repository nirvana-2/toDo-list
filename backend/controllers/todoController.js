const todoService = require("../services/todoServices");
const { validateCreateTodo, validateUpdateTodo } = require("../middleware/validateTodo");

// GET all todos
exports.getTodos = async (req, res) => {
  try {
    const todos = await todoService.getAllTodos();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// CREATE a new todo
exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const { isValid, errors } = validateCreateTodo({ title });

    if (!isValid) return res.status(400).json(errors);

    const newTodo = await todoService.createNewTodo(title);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// UPDATE a todo
exports.updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;

    const { isValid, errors } = validateUpdateTodo({ title, completed });
    if (!isValid) return res.status(400).json(errors);

    const updatedTodo = await todoService.updateTodoById(req.params.id, { title, completed });

    if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });

    res.json(updatedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// DELETE a todo
exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await todoService.deleteTodoById(req.params.id);

    if (!deletedTodo) return res.status(404).json({ error: "Todo not found" });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
