const Appointment = require(
    "../models/appointment-model"
);

exports.createAppointment = async (
    appointmentData
) => {

    return await Appointment.create(
        appointmentData
    );

};

exports.getAppointments = async () => {

    return await Appointment.find()
        .populate("visitorId")
        .populate("hostId");

};

exports.updateAppointment = async (
    id,
    updatedData
) => {

    return await Appointment.findByIdAndUpdate(
        id,
        updatedData,
        {
            new: true
        }
    );

};

exports.deleteAppointment = async (
    id
) => {

    return await Appointment.findByIdAndDelete(
        id
    );

};

exports.approveAppointment =
    async (id) => {

        await Appointment.findByIdAndUpdate(
            id,
            {
                status: "approved"
            }
        );

        return await Appointment.findById(
            id
        )
            .populate("visitorId")
            .populate("hostId");

    };

exports.rejectAppointment =
    async (id) => {

        await Appointment.findByIdAndUpdate(
            id,
            {
                status: "rejected"
            }
        );

        return await Appointment.findById(
            id
        )
            .populate("visitorId")
            .populate("hostId");

    };