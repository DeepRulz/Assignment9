const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/auth");

const roleCheck =
    require("../middleware/role");

const passController =
    require("../controllers/pass-controller");

router.post(
    "/generate/:appointmentId",
    auth,
    roleCheck(
        "admin"
    ),
    passController.generatePass
);

router.get(
    "/",
    auth,
    roleCheck(
        "admin",
        "employee",
        "security"
    ),
    passController.getAllPasses
);

router.get(
    "/:id",
    auth,
    roleCheck(
        "admin",
        "employee",
        "security"
    ),
    passController.getPassById
);

router.get(
    "/pdf/:id",
    auth,
    roleCheck(
        "admin",
        "employee",
        "security"
    ),
    passController.generatePdf
);

module.exports = router;