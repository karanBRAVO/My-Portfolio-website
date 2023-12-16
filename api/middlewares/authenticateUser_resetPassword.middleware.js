import jwt from "jsonwebtoken";

const authenticate_userPasswordReset = (req, res, next) => {
  try {
    const password_reset_token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(
      password_reset_token,
      process.env.SECRET_KEY
    );
    req.user_id = decodedToken.user_id;
    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default authenticate_userPasswordReset;
