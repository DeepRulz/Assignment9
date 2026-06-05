const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const visitorRoutes = require("./routes/visitor");
const appointmentRoutes = require("./routes/appointment");
const passRoutes = require("./routes/pass");
const checklogRoutes = require("./routes/checklog");
const rateLimit = require("express-rate-limit");

const app = express();
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message: "Too many login attempts. Please try again later."
    }
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200
});

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://assignment91234.netlify.app"
        ],
        credentials: true
    })
);

app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Visitor Pass Management System API"
    });

});

app.use(apiLimiter);
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/visitors",visitorRoutes);
app.use("/api/appointments",appointmentRoutes);
app.use("/api/passes",passRoutes);
app.use("/api/checklog",checklogRoutes);

module.exports = app;