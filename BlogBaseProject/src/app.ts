import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/postRoutes";
import userRouter from "./routes/userRoutes";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import specs from "./swagger";
import swaggerUI from "swagger-ui-express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// Middleware
app.use(express.json());

connectDB();

// Routes
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
