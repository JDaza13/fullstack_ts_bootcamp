import { Router } from "express";
import { User, UserRole } from "../../types";
import { DBUser } from "../models/user";

const userRouter = Router();

const generateUsername = (name: string): string => {
  const cleanedName = name.replace(/\s+/g, "").toLowerCase();
  const randomNumber = Math.floor(10 + Math.random() * 90);
  return `${cleanedName}${randomNumber}`;
};

/**
 * Returns all users
 */
userRouter.get("/", async (_req, res) => {
  const DBUsers = await DBUser.find();
  return res.json(DBUsers);
});

userRouter.get("/count", async (_req, res) => {
  const countUsers = await DBUser.countDocuments();
  return res.json(countUsers);
});

/**
 * Returns an user by id
 */
userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await DBUser.findOne({ _id: userId });
  if (user) {
    return res.json(user);
  }
  return res.json({ msg: "User not found" });
});

/**
 * Returns all users by role
 */
userRouter.get("/role/:role", async (req, res) => {
  const userRole = req.params.role as UserRole;
  const roleUsers = await DBUser.find({ roles: userRole });
  if (roleUsers.length) {
    return res.json(roleUsers);
  }
  return res.json({ msg: "No users match your role" });
});

/**
 * Creates or Edits an user
 */
userRouter.post("/", async (req, res) => {
  const userData = req.body as User;
  const reqEmail = userData.email;

  // If there is an id then edits the
  if (userData.id) {
    const editedUser = await DBUser.findOneAndUpdate(
      { _id: userData.id },
      userData
    );
    if (editedUser) {
      return res.json({ msg: "User edited", id: editedUser.id });
    }
    return res.json({ msg: "Unable to edit user." });
  }

  // Otherwise creates and User
  // First we need to verify if the email is not already in DB
  const existingUser = await DBUser.findOne({ email: reqEmail });
  if (existingUser)
    return res.status(500).json({ msg: "e-mail already exists" });

  const newUser = new DBUser({
    email: userData.email,
    roles: ["guest"],
    username: generateUsername(userData.profile.name),
    profile: { ...userData.profile },
  });

  await newUser.save();

  return res.json({ msg: "User created", id: newUser._id });
});

export default userRouter;
