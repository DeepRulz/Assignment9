const User = require("../models/user-model");

exports.createUser = async (userData) => {

    const user = await User.create(userData);

    return user;
};

exports.findUserByEmail = async (email) => {

    const user = await User.findOne({
        email: email
    });

    return user;
};