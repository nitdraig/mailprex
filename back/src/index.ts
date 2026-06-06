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

const defaultCorsOrigins = [
  "https://mailprex.excelso.xyz",
  "https://www.mailprex.excelso.xyz",
  "http://localhost:3000",
];

const envCorsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean)
  : [];

const allowedCorsOrigins = [
  ...new Set([...defaultCorsOrigins, ...envCorsOrigins]),
];

const isOriginAllowed = (origin: string | undefined): boolean => {
  if (!origin) {
    return true;
  }
  if (allowedCorsOrigins.includes("*")) {
    return true;
  }
  return allowedCorsOrigins.includes(origin);
};

const appCorsOptions: CorsOptions = {
  origin(origin, callback) {
    if (isOriginAllowed(origin)) {
      callback(null, origin || true);
      return;
    }
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

const applyCors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  cors(appCorsOptions)(req, res, next);
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
  applyCors(req, res, next);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/email")) {
    next();
    return;
  }
  applyCors(req, res, next);
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
  })
);

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    })
  );
}

app.post(
  "/billing/gumroad/ping",
  express.urlencoded({ extended: true }),
  gumroadPing
);

app.use(cookieParser());
app.use(morgan("combined"));
app.use(bodyParser.json({ limit: "25kb" }));

app.use(async (_req: Request, _res: Response, next: NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

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
  if (req.path === "/") {
    next();
    return;
  }

  applyCors(req, res, () => {
    res.status(404).json({ message: "Not found" });
  });
});

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  applyCors(req, res, () => {
    console.error(err);
    if (res.headersSent) {
      return;
    }
    res.status(500).json({ error: "Something went wrong!" });
  });
});

if (!process.env.VERCEL) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Servidor Express iniciado en el puerto ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to start server:", error);
      process.exit(1);
    });
}

export default app;
