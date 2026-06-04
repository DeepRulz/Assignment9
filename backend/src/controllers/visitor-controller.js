const visitorService =
    require("../services/visitor-service");

exports.addVisitor = async (
    req,
    res
) => {

    try {

        const {
            name,
            email,
            phone,
            company
        } = req.body;

        const photo =
            req.file
                ? req.file.filename
                : "";

        if (
            !name ||
            !phone
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Name and Phone are required"
            });

        }

        const visitor =
            await visitorService.createVisitor({
                name,
                email,
                phone,
                company,
                photo
            });

        res.status(201).json({
            success: true,
            message:
                "Visitor created successfully",
            data: visitor
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.getAllVisitors = async (
    req,
    res
) => {

    try {

        const visitors =
            await visitorService.getVisitors();

        res.status(200).json({
            success: true,
            data: visitors
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.updateVisitor = async (
    req,
    res
) => {

    try {

        const id =
            req.params.id;

        const visitor =
            await visitorService.updateVisitor(
                id,
                req.body
            );

        res.status(200).json({
            success: true,
            message:
                "Visitor updated",
            data: visitor
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.deleteVisitor = async (
    req,
    res
) => {

    try {

        const id =
            req.params.id;

        const visitor =
            await visitorService.deleteVisitor(
                id
            );

        res.status(200).json({
            success: true,
            message:
                "Visitor deleted",
            data: visitor
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

exports.searchVisitors =
    async (req,res) => {

        try {

            const query =
                req.query.q;

            const visitors =
                await visitorService.searchVisitors(
                    query
                );

            res.status(200).json({
                success:true,
                data: visitors
            });

        }
        catch(error){

            res.status(500).json({
                success:false,
                message:error.message
            });

        }

    };