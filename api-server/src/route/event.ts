import express from "express";
import { getEvent, getEventDetails } from "../controller/event";

const router = express.Router();

router.get("/events", getEvent);

router.get("/event/:id", getEventDetails);

export default router;
