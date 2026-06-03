const Visitor = require("../models/visitor-model");

exports.createVisitor = async (visitorData) => {

    const visitor = await Visitor.create(
        visitorData
    );

    return visitor;
};

exports.getVisitors = async () => {

    const visitors =
        await Visitor.find();

    return visitors;
};

exports.updateVisitor = async (
    id,
    updatedData
) => {

    const visitor =
        await Visitor.findByIdAndUpdate(
            id,
            updatedData,
            {
                new: true
            }
        );

    return visitor;
};

exports.deleteVisitor = async (id) => {

    const visitor =
        await Visitor.findByIdAndDelete(
            id
        );

    return visitor;
};

exports.searchVisitors = async (
    query
) => {

    return await Visitor.find({
        $or: [
            {
                name: {
                    $regex: query,
                    $options: "i"
                }
            },
            {
                company: {
                    $regex: query,
                    $options: "i"
                }
            }
        ]
    });

};