const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    twitterId: {
        type: String,
        require: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    pic: {
        type: String
    },
    pins: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('user', userSchema);