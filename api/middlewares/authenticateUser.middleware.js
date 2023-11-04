import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user_id = decodedToken.user_id;
    next();
  } catch (err) {
    res.json({ success: false, jwtError: true, message: err.message });
  }
};

export default authenticate;
