import express from "express";
import { getBalance, updateBalance } from "../controller/wallet";

const router = express.Router();

router.get("/balance", getBalance);

router.post("/balance", updateBalance);

export default router;
