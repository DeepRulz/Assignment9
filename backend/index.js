require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/databaseConnection");
const PORT =process.env.PORT || 5000;
const rateLimit = require("express-rate-limit");
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        success: false,
        message: "Too many login attempts. Please try again later."
    }
});
connectDB();
app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});