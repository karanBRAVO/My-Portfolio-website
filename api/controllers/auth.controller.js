import bcrypt from "bcrypt";
import authModel from "../models/auth.model.js";
import otpModel from "../models/otp.model.js";
import mailer from "../utilities/mailer/mailer.utility.js";
import otpGenerator from "otp-generator";
import otp_template from "../utilities/mailer/templates/otp.template.js";
import signup_success_template from "../utilities/mailer/templates/signup_success.template.js";
import jwt from "jsonwebtoken";
import { IsValidEmail } from "../utilities/validators/email.validator.js";

const genToken = (ID, expiry = 60 * 60 * 24) => {
  const token = jwt.sign({ user_id: ID }, process.env.SECRET_KEY, {
    expiresIn: expiry,
  });
  return token;
};

const verifyUser = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!IsValidEmail(email) || !otp) {
      const error = new Error("[-] Invalid credentials");
      throw error;
    }

    // finding user in otp db
    const user = await otpModel.findOne({ email });
    if (!user) {
      const error = new Error("[-] No request for otp found");
      throw error;
    }

    // verifying otp
    if (user.otp != otp) {
      const error = new Error("[-] Otp do not match");
      throw error;
    }

    // updating verfiying status
    await otpModel.updateOne(
      { email: user.email },
      { $set: { verified: true } }
    );

    // adding user to database
    const addUserToDb = new authModel({
      email: user.email,
      password: user.password,
      verified: true,
    });
    await addUserToDb.save();

    const mailed = await mailer(
      email,
      "Successfull login to MyBlog-KaranYadav",
      signup_success_template()
    );
    if (!mailed) {
      const err = new Error("Cannot send mail");
      throw err;
    }

    res.json({ success: true, message: "[+] User added to database" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const userSignUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!IsValidEmail(email) || !password) {
      const error = new Error("[-] Invalid credentials");
      throw error;
    }

    // checking for existing users
    const verifyEmail = await authModel.findOne({ email });
    if (verifyEmail) {
      const error = new Error("[-] User already exists");
      throw error;
    }

    // checking for previous otp requests
    const hasAskedForOtp = await otpModel.findOne({ email });
    if (hasAskedForOtp) {
      await otpModel.deleteOne({ email });
    }

    // generating otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await otpModel.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await otpModel.findOne({ otp: otp });
    }

    // sending otp to user
    const mailed = await mailer(
      email,
      "Verify your account with One-time-password",
      otp_template(otp)
    );
    if (!mailed) {
      const err = new Error("Cannot send mail");
      throw err;
    }

    // adding otp to database
    const addOtpToDb = new otpModel({
      email,
      otp,
      password: bcrypt.hashSync(password, 10),
    });
    await addOtpToDb.save();

    res.status(200).json({
      success: true,
      message: "[+] OTP sent successfully",
    });
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

    // checking for user
    const verifyEmail = await authModel.findOne({ email });
    if (!verifyEmail) {
      const error = new Error("[-] User not found");
      throw error;
    }

    // matching password
    const verfiyPassword = bcrypt.compareSync(password, verifyEmail.password);
    if (!verfiyPassword) {
      const error = new Error("[-] User credentials not matched");
      throw error;
    }

    // checking verified status
    const isUserVerified = verifyEmail.verified;
    if (!isUserVerified) {
      const error = new Error("[-] User not verified");
      throw error;
    }

    // setting token
    const token = genToken(verifyEmail._id, 60 * 60 * 24);

    // setting cookie
    res.cookie("token", token, { httpOnly: true });

    res.json({ success: true, message: "[+] User logged in" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const signIn_google = async (req, res) => {
  const { email, emailVerified, photoUrl } = req.body;

  try {
    // email not verfied
    if (!emailVerified) {
      const error = new Error("[-] User not verified");
      throw error;
    }

    const hasAccount = await authModel.findOne({ email });

    // log in
    if (hasAccount) {
      // generating token
      const token = genToken(hasAccount._id, 60 * 60 * 24);

      res.cookie("token", token, { httpOnly: true });

      res.json({ success: true, message: "[+] User logged in" });
    } else {
      const password = bcrypt.hashSync(
        Math.random().toString(36).slice(-8) +
          Math.random().toString(36).slice(-8),
        10
      );

      const mailed = await mailer(
        email,
        "Successfull login to MyBlog-KaranYadav",
        signup_success_template()
      );
      if (!mailed) {
        const err = new Error("Cannot send mail");
        throw err;
      }

      const addUserToDb = new authModel({
        email,
        password,
        verified: emailVerified,
        photoUrl,
      });

      await addUserToDb.save();

      const hasAccount = await authModel.findOne({ email });
      const token = genToken(hasAccount._id, 60 * 60 * 24);

      // setting the cookie token
      res.cookie("token", token, { httpOnly: true });

      res.json({ success: true, message: "[+] User Added to database" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default { userSignUp, userLogin, signIn_google, verifyUser };
