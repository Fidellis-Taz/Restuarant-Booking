import express from "express";

const router = express.Router();

// controllers
import {
available
} from "../controllers/available";

router.post("/available", available);


module.exports = router;