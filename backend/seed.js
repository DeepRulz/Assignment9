require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/user-model");
const Visitor = require("./src/models/visitor-model");
const Appointment = require("./src/models/appointment-model");
const Pass = require("./src/models/pass-model");
const Checklog = require("./src/models/checklog-model");

async function seedDatabase() {
    try {
        //Connect to MongoDB database
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");

        //Remove Existing Records
        await User.deleteMany({});
        await Visitor.deleteMany({});
        await Appointment.deleteMany({});
        await Pass.deleteMany({});
        await Checklog.deleteMany({});

        console.log("Old data cleared");

        //Hash sample user password
        const hashedPassword = await bcrypt.hash("password123", 10);

        //Create Admin User
        const admin = await User.create({
            name: "Admin User",
            email: "admin@test.com",
            password: hashedPassword, role: "admin"});

        //Create Employee User
        const employee =await User.create({
                name:"Employee User",
                email:"employee@test.com",
                password:hashedPassword,
                role:"employee"});

        //Create Security User
        const security =await User.create({
                name:"Security User",
                email:"security@test.com",
                password:hashedPassword,
                role:"security"});

        console.log("Users created");
        //Create Sample Visitors
        const visitor1 = await Visitor.create({
            name: "John Doe",
            email: "john@test.com",
            phone: "9876543210",
            company: "Google",
            photo: "john.jpg"});

        const visitor2 =
            await Visitor.create({
                name: "Jane Smith",
                email: "jane@test.com",
                phone: "9876543211",
                company: "Microsoft"});

        const visitor3 =
            await Visitor.create({
                name: "Robert Brown",
                email: "robert@test.com",
                phone: "9876543212",
                company: "Amazon"});

        console.log("Visitors created");
        //Create Sample Appointments
        const appointment1 = await Appointment.create({
                visitorId: visitor1._id,
                hostId: admin._id,
                purpose: "Interview",
                visitDate: new Date(),
                status: "approved"});

        const appointment2 = await Appointment.create({
                visitorId: visitor2._id,
                hostId: employee._id,
                purpose: "Meeting",
                visitDate: new Date(),
                status: "pending"});

        const appointment3 = await Appointment.create({
                visitorId: visitor3._id,
                hostId: admin._id,
                purpose: "Vendor Visit",
                visitDate: new Date(),
                status: "rejected"});

        console.log("Appointments created");
        //Create Sample Passes
        const pass = await Pass.create({
                appointmentId: appointment1._id,
                qrData: `PASS-${appointment1._id}`,
                issuedBy: admin._id,
                validTill: new Date()});

        console.log("Pass created");
        //Create Sample Logs
        await Checklog.create({
            passId: pass._id,
            checkInTime: new Date(),
            checkOutTime: new Date()});

        console.log("Checklog created");
        console.log("Seed completed successfully");
        process.exit(0);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedDatabase();