import express, { Application, Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import emailRoutes from "./routes/emailRoutes";
import authRoutes from "./routes/authRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import billingRoutes from "./routes/billingRoutes";
import emailVerify from "./routes/emailVerify";
import { gumroadPing } from "./controllers/billingController";
import dotenv from "dotenv";
import connectDB from "./connectDB";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import { mailprexMode } from "./config/mailprexMode";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT ?? "5000", 10);

app.set("trust proxy", 1);

const defaultCorsOrigins = ["https://mailprex.excelso.xyz"];

const allowedCorsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
  : defaultCorsOrigins;

const appCorsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || allowedCorsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

const emailRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  message: "You have exceeded your request limit, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

app.options(/.*/, (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/email")) {
    cors({ origin: "*" })(req, res, next);
    return;
  }
  cors(appCorsOptions)(req, res, next);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/email")) {
    next();
    return;
  }
  cors(appCorsOptions)(req, res, next);
});

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
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
  }),
);

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    }),
  );
}

app.post(
  "/billing/gumroad/ping",
  express.urlencoded({ extended: true }),
  gumroadPing,
);

app.use(cookieParser());
app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "25kb" }));

app.get("/", (_req: Request, res: Response) => {
  res.send(`
    <title>Mailprex API | Send forms from your web with ease</title>
     <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Welcome to Mailprex API </h1>
        <p>Mode: <strong>${mailprexMode}</strong></p>
        <p>For more information, see the <a href="https://docs.mailprex.excelso.xyz" style="color: #2b4c7e;">Documentation</a></p>
        <a href="https://mailprex.excelso.xyz" style="color: #2b4c7e;"> -> Mailprex Web <- </a>
     </div>
  `);
});

app.use("/email", cors({ origin: "*" }), emailRateLimiter, emailRoutes);
app.use("/auth", authRoutes);
app.use("/token", tokenRoutes);
app.use("/billing", billingRoutes);
app.use("/verify", emailVerify);

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path !== "/") {
    return res.status(404).send(`
    <title>404 | Mailprex API</title>
     <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>Not Found</h1>
        <p>For more information, see the <a href="https://docs.mailprex.excelso.xyz" style="color: #2b4c7e;">Documentation</a></p>
        <a href="https://mailprex.excelso.xyz" style="color: #2b4c7e;"> -> Mailprex Web <- </a>
     </div>
  `);
  }
  next();
});

connectDB();

app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
