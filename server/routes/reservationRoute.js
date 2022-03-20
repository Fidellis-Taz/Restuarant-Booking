import express from "express";

const router = express.Router();

// controllers
import {
    reservation
} from "../controllers/reservation";


router.post("/reserve", reservation);

module.exports = router;
