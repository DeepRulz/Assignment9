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

exports.approveAppointment = async (
    id
) => {

    return await Appointment.findByIdAndUpdate(
        id,
        {
            status: "approved"
        },
        {
            new: true
        }
    );

};

exports.rejectAppointment = async (
    id
) => {

    return await Appointment.findByIdAndUpdate(
        id,
        {
            status: "rejected"
        },
        {
            new: true
        }
    );

};