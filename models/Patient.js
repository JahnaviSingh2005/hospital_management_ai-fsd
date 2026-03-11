const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: [true, "Phone number is required"],
            trim: true,
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [1, "Age must be a positive number"],
        },
        gender: {
            type: String,
            enum: ["Male", "Female", "Other"],
            default: "Male",
        },
        disease: {
            type: String,
            required: [true, "Disease / Diagnosis is required"],
            trim: true,
        },
        doctorAssigned: {
            type: String,
            required: [true, "Doctor assigned is required"],
            trim: true,
        },
        admissionDate: {
            type: Date,
            default: Date.now,
        },
        roomNumber: {
            type: String,
            default: "N/A",
        },
        patientType: {
            type: String,
            enum: ["Inpatient", "Outpatient"],
            default: "Inpatient",
        },
        status: {
            type: String,
            enum: ["Admitted", "Discharged", "Under Treatment"],
            default: "Admitted",
        },
    },
    {
        timestamps: true,
    }
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
