import authModel from "../models/auth.model.js";

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
    res.json({ success: true, message: "[+] data sent to user", data });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default userProfileController;
