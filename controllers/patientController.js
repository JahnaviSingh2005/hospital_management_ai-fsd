const Patient = require("../models/Patient");

// @desc    Register a new patient
// @route   POST /patients
const registerPatient = async (req, res, next) => {
    try {
        const patient = await Patient.create(req.body);
        res.status(201).json({
            success: true,
            message: "Patient registered successfully",
            data: patient,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all patients
// @route   GET /patients
const getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get patient by ID
// @route   GET /patients/:id
const getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            data: patient,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update patient by ID
// @route   PUT /patients/:id
const updatePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient updated successfully",
            data: patient,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete patient by ID
// @route   DELETE /patients/:id
const deletePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search patient by name
// @route   GET /patients/search?name=xyz
const searchPatient = async (req, res, next) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please provide a name to search",
            });
        }

        const patients = await Patient.find({
            fullName: { $regex: name, $options: "i" },
        });

        res.status(200).json({
            success: true,
            count: patients.length,
            data: patients,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    registerPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
    searchPatient,
};
