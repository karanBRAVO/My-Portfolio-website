import mailer from "../utilities/mailer/mailer.utility.js";
import subscribed_template from "../utilities/mailer/templates/subscribe_success.template.js";
import authModel from "../models/auth.model.js";

const userSubscription = async (req, res, next) => {
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

    // already subscribed
    if (user.subscribed) {
      const error = new Error("[-] user already subscribed");
      throw error;
    }

    // updating subscribe property
    await authModel.updateOne({ _id: user_id }, { $set: { subscribed: true } });

    // sending mail
    mailer(
      user.email,
      "Subscribed Successfully",
      subscribed_template(user.email)
    );

    res.json({ success: true, message: "[+] user subscribed" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default { userSubscription };
