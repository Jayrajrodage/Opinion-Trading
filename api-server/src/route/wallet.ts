import express from "express";
import { getEventDetails } from "../controller/event";
import { getBalance } from "../controller/wallet";

const router = express.Router();

router.get("/balance", getBalance);

router.get("/event/:id", getEventDetails);

export default router;
