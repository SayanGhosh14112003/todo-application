import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});
const userModel = mongoose.model("userModel", userSchema);
export default userModel;
