const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Pin = require('../models/pin');
const User = require('../models/user');

// Get all the pins
router.get('/pins', (req, res) => {
    Pin.find({}, { imgUrl: 1, siteUrl: 1, numLikes: 1 })
        .limit(50)
        .then(pins => {
            res.send({ success: true, data: pins });
        })
        .catch(e => res.send({ success: false, data: e.message }))
});

// Get all the user pins
router.get('/mypins', (req, res) => {
   if (req.userID) {
        User.findById(req.userID)
            .limit(50)
            .populate({
                path: 'pins',
                model: 'pin',
                select: { imgUrl: 1, siteUrl: 1, numLikes: 1 }
            })
            .then(user => {
                res.send({ success: true, data: user.pins })
            })
            .catch(e => res.send({ success: false, data: e.message }))
   } else {
       res.send({ success: false, data: 'You are not allowed to access this resource' })
   }
});

// 📌 Post a pin on the user's board
router.post('/pin', (req, res) => {
    if (req.userID) {
        let pin = new Pin({...req.body, author: req.userID});
        pin.save()
            .then(pin => {
                User.findByIdAndUpdate(req.userID, {
                    $push: { pins: pin._id }
                })
                    .then(() => res.send({ success: true, pin: { _id: pin._id, imgUrl: pin.imgUrl, siteUrl: pin.siteUrl, numLikes: pin.numLikes } }))
            })
    } else {
        res.send({ success: false })
    }
});

// 📌 Delete a pin on the user's board
router.delete('/pin/:id', (req, res) => {
    if (req.userID) {
        Pin.findByIdAndRemove(req.params.id)
            .then(() => {
                User.findByIdAndUpdate(req.userID, {
                    $pull: { pins: mongoose.Types.ObjectId(req.params.id) }
                })
                    .then(() => {
                        res.send({ success: true })
                    })
            })
            .catch(e => console.log(e.message))
    } else {
        res.send({ success: false })
    }
});

// 📌 Like or Unlike a pin on the board
router.put('/pin/:id', (req, res) => {
    Pin.findById(req.params.id)
        .then(pin => {
            if (pin.likes.indexOf(req.userID) === -1) {
                Pin.findByIdAndUpdate(req.params.id, {
                    $push: { likes: req.userID },
                    $inc: { numLikes: 1 }
                }, { upsert: true, multi: true })
                    .then(() => res.send({ liked: true, unliked: false }))
            } else {
                Pin.findByIdAndUpdate(req.params.id, {
                    $pull: { likes: req.userID },
                    $inc: { numLikes: -1 }
                },{ upsert: true, multi: true })
                .then(() => res.send({ liked: false, unliked: true }))
            }
        })
        .catch(e => res.send({ liked: false, unliked: false }))
});

module.exports = router;