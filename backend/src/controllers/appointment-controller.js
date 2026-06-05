const appointmentService = require("../services/appointment-service");
const { sendEmail } = require("../utils/email");
const { sendSMS } = require("../utils/sms");

exports.addAppointment = async (req, res) => {
    try {
        const { visitorId, purpose, visitDate } = req.body;
        if (!visitorId || !purpose || !visitDate) {
            return res.status(400).json({ success: false, message: "Visitor, purpose and visit date are required" });
        }
        if (purpose.trim().length < 3) {
            return res.status(400).json({ success: false, message: "Purpose must be at least 3 characters" });
        }
        const selectedDate = new Date(visitDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            return res.status(400).json({ success: false, message: "Visit date cannot be in the past" });
        }
        const appointment = await appointmentService.createAppointment({
            visitorId,
            hostId: req.user.id,
            purpose,
            visitDate
        });
        console.log("Appointment created:", appointment._id);
        res.status(201).json({ success: true, message: "Appointment created", data: appointment });
        } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentService.getAppointments();
        res.status(200).json({ success: true, data: appointments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        const { purpose, visitDate } = req.body;
        if (purpose && purpose.trim().length < 3) {
            return res.status(400).json({ success: false, message: "Purpose must be at least 3 characters" });
        }
        if (visitDate) {
            const selectedDate = new Date(visitDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                return res.status(400).json({ success: false, message: "Visit date cannot be in the past" });
            }
        }
        const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.deleteAppointment(req.params.id);
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.approveAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.approveAppointment(req.params.id);
        if (appointment?.visitorId?.email) {
            await sendEmail(
                appointment.visitorId.email,
                "Appointment Approved",
                `Hello ${appointment.visitorId.name},\n\nYour appointment for "${appointment.purpose}" has been approved.\n\nVisit Date:\n${appointment.visitDate}\n\nThank You.`
            );
        }
        if (appointment?.visitorId?.phone) {
            await sendSMS(
                appointment.visitorId.phone,
                `Your appointment for "${appointment.purpose}" has been approved. Visit Date: ${appointment.visitDate}`
            );
        }
        res.status(200).json({ success: true, message: "Appointment approved", data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.rejectAppointment = async (req, res) => {
    try {
        const appointment = await appointmentService.rejectAppointment(req.params.id);
        if (appointment?.visitorId?.email) {
            await sendEmail(
                appointment.visitorId.email,
                "Appointment Rejected",
                `Hello ${appointment.visitorId.name},\n\nYour appointment for "${appointment.purpose}" has been rejected.\n\nThank You.`
            );
        }
        if (appointment?.visitorId?.phone) {
            await sendSMS(
                appointment.visitorId.phone,
                `Your appointment for "${appointment.purpose}" has been rejected.`
            );
        }
        res.status(200).json({ success: true, message: "Appointment rejected", data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
