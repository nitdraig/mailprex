import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import emailRoutes from "./routes/emailRoutes";
import authRoutes from "./routes/authRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import emailVerify from "./routes/emailVerify";
import dotenv from "dotenv";
import connectDB from "./connectDB";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT!, 10);
const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  message: "You have exceeded your request limit, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-cdn.com"],
      styleSrc: ["'self'", "trusted-cdn.com"],
      imgSrc: ["'self'", "data:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "25kb" }));

app.get("/", (req: Request, res: Response) => {
  res.send(`
 
    <title>Mailprex API | Send forms from your web with ease</title>
     <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Welcome to Mailprex API </h1>
        <p>This is the root of the API. For more information, see the <a href="https://docs.mailprex.excelso.xyz" style="color: #2b4c7e;">Documentation</a></p>
        <a href="https://mailprex.excelso.xyz" style="color: #2b4c7e;"> -> Mailprex Web <- </a>
     </div>
  `);
});

app.use("/email", cors({ origin: "*" }), emailRateLimiter, emailRoutes);

const corsOptions = {
  origin: "https://excelso.xyz",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use("/auth", cors(corsOptions), authRoutes);
app.use("/token", cors(corsOptions), tokenRoutes);
app.use("/verify", cors(corsOptions), emailVerify);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path !== "/") {
    return res.status(404).send(`
 
    <title>404 | Mailprex API</title>
     <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Not Found</h1>
        <p>This is the root of the API. For more information, see the <a href="https://docs.mailprex.excelso.xyz" style="color: #2b4c7e;">Documentation</a></p>
        <a href="https://mailprex.excelso.xyz" style="color: #2b4c7e;"> -> Mailprex Web <- </a>
     </div>
  `);
  }
  next();
});

connectDB();

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
