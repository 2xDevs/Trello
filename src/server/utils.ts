import Todo from "@/db/Todo";
import User from "@/db/User";
import mongoose from "mongoose";

export interface TodoType {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Under Review" | "Finished";
  priority: "Low" | "Medium" | "Urgent";
  deadline: Date;
  user: mongoose.Schema.Types.ObjectId | string;
  content?: string;
}

export type UpdateFieldsType = Partial<TodoType>;

export const getTodosOfUser = async (userId: string) => {
  try {
    const todos = await Todo.find({ user: userId });
    return todos;
  } catch (err) {
    console.error("Error fetching todos for user:", err);
    throw err;
  }
};

export const getTodo = async (todoId: string) => {
  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      console.log("Todo not found");
      return null;
    }
    return todo;
  } catch (err) {
    console.error("Error fetching todo:", err);
    throw err;
  }
};

export const addTodo = async (userId: string, todoData: TodoType) => {
  try {
    const todo = await Todo.create(todoData);
    await User.findByIdAndUpdate(
      userId,
      { $push: { todos: todo._id } },
      { new: true },
    );
    return todo;
  } catch (err) {
    console.error("Error adding todo:", err);
    throw err;
  }
};

export const editTodo = async (
  todoId: string,
  updatedFields: UpdateFieldsType,
) => {
  try {
    const todo = await Todo.findByIdAndUpdate(todoId, updatedFields, {
      new: true,
    });
    if (!todo) {
      console.log("Todo not found for update");
      return null;
    }
    return todo;
  } catch (err) {
    console.error("Error updating todo:", err);
    throw err;
  }
};

export const deleteTodo = async (todoId: string) => {
  try {
    const todo = await Todo.findByIdAndDelete(todoId);
    if (!todo) {
      console.log("Todo not found");
      return null;
    }

    await User.findByIdAndUpdate(
      todo.user,
      { $pull: { todos: todoId } },
      { new: true },
    );
    console.log("Todo deleted and user updated:", todo);
    return todo;
  } catch (err) {
    console.error("Error deleting todo:", err);
    throw err;
  }
};
