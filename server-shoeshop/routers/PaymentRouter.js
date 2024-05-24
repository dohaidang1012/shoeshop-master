import express from "express";
import {
  createPayment,
  returnPayment,
  inpPayment,
} from "../controllers/PaymentController.js";
import { isAuth, isAdmin } from "../untils/until.js";

const PaymentRouter = express.Router();

PaymentRouter.post("/create", createPayment);
PaymentRouter.get("/vnpay_return", returnPayment);
PaymentRouter.get("/vnpay_ipn", inpPayment);

export default PaymentRouter;
