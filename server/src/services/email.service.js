import { transporter }

from "../config/mail.js";
import logger from "../utils/logger.js";
export const sendEmail =
async ({

  to,

  subject,

  html

}) => {

  const mailOptions = {

    from:
      process.env.EMAIL_USER,

    to,

    subject,

    html

  };

  const info =
    await transporter.sendMail(
      mailOptions
    );

  logger.info(
    "Email sent:",
    info.messageId
  );

  return info;

};