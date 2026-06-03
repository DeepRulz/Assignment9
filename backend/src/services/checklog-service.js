const CheckLog = require("../models/checklog-model");

exports.createCheckIn = async (passId) => {

    return await CheckLog.create({
        passId: passId,
        checkInTime: new Date()
    });

};

exports.checkOut = async (passId) => {

    const log = await CheckLog.findOne({
        passId: passId,
        checkOutTime: null
    });

    if (!log) {
        return null;
    }

    log.checkOutTime = new Date();

    await log.save();

    return log;
};

exports.getLogs = async () => {

    return await CheckLog.find()
        .populate("passId");

};