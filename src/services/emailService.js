'use strict';

const nodemailer = require("nodemailer");
require("dotenv/config");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

const sendEmail = async ({ mailTo, subject, content }) => {
  return await transporter.sendMail({
    from: 'nice-gadgets@auth.com',
    to: mailTo,
    subject,
    text: "Cant open data from this mail :(",
    html: content,
  });
};

const sendUserActivationLink = (mailTo, token) => {
  const link = `${process.env.CLIENT_PROD_URL}/nice_gadgets_FE/#/activate/${token}`;
  const link2 = `${process.env.CLIENT_DEV_URL}/#/activate/${token}`;

  return sendEmail({
    mailTo,
    subject: 'Activate your Nice-Gadgets account',
    content: `
          <span style="font-family: Arial, sans-serif; color: #905BFF;">Nice-Gadgets Shop</span>
          <div style="font-family: Arial, sans-serif; border: 1px solid black; padding: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; flex-direction: column; background-color: #161827;">
            <h1 style="color: #905BFF; text-align: center; ">Click the button to activate your account</h1>
              <a style="font-size: 18px; padding: 10px 30px; border-radius: 10px; border: 1px solid #905BFF; background-color: #905BFF; color: white; text-decoration: none;" target="_blank" href="${link}">Activate</a>
              <br />
              <span style="font-family: Arial, sans-serif; color: white;">or use this link:</span>
              <a style="color: lightblue;" target="_blank" href="${link}">${link}</a>

              <h2 style="color: red; text-align: center; ">IF YOU ARE IN DEVELOPMENT MODE - USE THIS LINK:</h2>
              <a target="_blank" style="color: lightblue;" href="${link2}">${link2}</a>
          </div>
        `,
  });
};

const sendUserOrderDetails = (mailTo, itemsCount, total) => {
  return sendEmail({
    mailTo,
    subject: 'Thanks for your order at Nice-Gadgets!',
    content: `
            <h1>Thanks for your order!</h1>
            <h2>You just ordered ${itemsCount} items for total $${total}</h2>
        `,
  });
};

module.exports = {
  sendEmail,
  sendUserActivationLink,
  sendUserOrderDetails
};
