import mongoose, { Schema } from "mongoose";
const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const todoModel = mongoose.model("todoModel", todoSchema);
export default todoModel;
