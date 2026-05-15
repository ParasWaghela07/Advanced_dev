import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import projectRoutes from "./routes/project.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";
import uploadRoutes from "./routes/upload.routes.js";
import cookieParser
from "cookie-parser";

import { errorHandler } from "./middlewares/error.middleware.js";
import {
  requestLogger
}
from "./middlewares/logger.middleware.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use(cookieParser());

app.use(requestLogger);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/uploads", uploadRoutes);

app.use(errorHandler);


export default app;
