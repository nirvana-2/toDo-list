const validateCreateTodo = (data) => {
  const errors = {};
  if (!data.title || !data.title.trim()) {
    errors.title = "Title is required";
  }
  return { isValid: Object.keys(errors).length === 0, errors };
};

const validateUpdateTodo = (data) => {
  const errors = {};
  if (data.title !== undefined && !data.title.trim()) {
    errors.title = "Title cannot be empty";
  }
  if (data.completed !== undefined && typeof data.completed !== "boolean") {
    errors.completed = "Completed must be true or false";
  }
  return { isValid: Object.keys(errors).length === 0, errors };
};

module.exports = { validateCreateTodo, validateUpdateTodo };
