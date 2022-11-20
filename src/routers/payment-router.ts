import { Router } from "express";

import { authenticateToken } from "@/middlewares";

import { getPayment, postPayment } from "@/controllers/payment-controller";

const paymentRouter = Router();

paymentRouter.all("/*", authenticateToken);
paymentRouter.get("/", getPayment);
paymentRouter.post("/process", postPayment);

export { paymentRouter };
