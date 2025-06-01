const AppError = require('../utils/errors/appError');

const { User } = require('../../db/models');

exports.store = async (data) => {
    const user = await User.create(data);
    const userData = user.toJSON();
    delete userData.password_hash;
    return userData;
};

exports.getByEmail = async (email) => {
    return await User.findOne({
        where: { email },
        raw: true
    });
};

exports.getFullUserInfoById = async (id) => {
    return await User.findByPk(id, {
        raw: true
    });
};