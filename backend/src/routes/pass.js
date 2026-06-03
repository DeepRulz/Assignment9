const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/auth");

const passController =
    require("../controllers/pass-controller");

router.post(
    "/generate/:appointmentId",
    auth,
    passController.generatePass
);

router.get(
    "/",
    auth,
    passController.getAllPasses
);

router.get(
    "/:id",
    auth,
    passController.getPassById
);

router.get(
    "/pdf/:id",
    passController.generatePdf
);

module.exports = router;