import mongoose, { Model, Schema } from "mongoose";

export interface UserType {
  fullname: string;
  email: string;
  password: string;
  todos: string[];
}

const UserSchema: Schema<UserType> = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: { type: String, required: true, minlength: 6 },
  todos: [{ type: Schema.Types.String, ref: "Todo" }],
});

const User: Model<UserType> =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default User;
