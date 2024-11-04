import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    console.log(req.headers);
    const decode = jwt.verify(token, process.env.PRIVATE_KEY);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      data: "Something is wrong in authentication",
      success: false,
    });
  }
};
export default authMiddleware;
