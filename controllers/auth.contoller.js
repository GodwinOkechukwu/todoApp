import mongoose from "mongoose";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import { sendEmail } from "../utils/send-email.js";

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    //check if a user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create(
      [{ name, email, password: hashPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();
    await sendEmail({
      to: newUser[0].email,
      subject: "Welcome 🎉",
      html: `<h1>Hello ${newUser[0].name}</h1><p>Thanks for registering!</p>`,
    });

    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: { token: token, user: newUser[0] },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //check if a user already exists
    const user = await User.findOne({ email });
    console.log("user email", user.email);
    if (!user) {
      const error = new Error("User does not exists");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await sendEmail({
      to: user.email,
      subject: "Login Alert",
      html: `
    <h2>Login Alert</h2>
    <p>Hi ${
      user.name
    }, you just logged in to your account at ${new Date().toLocaleString()}.</p>
  `,
    });

    res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: { token, user },
    });
  } catch (err) {
    next(err);
  }
};

export const signOut = async (req, res, next) => {
  // implement signOut logic here
};
