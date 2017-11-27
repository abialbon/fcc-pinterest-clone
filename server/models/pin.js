const mongoose = require('mongoose');

const pinSchema = mongoose.Schema({
    imgUrl: String,
    pageUrl: String,
    likes: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('pin', pinSchema);