const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/auth");

const checklogController =
    require("../controllers/checklog-controller");

router.post(
    "/checkin/:passId",
    auth,
    checklogController.checkIn
);

router.post(
    "/checkout/:passId",
    auth,
    checklogController.checkOut
);

router.get(
    "/",
    auth,
    checklogController.getLogs
);

module.exports = router;