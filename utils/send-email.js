import { transporter } from "../config/nodemailer.js";

export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: "kenesongodwin@gmail.com",
      to,
      subject,
      text, // plain text version
      html, // html version (optional)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.response, to);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
