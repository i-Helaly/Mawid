const Doctor = require("../models/doctor");
const resResponse = require("../utils/jsend");

const createDoctors = async (req, res) => {
    try {
        const doctor = await Doctor.create(req.body);
        res.status(201).json({ status: resResponse.SUCCESS, data: { doctor } })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            status: resResponse.ERROR,
            data: {
                msg: "Internal server error"
            }
        });
    }
}

const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.status(200).json({ status: resResponse.SUCCESS, data: { doctors } })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            status: resResponse.ERROR,
            data: {
                msg: "Internal server error"
            }
        });
    }
}

const getADoctor = async (req, res) => {
    try {
        const docId = req.params.id;
        const doctor = await Doctor.findById(docId);
        if (!doctor) {
            return res.status(404).json({ status: resResponse.FAIL, data: { msg: "Doctor not found" } })
        }
        res.status(200).json({ status: resResponse.SUCCESS, data: { doctor } })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: resResponse.ERROR,
            data: {
                msg: "Internal server error"
            }
        });
    }
}

const updateADoctor = async (req, res) => {
    try {
        const docId = req.params.id;
        const doctor = await Doctor.findByIdAndUpdate(docId, req.body, {
            new: true,
            runValidators: true
        });
        if (!doctor) {
            return res.status(404).json({
                status: resResponse.FAIL,
                data: { msg: "Doctor not found" }
            });
        }
        res.status(200).json({ status: resResponse.SUCCESS, data: { doctor } })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            status: resResponse.ERROR,
            data: {
                msg: "Internal server error"
            }
        });
    }
}
const deleteADoctor = async (req, res) => {
    try {
        const docId = req.params.id;
        const doctor = await Doctor.findByIdAndDelete(docId);
        if (!doctor) {
            return res.status(404).json({
                status: resResponse.FAIL,
                data: { msg: "Doctor not found" }
            });
        }
        res.status(200).json({ status: resResponse.SUCCESS, data: { doctor } })
    } catch (err) {
        console.log(err);

        return res.status(500).json({
            status: resResponse.ERROR,
            data: {
                msg: "Internal server error"
            }
        });
    }
}

module.exports = {
    createDoctors,
    getAllDoctors,
    getADoctor,
    updateADoctor,
    deleteADoctor
}