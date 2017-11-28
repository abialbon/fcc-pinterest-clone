const jwt = require('jsonwebtoken');

module.exports.createToken = (payload) => jwt.sign({ user_id: payload }, process.env.SECRET, { expiresIn: '3 days' })