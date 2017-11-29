const mongoose = require('mongoose');

const pinSchema = mongoose.Schema({
    imgUrl: String,
    siteUrl: String,
    author: mongoose.Schema.Types.ObjectId,
    numLikes: {
      type: Number,
      default: 0
    },
    likes: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('pin', pinSchema);