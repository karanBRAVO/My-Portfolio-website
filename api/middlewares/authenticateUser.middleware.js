import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.auth.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user_id = decodedToken.user_id;
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default authenticate;
