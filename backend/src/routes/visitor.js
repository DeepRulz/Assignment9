const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/auth");

const visitorController =
    require("../controllers/visitor-controller");

router.post(
    "/",
    auth,
    visitorController.addVisitor
);

router.get(
    "/",
    auth,
    visitorController.getAllVisitors
);

router.patch(
    "/:id",
    auth,
    visitorController.updateVisitor
);

router.delete(
    "/:id",
    auth,
    visitorController.deleteVisitor
);
router.get(
    "/search",
    auth,
    visitorController.searchVisitors
);
module.exports = router;