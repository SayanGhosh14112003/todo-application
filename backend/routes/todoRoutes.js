import express from "express";
import {
  getTodos,
  addTodo,
  markTodo,
  deleteTodo,
} from "../controllers/todoControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.get("/getTodos", authMiddleware, getTodos);
router.post("/addTodo", authMiddleware, addTodo);
router.put("/markTodo", authMiddleware, markTodo);
router.delete("/deleteTodo/:_id", authMiddleware, deleteTodo);
export default router;
