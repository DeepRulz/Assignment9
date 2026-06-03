const checklogService =
    require("../services/checklog-service");

exports.checkIn = async (
    req,
    res
) => {

    try {

        const passId =
            req.params.passId;

        const log =
            await checklogService.createCheckIn(
                passId
            );

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

exports.checkOut = async (
    req,
    res
) => {

    try {

        const passId =
            req.params.passId;

        const log =
            await checklogService.checkOut(
                passId
            );

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

exports.getLogs = async (
    req,
    res
) => {

    try {

        const logs =
            await checklogService.getLogs();

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