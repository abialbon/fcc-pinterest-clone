const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Pin = require('../models/pin');
const User = require('../models/user');

// Get all the pins
router.get('/pins', (req, res) => {
    Pin.find({})
        .then(pins => {
            res.send(pins);
        })
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
                    .then(() => res.send({ success: true, pin: pin }))
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
                    $push: { likes: req.userID }
                })
                    .then(() => res.send({ liked: true, unliked: false }))
            } else {
                Pin.findByIdAndUpdate(req.params.id, {
                    $pull: { likes: req.userID }
                })
                .then(() => res.send({ liked: false, unliked: true }))
            }
        })
        .catch(e => res.send({ liked: false, unliked: false }))
});

module.exports = router;