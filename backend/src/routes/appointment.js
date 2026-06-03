const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/auth");

const appointmentController =
    require(
        "../controllers/appointment-controller"
    );

router.post(
    "/",
    auth,
    appointmentController.addAppointment
);

router.get(
    "/",
    auth,
    appointmentController.getAllAppointments
);

router.patch(
    "/:id",
    auth,
    appointmentController.updateAppointment
);

router.delete(
    "/:id",
    auth,
    appointmentController.deleteAppointment
);

router.patch(
    "/:id/approve",
    auth,
    appointmentController.approveAppointment
);

router.patch(
    "/:id/reject",
    auth,
    appointmentController.rejectAppointment
);

module.exports = router;