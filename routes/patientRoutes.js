const express = require("express");
const router = express.Router();

const {
    registerPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    searchPatient,
} = require("../controllers/patientController");

// Search must be placed BEFORE /:id to avoid conflicts
router.get("/search", searchPatient);

router.post("/", registerPatient);
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

module.exports = router;
