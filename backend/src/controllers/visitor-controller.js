const visitorService = require("../services/visitor-service");

exports.addVisitor = async (req, res) => {
    try {
        const { name, email, phone, company } = req.body;
        const photo = req.file ? req.file.filename : "";

        if (!name || !phone) {
            return res.status(400).json({ success: false, message: "Name and Phone are required" });
        }
        if (name.trim().length < 2) {
            return res.status(400).json({ success: false, message: "Name must be at least 2 characters" });
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ success: false, message: "Phone number must contain exactly 10 digits" });
        }

        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ success: false, message: "Invalid email format" });
            }
        }

        const visitor = await visitorService.createVisitor({ name, email, phone, company, photo });
        res.status(201).json({ success: true, message: "Visitor created successfully", data: visitor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllVisitors = async (req, res) => {
    try {
        const visitors = await visitorService.getVisitors();
        res.status(200).json({ success: true, data: visitors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateVisitor = async (req, res) => {
    try {
        const id = req.params.id;
        const { email, phone } = req.body;

        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ success: false, message: "Invalid email format" });
            }
        }

        if (phone) {
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                return res.status(400).json({ success: false, message: "Phone number must contain exactly 10 digits" });
            }
        }

        const visitor = await visitorService.updateVisitor(id, req.body);
        res.status(200).json({ success: true, message: "Visitor updated", data: visitor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteVisitor = async (req, res) => {
    try {
        const id = req.params.id;
        const visitor = await visitorService.deleteVisitor(id);
        res.status(200).json({ success: true, message: "Visitor deleted", data: visitor });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.searchVisitors = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ success: false, message: "Search query is required" });
        }
        const visitors = await visitorService.searchVisitors(query);
        res.status(200).json({ success: true, data: visitors });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
