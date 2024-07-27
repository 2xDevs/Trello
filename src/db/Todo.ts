import mongoose, { Model, Schema } from "mongoose";


interface TodoType {
  title: string;
  description: string;
  status: "To Do" | "In Progress" | "Under Review" | "Finished";
  priority: "Low" | "Medium" | "Urgent";
  deadline: Date;
  created: Date;
  user: mongoose.Schema.Types.ObjectId;
}


const TodoSchema: Schema<TodoType> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});


const Todo: Model<TodoType> =
  mongoose.models.Todo || mongoose.model<TodoType>("Todo", TodoSchema);

export default Todo;
