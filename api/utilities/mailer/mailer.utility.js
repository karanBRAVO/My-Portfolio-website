import nodemailer from "nodemailer";
import secureObj from "../../secure.js";

const mailer = ({ to, subject, template, attachments: [] }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: secureObj.email,
      pass: secureObj.password,
      clientId: secureObj.client_id,
      clientSecret: secureObj.client_secret,
      refreshToken: secureObj.refresh_token,
    },
  });

  const message = {
    from: "MyBlog 🧑‍🎓 xpresskaran98@gmail.com",
    to,
    subject,
    html: template,
    attachments,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("[!] Error");
      return console.log(err);
    }
    console.log("[+] Mail send successfully");
    console.log(info);
  });
};

export default mailer;
