# Mailprex | Send Emails from your Website with Ease

## This is a simple application that uses Express and TypeScript to send emails using the nodemailer service.

### Setting

- Installation of Dependencies:
  \*\*npm install, yarn add package.json or bun add package.json

### Environment Variables Configuration:

- Create a .env file in the root of the project.
- Define the following environment variables in the .env file:
  PASS=
  EMAILSEND=
  JWT_SECRET=

### Use:

- Start the Server: npm run dev, yarn run dev or bun run dev
- The server will start on the port specified in the PORT environment variable or port 5000 by default.
- Send an e-mail:

*Make a POST request to the /send-email route with the following fields in the request body:
*fullname: Full name of the sender.\*
_email: Email of the sender._
_message: Message to send._
_phone: Phone number of the sender._
_service: Service to consult._
_webName: Name of the web page._
_emailDestiny: Destination email._

### Project Structure

src/: Folder containing the source code of the application.
controllers/: Application controllers.
routes/: Application routes.
index.ts: Application entry point.

### Contribution

Contributions are welcome! If you want to improve this project, feel free to submit a pull request!

### License

This project is licensed under the MIT License. See the LICENSE file for more details.
