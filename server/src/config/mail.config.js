require("dotenv").config();
module.exports = {
  MAILER: "smtp",
  HOST: "smtp.gmail.com",
  PORT: 587,
  USERNAME: process.env.GMAIL,
  PASSWORD: process.env.PASSWORD,
  ENCRYPTION: "TLS",
  FROM_ADDRESS: process.env.GMAIL,
  FROM_NAME: "Hệ thống tiêm chủng",
};
