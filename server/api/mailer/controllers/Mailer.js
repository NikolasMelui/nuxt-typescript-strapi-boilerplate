'use strict';

// Require the nodemailer module
const nodemailer = require('nodemailer');

module.exports = {
  /**
   * Send the email about new lead from the main form
   */
  leadmailer: async ctx => {
    try {
      // Define the reusable transport
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: `${process.env.EMAIL_ADDRESS}` || '',
          pass: `${process.env.EMAIL_PASSWORD}` || ''
        }
      });
      // Define the option object from the dotenv and request params
      const options = {
        from: `${process.env.EMAIL_ADDRESS}` || '',
        to: `${process.env.EMAIL_ADDRESS}` || '',
        replyTo: 'no-reply@elkyprokect@gmail.com',
        subject: 'У вас новая заявка с сайта Elky',
        html: ctx.request.body.html || ''
      };
      //Send the email
      await transporter.sendMail(options);
      return {
        statusCode: 200,
        message: 'The email was successfully sent.'
      };
    } catch (err) {
      ctx.body = err;
    }
  }
};
