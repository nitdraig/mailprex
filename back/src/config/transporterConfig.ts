import nodemailer from "nodemailer";

function createTransporter() {
  const smtpHost = process.env.MAILPREX_SMTP_HOST;

  if (smtpHost) {
    const port = parseInt(process.env.MAILPREX_SMTP_PORT ?? "587", 10);
    return nodemailer.createTransport({
      host: smtpHost,
      port,
      secure: process.env.MAILPREX_SMTP_SECURE === "true" || port === 465,
      auth: {
        user: process.env.MAILPREX_SMTP_USER,
        pass: process.env.MAILPREX_SMTP_PASS,
      },
    });
  }

  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAILSEND!,
      pass: process.env.PASS!,
    },
  });
}

export const transporter = createTransporter();
