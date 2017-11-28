const express = require('express');
const router  = express.Router();
const Pin = require('../models/pin');
const User = require('../models/user');

// 📌 Post a pin on the user's board

/*
Check for the userID
save the pin and save the pin id to the user
 */

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
        console.log(req.userID);
        console.log(req.body);
        res.send({ test: true })
    }

});

module.exports = router;