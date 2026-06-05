const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const router = express.Router();

const auth =
    require("../middleware/auth");

const roleCheck =
    require("../middleware/role");

const appointmentController =
    require(
        "../controllers/appointment-controller"
    );

router.post(
    "/",
    auth,
    roleCheck(
        "admin",
        "employee"
    ),

    body("visitorId")
        .notEmpty()
        .withMessage("Visitor required"),

    body("purpose")
        .trim()
        .notEmpty()
        .withMessage("Purpose required"),

    body("visitDate")
        .notEmpty()
        .withMessage("Visit date required"),

    validate,

    appointmentController.addAppointment
);

router.get(
    "/",
    auth,
    roleCheck(
        "admin",
        "employee",
        "security"
    ),
    appointmentController.getAllAppointments
);

router.patch(
    "/:id",
    auth,
    roleCheck(
        "admin"
    ),
    appointmentController.updateAppointment
);

router.delete(
    "/:id",
    auth,
    roleCheck(
        "admin"
    ),
    appointmentController.deleteAppointment
);

router.patch(
    "/:id/approve",
    auth,
    roleCheck(
        "admin"
    ),
    appointmentController.approveAppointment
);

router.patch(
    "/:id/reject",
    auth,
    roleCheck(
        "admin"
    ),
    appointmentController.rejectAppointment
);

module.exports = router;