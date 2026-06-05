const express = require("express");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

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

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("phone")
        .isLength({ min: 10 })
        .withMessage("Valid phone number required"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email"),

    validate,

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