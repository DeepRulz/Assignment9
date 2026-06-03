const express = require("express");
const auth = require("../middleware/auth")
const router = express.Router();

const authController =
    require("../controllers/auth-controller");

router.post(
    "/register",
    authController.registerUser
);

router.post(
    "/login",
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

module.exports = router;