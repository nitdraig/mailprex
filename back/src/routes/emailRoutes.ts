import express, { Router } from "express";
import { checkRequestLimit } from "../middlewares/requestLimitMiddleware";
import { sendEmail } from "../controllers";

const router: Router = express.Router();

router.post("/send", checkRequestLimit, sendEmail);

export default router;
