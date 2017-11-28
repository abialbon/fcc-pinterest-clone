const   express     = require('express'),
        app         = express(),
        db          = require('./server/models/db'),
        cors        = require('cors'),
        passport    = require('passport'),

        authRoutes  = require('./server/routes/auth');

// Passport configuration
var TwitterTokenStrategy = require('passport-twitter-token');

passport.use(new TwitterTokenStrategy({
        consumerKey: process.env.TWITTER_KEY.trim(),
        consumerSecret: process.env.TWITTER_SECRET.trim()
    }, function(token, tokenSecret, profile, done) {
        // User.findOrCreate({ twitterId: profile.id }, function (error, user) {
        //     return done(error, user);
        // });
        console.log('The token is here', token)
    }
));

// 🔥 Connecting to the database
db.connect(process.env.DB_URL);
app.use(cors());

app.get('/', (req, res) => {
   res.send('The pinterest clone is coming up soon!');
});

app.use('/auth', authRoutes);

// 🌎 Listen to PORT
app.listen(process.env.PORT || 3000, () => {
   console.log(`The server is running on port: ${process.env.PORT}` );
});