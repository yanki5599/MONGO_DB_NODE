import express, { Application } from "express";

import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorHandler";
import authRouter from "./routes/loginRouter";
import studentRouter from "./routes/studentRouter";
import teacherRouter from "./routes/teacherRouter";
import { authMiddleware } from "./middleware/authMiddleware";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import specs from "./swagger";

dotenv.config();
connectDB();
const app: Application = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/login", authRouter);

app.use("/student", studentRouter);
app.use("/teacher", teacherRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
