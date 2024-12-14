const Vehicle = require("../models/vehicleModel");
addVehicle = async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json({ vehicle });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

getVehicles = async (req, res) => {
  try {
    const vehicle = await Vehicle.find().sort({ date: -1 });
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required." });
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found." });
    }

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.error(error);
  }
};

module.exports = {
  addVehicle,
  getVehicles,
  updateStatus,
};
