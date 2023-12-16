import authModel from "../models/auth.model.js";
import mailer from "../utilities/mailer/mailer.utility.js";
import otp_template from "../utilities/mailer/templates/otp.template.js";
import otpGenerator from "otp-generator";
import accountDeleted_template from "../utilities/mailer/templates/userDeletedAccount_success.template.js";
import otpModel from "../models/otp.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IsValidEmail } from "../utilities/validators/email.validator.js";
import resetPasswordSuccess_template from "../utilities/mailer/templates/passwordReset_success.template.js";

const userProfileController = async (req, res) => {
  try {
    // getting user id decoded from jwt token
    const user_id = req.user_id;
    if (!user_id) {
      const error = new Error("[-] no access");
      throw error;
    }

    // finding user in database
    const user = await authModel.findOne({ _id: user_id });
    if (!user) {
      const error = new Error("[-] no user found");
      throw error;
    }

    const data = {
      email: user.email,
      photoUrl: user.photoUrl,
    };
    res.json({ success: true, message: "[+] data sent to user.", data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const userUploadImage = async (req, res) => {
  try {
    // getting user id decoded from jwt token
    const user_id = req.user_id;
    if (!user_id) {
      const error = new Error("[-] no access");
      throw error;
    }

    // finding user in database
    const user = await authModel.findOne({ _id: user_id });
    if (!user) {
      const error = new Error("[-] no user found");
      throw error;
    }

    const { newPhotoUrl } = req.body;
    if (!newPhotoUrl) {
      const error = new Error("[-] no image url provided");
      throw error;
    }

    // checking if user has an image
    if (!user.photoUrl) {
      user.photoUrl = req.file.filename;
    }

    // updating user
    await authModel.updateOne(
      { _id: user_id },
      { $set: { photoUrl: newPhotoUrl } }
    );

    res.json({
      success: true,
      message: "[+] image uploaded successfully.",
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const userLogout = async (req, res) => {
  try {
    // res.clearCookie("token");
    res.json({ success: true, message: "[+] User logged out." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const userDelete = async (req, res) => {
  try {
    // res.clearCookie("token");

    // getting user id decoded from jwt token
    const user_id = req.user_id;
    if (!user_id) {
      const error = new Error("[-] no access");
      throw error;
    }

    // finding user in database
    const user = await authModel.findOne({ _id: user_id });
    if (!user) {
      const error = new Error("[-] no user found");
      throw error;
    }

    // deleting user
    await authModel.deleteOne({ _id: user_id });

    // sending mail
    const mailed = await mailer(
      user.email,
      "Account Successfully Deleted!",
      accountDeleted_template()
    );
    if (!mailed) {
      const err = new Error("Cannot send mail");
      throw err;
    }

    res.json({ success: true, message: "[+] User Deleted from DB." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    // getting user id decoded from jwt token
    const user_id = req.user_id;
    if (!user_id) {
      const error = new Error("[-] no access");
      throw error;
    }

    // finding user in database
    const user = await authModel.findOne({ _id: user_id });
    if (!user) {
      const error = new Error("[-] no user found");
      throw error;
    }

    const { password } = req.body;
    if (!password) {
      const error = new Error("[-] Invalid credentials.");
      throw error;
    }

    // finding otp request in otp's
    const hasAskedForOtp = await otpModel.findOne({ email: user.email });
    if (!hasAskedForOtp) {
      const error = new Error("[-] No otp request found.");
      throw error;
    }

    // finding otp verfication status
    if (!hasAskedForOtp.verified) {
      const error = new Error("[-] OTP not verified.");
      throw error;
    }

    // generating hashed password
    const new_hashedPassword = bcrypt.hashSync(password, 10);

    // updating password
    await authModel.updateOne(
      { _id: user_id },
      { $set: { password: new_hashedPassword } }
    );

    // clearing the cookie
    // res.clearCookie("passwordResetToken");

    // sending mail
    const mailed = await mailer(
      user.email,
      "Successfully Updated Password MyBlog-Karan Yadav",
      resetPasswordSuccess_template()
    );
    if (!mailed) {
      const err = new Error("Cannot send email");
      throw err;
    }

    res.json({ success: true, message: "[+] Password reset successfully." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const forgetPassword_verifyOtp = async (req, res) => {
  try {
    // getting user id decoded from jwt token
    const user_id = req.user_id;
    if (!user_id) {
      const error = new Error("[-] no access");
      throw error;
    }

    const { otp } = req.body;
    if (!otp) {
      const error = new Error("[-] Invalid OTP");
      throw error;
    }

    // finding user in database
    const user = await authModel.findOne({ _id: user_id });
    if (!user) {
      const error = new Error("[-] no user found");
      throw error;
    }

    // finding otp request in otp's
    const hasAskedForOtp = await otpModel.findOne({ email: user.email });
    if (!hasAskedForOtp) {
      const error = new Error("[-] No otp request found.");
      throw error;
    }

    // matching otp
    if (hasAskedForOtp.otp != otp) {
      const error = new Error("[-] OTP do not match.");
      throw error;
    }

    // updating verfication status
    await otpModel.updateOne(
      { email: user.email },
      { $set: { verified: true } }
    );

    res.json({ success: true, message: "[+] OTP Verfied to reset password." });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const forgetPassword_sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!IsValidEmail(email)) {
      const error = new Error("[-] Invalid email.");
      throw error;
    }

    // finding user in database
    const user = await authModel.findOne({ email });
    if (!user) {
      const error = new Error("[-] no user found");
      throw error;
    }

    // otp generation
    // checking for previous otp requests
    const hasAskedForOtp = await otpModel.findOne({ email: user.email });
    if (hasAskedForOtp) {
      await otpModel.deleteOne({ email: user.email });
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

    // generating token
    const password_reset_token = jwt.sign(
      { user_id: user._id },
      process.env.SECRET_KEY,
      {
        expiresIn: 60 * 60,
      }
    );

    // setting the cookie token
    // res.cookie("passwordResetToken", password_reset_token, { httpOnly: true });

    // sending mail
    const mailed = await mailer(
      user.email,
      "OTP to Reset Password MyBlog-Karan Yadav",
      otp_template(otp)
    );
    if (!mailed) {
      const err = new Error("Cannot send email");
      throw err;
    }

    // adding otp to database
    const addOtpToDb = new otpModel({
      email,
      otp,
      password: bcrypt.hashSync("Password", 10),
    });
    await addOtpToDb.save();

    res.json({
      success: true,
      message: "[+] OTP sent for forget password request.",
      token: password_reset_token,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default {
  userProfileController,
  userUploadImage,
  userLogout,
  userDelete,
  forgetPassword_sendOtp,
  forgetPassword_verifyOtp,
  resetPassword,
};
