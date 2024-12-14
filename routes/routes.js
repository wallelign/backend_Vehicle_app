const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

// Vehicle routes
router.post("/vehicle", vehicleController.addVehicle);
router.get("/vehicle", vehicleController.getVehicles);
router.patch("/vehicles/:id", vehicleController.updateStatus);

module.exports = router;
