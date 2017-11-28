const express = require('express');
const router = express.Router();
const request = require('request');

router.post('/twitter', (req, res) => {
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
            oauth_callback: 'http://localhost:3100/',
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
    request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
            consumer_key: process.env.TWITTER_KEY.trim(),
            consumer_secret: process.env.TWITTER_SECRET.trim(),
            token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err, r, body) {
        const parsedStr = '{"' + body.split('=').join('":"').split('&').join('","') + '"}';
        // res.send(JSON.parse(parsedStr));
        res.redirect('/');
    })
});

module.exports = router;