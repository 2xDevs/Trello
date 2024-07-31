import mongoose, { Model, Schema } from "mongoose";

interface TodoType {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Under Review" | "Finished";
  priority: "Low" | "Medium" | "Urgent";
  deadline: Date;
  created: Date;
  user: mongoose.Schema.Types.String;
  content: string;
}

const TodoSchema: Schema<TodoType> = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  description: { type: String, trim: true, maxlength: 500 },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Under Review", "Finished"],
    required: true,
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "Urgent"],
    required: true,
  },
  deadline: { type: Date, required: true },
  created: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
  content: String,
});

const Todo: Model<TodoType> =
  mongoose.models.Todo || mongoose.model<TodoType>("Todo", TodoSchema);

export default Todo;
