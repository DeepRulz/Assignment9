const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const visitorRoutes = require("./routes/visitor");
const appointmentRoutes = require("./routes/appointment");
const passRoutes = require("./routes/pass");
const checklogRoutes = require("./routes/checklog");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Visitor Pass Management System API"
    });

});

app.use("/api/auth",authRoutes);
app.use("/api/visitors",visitorRoutes);
app.use("/api/appointments",appointmentRoutes);
app.use("/api/passes",passRoutes);
app.use("/api/checklog",checklogRoutes);

module.exports = app;