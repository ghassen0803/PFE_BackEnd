const express = require("express");
const { GetRes,PostRes,GetResById,DeleteRes  } = require("../controllers/reservation.controllers");

const router = express.Router();

router.get("/reservation", GetRes);
router.get("/reservation/:id",GetResById);
router.post("/reservation",PostRes);
router.delete("/reservation/:id",DeleteRes);