import express from "express";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDataBase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import workflowRouter from "./routes/workflow.routes.js";
import { swaggerSpec, swaggerUiMiddleware } from "./config/swagger.js";
import todoRouter from "./routes/todo.routes.js";
const port = process.env.PORT || PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  "/api/v1/docs",
  swaggerUiMiddleware.serve,
  swaggerUiMiddleware.setup(swaggerSpec)
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/todos", todoRouter);
app.use("/api/v1/workFlow", workflowRouter);

app.use(errorMiddleware);
// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker API 🚀");
});

// Start server
// app.listen(PORT, async () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   connectToDataBase();
// });

app.listen(port, async () => {
  console.log(`🚀 Server running on port ${port}`);
  connectToDataBase();
});
