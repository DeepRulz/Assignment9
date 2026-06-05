const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");
const checklogController = require("../controllers/checklog-controller");

router.post(
    "/checkin/:passId",
    auth,
    roleCheck(
        "admin",
        "security"
    ),
    checklogController.checkIn
);

router.post(
    "/checkout/:passId",
    auth,
    roleCheck(
        "admin",
        "security"
    ),
    checklogController.checkOut
);

router.get(
    "/",
    auth,
    roleCheck(
        "admin",
        "security"
    ),
    checklogController.getLogs
);
router.post(
    "/scan",
    auth,
    roleCheck("admin", "security"),
    checklogController.scanQR
);
module.exports = router;