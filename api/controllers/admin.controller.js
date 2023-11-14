import adminModel from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import mailer from "../utilities/mailer/mailer.utility.js";
import adminLogin_template from "../utilities/mailer/templates/adminLogin.template.js";

const adminLogin = async (req, res, next) => {
  const { username, passkeys } = req.body;

  try {
    // validating inputs
    if (username.length == 0 || passkeys.length == 0) {
      const error = new Error("Invalid credentials");
      throw error;
    }

    // finding admin
    const admin = await adminModel.findOne({ username: username });
    if (!admin) {
      const error = new Error("No admin found");
      throw error;
    }

    // checking passkeys
    const passkeywords = admin.passkeys;
    for (let i = 0; i < passkeywords.length; i++) {
      if (passkeywords[i] != passkeys[i]) {
        const error = new Error("Invalid passkeywords");
        throw error;
      }
    }

    // generating token
    const token = jwt.sign({ id: admin._id }, process.env.SECRET_KEY);

    // sending mail on login
    const userAgent =
      req.headers["user-agent"] +
      req.headers["sec-ch-ua"] +
      req.headers["sec-ch-ua-platform"];
    mailer(
      "xpresskaran98@gmail.com",
      "Logged in as Administrator",
      adminLogin_template(username, userAgent, token)
    );

    res.json({ success: true, message: "[+] Logged In", token });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default adminLogin;
