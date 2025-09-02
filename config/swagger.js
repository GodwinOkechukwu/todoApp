import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { PORT } from "./env.js";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Subscription Tracker API",
    version: "1.0.0",
    description: "API documentation for Subscription Tracker backend",
  },
  basePath: "/api/v1",
  // servers: [
  //   {
  //     url: `http://localhost:${PORT}/api/v1`, // 👈 base url
  //     description: "Local server",
  //   },
  //   {
  //     url: "https://your-deployed-api.com/api/v1", // 👈 production server
  //     description: "Production server",
  //   },
  // ],
  servers: [
    {
      url:
        process.env.NODE_ENV === "production"
          ? "https://todoapp-1-t00m.onrender.com/api/v1"
          : `http://localhost:${PORT}/api/v1`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT", // 👈 shows it’s a JWT
      },
    },
  },
  security: [
    {
      bearerAuth: [], // 👈 apply globally
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // path to your routes folder
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiMiddleware = swaggerUi;
