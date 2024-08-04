var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { DBUser } from "../models/user.js";
const userRouter = Router();
const generateUsername = (name) => {
    const cleanedName = name.replace(/\s+/g, "").toLowerCase();
    const randomNumber = Math.floor(10 + Math.random() * 90);
    return `${cleanedName}${randomNumber}`;
};
/**
 * Returns all users
 */
userRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const DBUsers = yield DBUser.find();
    return res.json(DBUsers);
}));
userRouter.get("/count", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const countUsers = yield DBUser.countDocuments();
    return res.json(countUsers);
}));
/**
 * Returns an user by id
 */
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield DBUser.findOne({ _id: userId });
    if (user) {
        return res.json(user);
    }
    return res.json({ msg: "User not found" });
}));
/**
 * Returns all users by role
 */
userRouter.get("/role/:role", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRole = req.params.role;
    const roleUsers = yield DBUser.find({ roles: userRole });
    if (roleUsers.length) {
        return res.json(roleUsers);
    }
    return res.json({ msg: "No users match your role" });
}));
/**
 * Creates or Edits an user
 */
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const reqEmail = userData.email;
    // If there is an id then edits the
    if (userData.id) {
        const editedUser = yield DBUser.findOneAndUpdate({ _id: userData.id }, userData);
        if (editedUser) {
            return res.json({ msg: "User edited", id: editedUser.id });
        }
        return res.json({ msg: "Unable to edit user." });
    }
    // Otherwise creates and User
    // First we need to verify if the email is not already in DB
    const existingUser = yield DBUser.findOne({ email: reqEmail });
    if (existingUser)
        return res.status(500).json({ msg: "e-mail already exists" });
    const newUser = new DBUser({
        email: userData.email,
        roles: ["guest"],
        username: generateUsername(userData.profile.name),
        profile: Object.assign({}, userData.profile),
    });
    yield newUser.save();
    return res.json({ msg: "User created", id: newUser._id });
}));
export default userRouter;
