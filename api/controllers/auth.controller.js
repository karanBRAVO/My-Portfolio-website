import bcrypt from "bcrypt";
import * as EmailValidator from "email-validator";
import authModel from "../models/auth.model.js";

const IsValidEmail = (email) => {
  return EmailValidator.validate(email);
};

const userSignUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!IsValidEmail(email)) {
      const error = new Error("[-] Invalid email address");
      throw error;
    }
    const addUserToDb = new authModel({
      email,
      password: bcrypt.hashSync(password, 10),
    });
    await addUserToDb.save();
    res.json({ success: true, message: "[+] User Added to Database" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!IsValidEmail(email)) {
      const error = new Error("[-] Invalid email address");
      throw error;
    }
    const verifyEmail = await authModel.findOne({ email });
    if (!verifyEmail) {
      const error = new Error("[-] User not found");
      throw error;
    }
    const verfiyPassword = bcrypt.compareSync(password, verifyEmail.password);
    if (!verfiyPassword) {
      const error = new Error("[-] User credentials not matched");
      throw error;
    }
    const isUserVerified = verifyEmail.verified;
    if (!isUserVerified) {
      const error = new Error("[-] User not verified");
      throw error;
    }
    res.json({ success: true, message: "[+] User logged in" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const signIn_google = async (req, res) => {
  const { email, emailVerified, photoUrl } = req.body;

  try {
    const hasAccount = await authModel.findOne({ email });

    if (hasAccount) {
      if (!hasAccount.verified) {
        const error = new Error("[-] User not verified");
        throw error;
      }

      res.json({ success: true, message: "[+] User logged in" });
    } else {
      const password = bcrypt.hashSync(
        Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8),
        10
      );

      const addUserToDb = new authModel({
        email,
        password,
        verified: emailVerified,
        photoUrl,
      });

      await addUserToDb.save();
      res.json({ success: true, message: "[+] User Added to database" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default { userSignUp, userLogin, signIn_google };
