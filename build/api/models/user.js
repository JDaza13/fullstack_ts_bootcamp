import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: String,
    email: String,
    profile: {
        age: Number,
        name: String,
        company: String,
    },
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (_doc, ret) => {
            ret.id = ret._id;
        },
    },
});
export const DBUser = mongoose.model("User", userSchema);
