import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(req.body);
    if (
      userName?.trim() === "" ||
      email?.trim() === "" ||
      password?.trim() === ""
    )
      return res.send({ data: "Field are required", success: false });
    const userExist = await userModel.findOne({ email: email?.toLowerCase() });
    if (userExist)
      return res
        .status(500)
        .send({ data: "User already exists", success: false });
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    const user = await userModel.create({
      email: email?.toLowerCase(),
      userName,
      password: hashedPassword,
    });
    res.send({
      data: {
        userName: user.userName,
        email: user.email,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      data: "Something is wrong with register",
      success: false,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email?.toLowerCase() });
    if (!user)
      return res.status(401).send({ data: "User not found", success: false });
    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
      return res.status(401).send({ data: "User not found", success: false });
    }
    const token = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);
    return res.send({
      data: {
        token,
        userName: user.userName,
        email: user.email,
      },
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      data: "Error while logging in",
      success: false,
    });
  }
};
export { registerUser, loginUser };
