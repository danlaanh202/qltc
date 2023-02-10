const nodeMailer = require("nodemailer");
const mailConfig = require("../config/mail.config");

exports.sendMail = (to, subject, htmlContent) => {
  const transport = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};
