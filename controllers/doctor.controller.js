const Doctor = require("../models/doctor");
const resResponse = require("../utils/jsend");
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail");

const createDoctors = async (req, res) => {
    try {
        const {
            name,
            email,
            specialty,
            slotDuration,
            workWeek
        } = req.body;

        const invitationToken = crypto.randomBytes(31).toString("hex");

        const invitationTokenHash = crypto
            .createHash("sha256")
            .update(invitationToken)
            .digest("hex");

        const invitationExpiresAt = new Date(
            Date.now() + 24 * 60 * 60 * 1000
        );

        const doctor = await Doctor.create({
            name,
            email,
            specialty,
            slotDuration,
            workWeek,
            invitationStatus: "pending",
            invitationTokenHash,
            invitationExpiresAt
        });

        // Create invitation URL
        const invitationUrl =
            `${process.env.APP_BASE_URL}/accept-invitation?token=${invitationToken}`;

        // Send invitation email
        await sendEmail({
            to: doctor.email,
            subject: "Welcome to Mawid - Doctor Invitation",
            text: `Hello ${doctor.name},

You have been invited to join Mawid.

Please use the following link to set your password:

${invitationUrl}

This invitation expires in 24 hours.`
        });

        return res.status(201).json({
            status: resResponse.SUCCESS,
            data: {
                msg: "Doctor created and invitation email sent successfully",
                doctor: {
                    id: doctor._id,
                    name: doctor.name,
                    email: doctor.email,
                    specialty: doctor.specialty,
                    invitationStatus: doctor.invitationStatus
                }
            }
        });

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