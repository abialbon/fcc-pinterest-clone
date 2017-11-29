const express = require('express');
const router = express.Router();
const request = require('request');
const User = require('../models/user');
const { createToken } = require('../helpers/tokens');

/* 😃
We have a problem 🏃 here. The way, I am handling this is...
Client sends a request to /api/auth/twitter -> Request token from Twitter -> Send to client ->
Client forms the url and redirects to Twitter -> Twitter calls our /api/auth/twitter/callback ->
Server calls a special route on client with query params -> Client makes a request back to server ->
Server hits twitter and responds with a token after creating / getting the user from db.
 */

router.post('/twitter', (req, res) => {
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
            // TODO: Change the URL
            oauth_callback: 'https://window-surf.herokuapp.com/',
            consumer_key: process.env.TWITTER_KEY.trim(),
            consumer_secret: process.env.TWITTER_SECRET.trim()
        },
    }, function (err, r, body) {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        const parsedStr = '{"' + body.split('=').join('":"').split('&').join('","') + '"}';
        res.send(JSON.parse(parsedStr));
    });
});

router.get('/twitter/callback', (req, res) => {
    let q = req.query;
    // TODO: Change the URL
    let authAppUrl = `https://window-surf.herokuapp.com?oauth_token=${q.oauth_token}&oauth_verifier=${q.oauth_verifier}`;
    res.redirect(authAppUrl);
});

router.post('/twitter/callback', (req, res) => {
    request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
            consumer_key: process.env.TWITTER_KEY.trim(),
            consumer_secret: process.env.TWITTER_SECRET.trim(),
            token: req.body.oauth_token
        },
        form: { oauth_verifier: req.body.oauth_verifier }
    }, function (err, r, body) {
        const JSONFormatedStr = '{"' + body.split('=').join('":"').split('&').join('","') + '"}';
        const data = JSON.parse(JSONFormatedStr);
        let userID = data.user_id;
        User.findOne({ twitterId: userID })
            .then(user => {
                if(!user) {
                    // Create a User
                    let newuser = User({
                        twitterId: userID,
                        displayName: data.screen_name
                    })
                    newuser.save()
                        .then(user => {
                            res.send({ 
                                authenticated: true,
                                token: createToken(user._id),
                                displayName: user.displayName 
                            })
                        })
                        .catch(e => console.log(e.message))
                } else {
                    res.send({ 
                        authenticated: true,
                        token: createToken(user._id),
                        displayName: user.displayName 
                    })
                }
            })
            .catch(e => console.log(e.message))
    })
});

module.exports = router;