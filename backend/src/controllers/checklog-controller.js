const checklogService = require("../services/checklog-service");
const Pass = require("../models/pass-model");
const Checklog = require("../models/checklog-model");

exports.checkIn = async (req, res) => {

    try {

        const passId = req.params.passId;

        const log = await checklogService.createCheckIn(passId);

        res.status(201).json({
            success: true,
            message: "Checked In",
            data: log
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.checkOut = async (req, res) => {

    try {

        const passId = req.params.passId;

        const log = await checklogService.checkOut(passId);

        if (!log) {

            return res.status(404).json({
                success: false,
                message: "Check In record not found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Checked Out",
            data: log
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.scanQR = async (req, res) => {

    try {

        const { qrData } = req.body;

        if (!qrData) {

            return res.status(400).json({
                success: false,
                message: "QR data missing"
            });

        }

        const pass = await Pass.findOne({ qrData });

        if (!pass) {

            return res.status(404).json({
                success: false,
                message: "Invalid Pass"
            });

        }

        if (new Date(pass.validTill) < new Date()) {

            return res.status(400).json({
                success: false,
                message: "Pass expired"
            });

        }

        const activeLog = await Checklog.findOne({
            passId: pass._id,
            checkOutTime: null
        });

        if (!activeLog) {

            const log = await checklogService.createCheckIn(pass._id);

            return res.status(200).json({
                success: true,
                action: "checkin",
                message: "Checked In",
                data: log
            });

        }

        const log = await checklogService.checkOut(pass._id);

        return res.status(200).json({
            success: true,
            action: "checkout",
            message: "Checked Out",
            data: log
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getLogs = async (req, res) => {

    try {

        const logs = await checklogService.getLogs();

        res.status(200).json({
            success: true,
            data: logs
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};