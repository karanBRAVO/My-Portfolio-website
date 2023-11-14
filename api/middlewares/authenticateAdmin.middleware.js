import jwt from "jsonwebtoken";

const authenticateAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      const error = new Error(`token is required`);
      throw error;
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      const error = new Error(`Invalid authorization`);
      throw error;
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default authenticateAdmin;
