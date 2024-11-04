import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import todoRouter from "./routes/todoRoutes.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";
dotenv.config({ path: "./.env" });
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "../frontend/dist")));
app.use("/api/v1/todo", todoRouter);
app.use("/api/v1/user", userRouter);
app.get("*", (req, res) => {
  res.sendFile(path.join(path.resolve(), "../frontend/dist/index.html"));
});

connectDB()
  .then(() => {
    const port = process.env.port || 8080;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log("Server down"));
