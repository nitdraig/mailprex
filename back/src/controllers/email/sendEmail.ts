import { Response } from "express";
import { body, validationResult } from "express-validator";
import { CustomRequest } from "../../types/CustomRequest";
import Send from "../../models/sendModel";
import { transporter } from "../../config/transporterConfig";
import { escapeHtml } from "../../utils/escapeHtml";
import { isLegacyFormToken } from "../../utils/formToken";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = [
  body("emailDestiny").isEmail().withMessage("Invalid destination email"),
  body("fullname").notEmpty().withMessage("The name is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("message").notEmpty().withMessage("The message is required"),
  body("webName").notEmpty().withMessage("The website name is required"),
  body("formToken").notEmpty().withMessage("Form token is required"),

  async (req: CustomRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Invalid form token" });
    }

    const {
      fullname,
      email,
      message,
      phone,
      service,
      webName,
      emailDestiny,
    } = req.body;

    const normalizedDestiny = String(emailDestiny).toLowerCase();

    if (normalizedDestiny !== user.email.toLowerCase()) {
      return res.status(403).json({
        message: "Destination email must match the account owner email",
      });
    }

    const safeWebName = escapeHtml(webName);
    const safeFullname = escapeHtml(fullname);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "";
    const safeService = service ? escapeHtml(service) : "";
    const safeMessage = escapeHtml(message);

    const mailOptions = {
      from: process.env.EMAILSEND!,
      to: normalizedDestiny,
      subject: `A new message from your site: ${safeWebName}`,
      html: `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
          color: #1f1f20;
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
          color: #2b4c7e;
          margin-bottom: 15px;
        }
        p {
          margin-bottom: 10px;
        }
        .message {
          border-left: 5px solid #007bff;
          padding-left: 10px;
          background-color: #dce0e6;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>From your web ${safeWebName}</h2>
        <p>Write to you: ${safeFullname}</p>
        <p>Whose email is: ${safeEmail}</p>
        ${safePhone ? `<p>Whose Phone Number is: ${safePhone}</p>` : ""}
        ${safeService ? `<p>Service to consult: ${safeService}</p>` : ""}
        <div class="message">
          <p>Message sent:</p>
          <p>${safeMessage}</p>
        </div>
      </div>
    </body>
  </html>
`,
    };

    try {
      await transporter.sendMail(mailOptions);

      user.requestCount += 1;
      user.lastRequest = new Date();
      await user.save();

      await Send.create({
        userId: user._id,
        to: normalizedDestiny,
        webName,
        status: "sent",
      });

      if (isLegacyFormToken(user)) {
        res.setHeader("X-Mailprex-Token-Legacy", "true");
      }

      res.status(200).json({ message: "Form sent successfully" });
    } catch (error) {
      console.error("Failed to send email, try again in 3 minutes", error);

      await Send.create({
        userId: user._id,
        to: normalizedDestiny,
        webName,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      }).catch((logError) => {
        console.error("Failed to log send attempt:", logError);
      });

      res.status(500).json({ error: "Failed to send, try again in 3 minutes" });
    }
  },
];
