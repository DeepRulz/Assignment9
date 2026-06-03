const Pass = require("../models/pass-model");

exports.createPass = async (passData) => {

    return await Pass.create(
        passData
    );

};

exports.getPasses = async () => {

    return await Pass.find()
        .populate("appointmentId")
        .populate("issuedBy");

};

exports.getPassById = async (id) => {

    return await Pass.findById(id)
        .populate({
            path: "appointmentId",
            populate: [
                {
                    path: "visitorId"
                },
                {
                    path: "hostId",
                    select:"-password"
                }
            ]
        })
        .populate("issuedBy","-password");

};