import mailer from "../utilities/mailer/mailer.utility.js";
import usersMessage_template from "../utilities/mailer/templates/userMessage_toMe.template.js";
import authModel from "../models/auth.model.js";
import {
  IsValidEmail,
  IsValidPhone,
} from "../utilities/validators/email.validator.js";

const message_to_me = async (req, res, next) => {
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

    // getting the fields
    const { name, email, phone, msg } = req.body;

    // checking fields
    if (
      !IsValidEmail(email) ||
      !IsValidPhone(phone) ||
      name.length < 0 ||
      name.length > 50 ||
      msg.length < 0
    ) {
      const error = new Error("[-] Invalid field value");
      throw error;
    }

    // sending mail to me
    const mailed = await mailer(
      "xpresskaran98@gmail.com",
      "Message from your Portfolio Site",
      usersMessage_template(name, email, phone, msg)
    );
    if (!mailed) {
      const err = new Error("Cannot send mail");
      throw err;
    }

    res.json({ success: true, message: "[+] Message sent to Karan Yadav" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default message_to_me;
