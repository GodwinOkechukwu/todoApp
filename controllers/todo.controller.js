import Todo from "../model/todo.model.js";

export const createTodo = async (req, res, next) => {
  try {
    const todoList = await Todo.create({ ...req.body, userId: req.user._id });

    res.status(201).json({ success: true, data: todoList });
  } catch (err) {
    next(err);
  }
};

export const getTodo = async (req, res, next) => {
  try {
    const todoList = await Todo.find({ userId: req.user._id });

    res.status(200).json({ success: true, data: todoList });
  } catch (err) {
    next(err);
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      const error = new Error("Todo not found");
      error.status = 404;
      throw error;
    }

    if (req.user.id !== todo.userId.toString()) {
      const error = new Error("you are not the owner of this account");
      error.status = 401;
      throw error;
    }

    res.status(200).json({ success: true, data: todo });
  } catch (err) {
    next(err);
  }
};

export const deleteTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      const error = new Error("Todo not found");
      error.status = 404;
      throw error;
    }

    if (req.user.id !== todo.userId.toString()) {
      const error = new Error("you are not the owner of this account");
      error.status = 401;
      throw error;
    }
    await Todo.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "todo deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const updateTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      const error = new Error("Todo not found");
      error.status = 404;
      throw error;
    }

    if (req.user.id !== todo.userId.toString()) {
      const error = new Error("you are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const allowedUpdates = ["task", "completed"];
    const updates = {};

    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });
    const updated = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};
