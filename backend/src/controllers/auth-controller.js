const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authService = require("../services/auth-service");

exports.registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });

        }

        const existingUser =
            await authService.findUserByEmail(email);

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            await authService.createUser({
                name,
                email,
                password: hashedPassword,
                role
            });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.loginUser = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const user =
            await authService.findUserByEmail(email);

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });

        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            token: token
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};