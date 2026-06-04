const express = require("express");

const router = express.Router();

const auth =
    require("../middleware/auth");

const upload =
    require("../middleware/upload");

const roleCheck =
    require("../middleware/role");

const visitorController =
    require("../controllers/visitor-controller");

router.post(
    "/",
    auth,
    roleCheck(
        "admin",
        "employee"
    ),
    upload.single("photo"),
    visitorController.addVisitor
);

router.get(
    "/",
    auth,
    roleCheck(
        "admin",
        "employee",
        "security"
    ),
    visitorController.getAllVisitors
);

router.patch(
    "/:id",
    auth,
    roleCheck(
        "admin"
    ),
    visitorController.updateVisitor
);

router.delete(
    "/:id",
    auth,
    roleCheck(
        "admin"
    ),
    visitorController.deleteVisitor
);

router.get(
    "/search",
    auth,
    roleCheck(
        "admin",
        "employee",
        "security"
    ),
    visitorController.searchVisitors
);

module.exports = router;