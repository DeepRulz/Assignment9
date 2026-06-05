const express = require("express");
const auth = require("../middleware/auth")
const router = express.Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");

const authController =
    require("../controllers/auth-controller");

router.post(
    "/register",

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Valid email required"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    validate,

    authController.registerUser
);

router.post(
    "/login",

    body("email")
        .isEmail()
        .withMessage("Valid email required"),

    body("password")
        .notEmpty()
        .withMessage("Password required"),

    validate,

    authController.loginUser
);

router.get(
    "/test",
    auth,
    (req, res) => {

        res.json({
            user: req.user
        });

    }
);
router.post(
    "/register-visitor",
    authController.registerVisitor
);
module.exports = router;