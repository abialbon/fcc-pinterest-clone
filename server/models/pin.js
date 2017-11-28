const mongoose = require('mongoose');

const pinSchema = mongoose.Schema({
    imgUrl: String,
    siteUrl: String,
    author: mongoose.Schema.Types.ObjectId,
    likes: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('pin', pinSchema);