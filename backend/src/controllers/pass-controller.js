const passService =
    require("../services/pass-service");

const Appointment =
    require("../models/appointment-model");

const Pass = require("../models/pass-model");
const QRCode = require("qrcode");
const PDFDocument = require("pdfkit");
exports.generatePass = async (
    req,
    res
) => {

    try {

        const appointmentId =
            req.params.appointmentId;

        const appointment =
            await Appointment.findById(
                appointmentId
            );

        if (!appointment) {

            return res.status(404).json({
                success: false,
                message:
                    "Appointment not found"
            });

        }

        if (
            appointment.status !==
            "approved"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Appointment not approved"
            });

        }

        const qrData =
            `PASS-${appointmentId}`;
        const qrImage = await QRCode.toDataURL(qrData);
        const existingPass =
            await Pass.findOne({
                appointmentId
            });

        if (existingPass) {

            return res.status(400).json({
                success: false,
                message:
                    "Pass already generated"
            });

        }
        const pass =
            await passService.createPass({
                appointmentId:
                appointmentId,
                qrData:
                qrData,
                qrImage:
                qrImage,
                issuedBy:
                req.user.id,
                validTill:
                appointment.visitDate
            });

        res.status(201).json({
            success: true,
            message:
                "Pass generated",
            data: pass
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getAllPasses =
    async (req, res) => {

        try {

            const passes =
                await passService.getPasses();

            res.status(200).json({
                success: true,
                data: passes
            });

        }
        catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.getPassById =
    async (req, res) => {

        try {

            const pass =
                await passService.getPassById(
                    req.params.id
                );

            res.status(200).json({
                success: true,
                data: pass
            });

        }
        catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    };

exports.generatePdf = async (
    req,
    res
) => {

    try {

        const pass =
            await passService.getPassById(
                req.params.id
            );

        if (!pass) {

            return res.status(404).json({
                success: false,
                message: "Pass not found"
            });

        }

        const doc =
            new PDFDocument();

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=pass-${pass._id}.pdf`
        );

        doc.pipe(res);

        doc.fontSize(20)
            .text(
                "Visitor Pass",
                {
                    align: "center"
                }
            );

        doc.moveDown();

        doc.fontSize(12)
            .text(
                `Visitor: ${pass.appointmentId.visitorId.name}`
            );

        doc.text(
            `Host: ${pass.appointmentId.hostId.name}`
        );

        doc.text(
            `Purpose: ${pass.appointmentId.purpose}`
        );

        doc.text(
            `Visit Date: ${pass.appointmentId.visitDate}`
        );

        doc.text(
            `Pass ID: ${pass._id}`
        );

        const base64Data =
            pass.qrImage.replace(
                /^data:image\/png;base64,/,
                ""
            );

        const qrBuffer =
            Buffer.from(
                base64Data,
                "base64"
            );

        doc.moveDown();

        doc.text("QR Code:");

        doc.image(
            qrBuffer,
            {
                width: 150
            }
        );

        doc.end();

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};