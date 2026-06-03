const appointmentService =
    require("../services/appointment-service");

exports.addAppointment = async (
    req,
    res
) => {

    try {

        const {
            visitorId,
            purpose,
            visitDate
        } = req.body;

        const appointment =
            await appointmentService.createAppointment({
                visitorId,
                hostId: req.user.id,
                purpose,
                visitDate
            });

        res.status(201).json({
            success: true,
            message:
                "Appointment created",
            data: appointment
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getAllAppointments =
    async (req, res) => {

        try {

            const appointments =
                await appointmentService.getAppointments();

            res.status(200).json({
                success: true,
                data: appointments
            });

        }
        catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.updateAppointment =
    async (req, res) => {

        try {

            const appointment =
                await appointmentService.updateAppointment(
                    req.params.id,
                    req.body
                );

            res.status(200).json({
                success: true,
                data: appointment
            });

        }
        catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.deleteAppointment =
    async (req, res) => {

        try {

            const appointment =
                await appointmentService.deleteAppointment(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                data: appointment
            });

        }
        catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.approveAppointment =
    async (req, res) => {

        try {

            const appointment =
                await appointmentService.approveAppointment(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                message:
                    "Appointment approved",
                data: appointment
            });

        }
        catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.rejectAppointment =
    async (req, res) => {

        try {

            const appointment =
                await appointmentService.rejectAppointment(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                message:
                    "Appointment rejected",
                data: appointment
            });

        }
        catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };