import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import User from "../../models/userModel";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAILSEND!,
    pass: process.env.PASS!,
  },
});

export const sendEmail = [
  body("emailDestiny").isEmail().withMessage("Invalid destination email"),
  body("fullname").notEmpty().withMessage("The name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("message").notEmpty().withMessage("The message is required"),
  body("webName").notEmpty().withMessage("The website name is required"),
  body("formToken").notEmpty().withMessage("Form token is required"),

  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      fullname,
      email,
      message,
      phone,
      service,
      webName,
      emailDestiny,
      formToken,
    } = req.body;

    try {
      const user = await User.findOne({ formToken });
      if (!user) {
        return res.status(401).json({ message: "Form Token is not valid" });
      }

      const mailOptions = {
        from: process.env.EMAILSEND!,
        to: emailDestiny,
        subject: `A new message from your site: ${webName}`,
        html: `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          color: #1f1f20; /* Color de texto secundario */
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
        h2 {
          color: #2b4c7e; /* Color primario */
          margin-bottom: 15px;
        }
        p {
          margin-bottom: 10px;
        }
        .message {
          border-left: 5px solid #007bff; /* Color de acento */
          padding-left: 10px;
          background-color: #dce0e6; /* Color de fondo de acento */
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>From your web ${webName}</h2>
        <p>Write to you: ${fullname}</p>
        <p>Whose email is: ${email}</p>
        ${phone ? `<p>Whose Phone Number is: ${phone}</p>` : ""}
        ${service ? `<p>Service to consult: ${service}</p>` : ""}
        <div class="message">
          <p>Message sent:</p>
          <p>${message}</p>
        </div>
      </div>
    </body>
  </html>
`,
      };

      await transporter.sendMail(mailOptions);

      user.requestCount += 1;
      user.lastRequest = new Date();
      await user.save();

      res.status(200).json({ message: "Form sent successfully" });
    } catch (error) {
      console.error("Failed to send email, try again in 3 minutes", error);
      res.status(500).json({ error: "Failed to send, try again in 3 minutes" });
    }
  },
];
