import mongoose, { Model, Schema } from "mongoose";

export interface UserType {
  fullname: string;
  email: string;
  password: string;
}

const UserSchema: Schema<UserType> = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User: Model<UserType> =
  mongoose.models.User || mongoose.model<UserType>("User", UserSchema);

export default User;
