import mongoose, { Schema } from "mongoose";
import { User } from "../../types";

const userSchema = new Schema<User>(
  {
    username: String,
    email: String,
    profile: {
      age: Number,
      name: String,
      company: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        ret.id = ret._id;
      },
    },
  }
);

export const DBUser = mongoose.model("User", userSchema);
