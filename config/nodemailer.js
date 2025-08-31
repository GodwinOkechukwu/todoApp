import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP host & port
  auth: {
    user: "kenesongodwin@gmail.com",
    pass: EMAIL_PASSWORD, // use App Password, not your main Gmail password
  },
});
